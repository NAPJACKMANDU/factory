import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

import cv2
import asyncio
import websockets
import numpy as np
from fastapi import FastAPI, WebSocket
import threading
import uvicorn
import time
from ultralytics import YOLO
import math
from torchvision import transforms
import torch
from asyncio import Lock
import json
import atexit
from datetime import datetime


# FastAPI 앱 생성
app = FastAPI()

websocket_connection = None  # 전역 변수로 웹소켓 연결을 저장

# 웹소켓 연결 유지
async def maintain_websocket():
    global websocket_connection
    try:
        # 웹소켓 연결을 처음 한번만 시도
        websocket_connection = await websockets.connect('웹소켓주소')
        print("웹소켓 연결됨.")
        while True:
            await asyncio.sleep(3600)  # 연결을 계속 유지
    except Exception as e:
        print(f"웹소켓 연결 오류: {e}")

async def send_res_bool(res):
    global websocket_connection
    if websocket_connection is None:
        print("웹소켓 연결이 열리지 않았습니다.")
        return

    try:
        # Boolean 값을 JSON 형식으로 변환
        message = json.dumps({"result": res})
        await websocket_connection.send(message)
        print(f"낙상 결과 전송 성공: {message}")
    except Exception as e:
        print(f"웹소켓 전송 오류: {e}")


@app.websocket("/signal")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    frame_data = b""
    try:
        while True:
            data = await websocket.receive_bytes()
            frame_data += data
            if len(frame_data) > 8192:  # 프레임 완성
                np_array = np.frombuffer(frame_data, np.uint8)
                frame = cv2.imdecode(np_array, cv2.IMREAD_GRAYSCALE)
                if frame is not None:
                    print(f"받은 프레임 크기: {frame.shape}")
                    cv2.imshow("Received Frame", frame)
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        break
                frame_data = b""  # 버퍼 초기화
    except Exception as e:
        print(f"웹소켓 오류: {e}")
    finally:
        cv2.destroyAllWindows()
        await websocket.close()

async def send_frame():
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    if not cap.isOpened():
        print("오류: 웹캡을 열 수 없습니다.")
        return

    fps =   20# 목표 FPS
    delay = 1 / fps

    try:
        async with websockets.connect('웹소킷 주소') as websocket:
            while True:
                start_time = time.time()    

                result_frame, fall = await detect(cap)
                await send_res_bool(fall)
                
                # 해상도 축소
                resized_frame = cv2.resize(result_frame, (320, 240))

                # JPEG 품질 설정 (품질 낮추기)
                encode_params = [int(cv2.IMWRITE_JPEG_QUALITY), 30]
                _, buffer = cv2.imencode('.jpg', resized_frame, encode_params)

                chunk_size = 8192
                num_chunks = len(buffer.tobytes()) // chunk_size + 1
                for i in range(num_chunks):
                    chunk = buffer.tobytes()[i * chunk_size:(i + 1) * chunk_size]
                    await websocket.send(chunk)

                elapsed_time = time.time() - start_time
                if elapsed_time < delay:
                    await asyncio.sleep(delay - elapsed_time)
    except Exception as e:
        print(f"웹소켓 연결 중 오류 발생: {e}")
    finally:
        cap.release()
#############################################

import MySQLdb
from MySQLdb.cursors import DictCursor

# MySQL 서버에 연결
conn = MySQLdb.connect(
    host='',
    user='',
    passwd='',
    db='',
    port= #포트번호,
    cursorclass=DictCursor
)
cursor = conn.cursor()

async def save_db(file_name):
    await kakao()
    sql_query = """
        INSERT INTO tb_clip ( 
            clip_name,
            clip_size, 
            camera_idx, 
            created_at, 
            clip_path, 
            company_idx, 
            clip_ext
        ) VALUES (%s, %s ,%s, NOW(6), %s, %s, %s)
    """
    data = (
        f'{file_name}',  # clip_name
        0,  # clip_size
        1,  # camera_idx
        fr'파일 저장 경로\{file_name}',  # clip_path
        1,  # company_idx
        '.webm'  # clip_ext
    )

    try:
        await asyncio.to_thread(cursor.execute, sql_query, data)
        conn.commit()
        print("DB 저장 성공")
    except MySQLdb.Error as e:
        print("디비 오류:", e)
        conn.rollback()

def close_db_connection():
    cursor.close()
    conn.close()
    print("Database connection closed.")

atexit.register(close_db_connection)

###################################################



CONFIDENCE_THRESHOLD = 0.3  # Confidence threshold 낮추기
GREEN = (0, 255, 0)
WHITE = (255, 255, 255)

#model = YOLO('fall_det_1.pt')
model = YOLO('yolo11s-pose.pt').cuda()
#model = YOLO('yolov8n-pose.pt')
import collections


# 저장 상태 관리 변수
# 이전 10초 데이터를 유지할 deque
BUFFER_SIZE = 100  # 초당 10fps, 10초를 저장 (10fps * 10초)
POST_BUFFER_SIZE = 100  # 탐지 후 10초를 추가로 저장

frame_buffer = collections.deque(maxlen=BUFFER_SIZE)

async def save_video(frames, fps=10):
    
    """프레임 목록을 webm로 저장"""
    if not frames:
        print("저장할 프레임이 없습니다.")
        return

    script_directory = os.path.dirname(os.path.abspath(__file__))
    save_directory = os.path.join(script_directory, "파일 저장 경로")
    os.makedirs(save_directory, exist_ok=True)

    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"파일명명_{current_time}.webm"
    await save_db(filename)
    path = os.path.join(save_directory, filename)

    height, width, _ = frames[0].shape
    fourcc = cv2.VideoWriter_fourcc(*'VP80')
    out = cv2.VideoWriter(path, fourcc, fps, (width, height))

    for frame in frames:
        out.write(frame)
    out.release()
    print(f"영상이 저장되었습니다: {path}")





# 낙상 결과를 전송하는 비동기 함수


# detect 함수 수정
is_saving = False  # 낙상 저장 상태
lock = asyncio.Lock()  # 동시성 문제를 방지할 Lock 객체

import time

fall_start_time = None  # 낙상 시작 시간을 기록
FALL_CONFIRMATION_TIME = 3  # 낙상으로 확정하기 위한 시간(초)

async def detect(cap):
    global is_saving, frames_to_save, frame_buffer, fall_start_time

    fall_detected = False
    success, frame = cap.read()
    if not success:
        return None, False

    # 모델 추론
    detection = model(frame)[0]

    for data in detection.boxes.data.tolist():
        confidence = float(data[4])
        if confidence < CONFIDENCE_THRESHOLD:
            continue

        xmin, ymin, xmax, ymax = int(data[0]), int(data[1]), int(data[2]), int(data[3])
        label = int(data[5])

        # 키포인트 정보
        left_shoulder_x, left_shoulder_y = detection.keypoints.xy[0][5]
        right_shoulder_x, right_shoulder_y = detection.keypoints.xy[0][6]
        left_hip_x, left_hip_y = detection.keypoints.xy[0][11]
        right_hip_x, right_hip_y = detection.keypoints.xy[0][12]
        left_ankle_x, left_ankle_y = detection.keypoints.xy[0][15]
        right_ankle_x, right_ankle_y = detection.keypoints.xy[0][16]

        len_factor = math.sqrt(((left_shoulder_y - left_hip_y) ** 2 + (left_shoulder_x - left_hip_x) ** 2))
        if left_shoulder_x > 0 and right_shoulder_x > 0 and left_hip_x > 0 and right_hip_x > 0:
            if left_shoulder_y > left_ankle_y - len_factor and left_hip_y > left_ankle_y - (len_factor / 2) and left_shoulder_y > left_hip_y - (len_factor / 2):
                # 낙상 시작 시간 기록
                if fall_start_time is None:
                    fall_start_time = time.time()

                # 낙상이 지속되고 있는지 확인
                elapsed_time = time.time() - fall_start_time
                if elapsed_time >= FALL_CONFIRMATION_TIME:
                    cv2.rectangle(frame, (int(xmin), int(ymin)), (int(xmax), int(ymax)), color=(0, 0, 255), thickness=5, lineType=cv2.LINE_AA)
                    cv2.putText(frame, 'Person Fell down', (11, 100), 0, 1, [0, 0, 2550], thickness=3, lineType=cv2.LINE_AA)
                    fall_detected = True
            else:
                # 조건이 만족되지 않으면 초기화
                fall_start_time = None

        # 키포인트 그리기
        cv2.circle(frame, (int(left_shoulder_x), int(left_shoulder_y)), 5, (0, 255, 0), -1)
        cv2.circle(frame, (int(right_shoulder_x), int(right_shoulder_y)), 5, (0, 255, 0), -1)
        cv2.circle(frame, (int(left_hip_x), int(left_hip_y)), 5, (255, 0, 0), -1)
        cv2.circle(frame, (int(right_hip_x), int(right_hip_y)), 5, (255, 0, 0), -1)
        cv2.circle(frame, (int(left_ankle_x), int(left_ankle_y)), 5, (0, 0, 255), -1)
        cv2.circle(frame, (int(right_ankle_x), int(right_ankle_y)), 5, (0, 0, 255), -1)

    # 현재 프레임 저장
    frame_buffer.append(frame)

    # 낙상 감지 처리
    if fall_detected:
        
        async with lock:  # is_saving 변경을 동기화
            if not is_saving:
                is_saving = True
                frames_to_save = list(frame_buffer)  # 이전 10초 데이터 복사
                asyncio.create_task(send_res_bool(fall_detected))

                # 탐지 후 10초 저장 처리
                async def post_save_task():
                    for _ in range(POST_BUFFER_SIZE):
                        success, post_frame = cap.read()
                        if not success:
                            break
                        frames_to_save.append(post_frame)
                        await asyncio.sleep(1 / 10)  # 10fps 기준

                    await save_video(frames_to_save)
                    frames_to_save.clear()
                    async with lock:
                        is_saving = False  # 저장이 끝나면 상태 변경

                asyncio.create_task(post_save_task())

    return frame, fall_detected




###############################################
## 카카오톡 연결
async def kakao() :
    import requests
    import json


    with open("kakao_code.json","r") as fp:
        tokens = json.load(fp)
        


    url= "https://kapi.kakao.com/v2/api/talk/memo/send"
    friend_url = "https://kapi.kakao.com/v1/api/talk/friends"
    send_url = "https://kapi.kakao.com/v1/api/talk/friends/message/default/send"

    template_id = #템플릿 id


    headers={
        "Authorization" : "Bearer " + tokens["access_token"]
        
    }


    data={
        "template_id": template_id
    }



    response = requests.post(url, headers=headers, data=data)

    print(response.json())
    response.status_code


    print(response.status_code)
    if response.json().get('result_code') == 0:
        print('메시지를 성공적으로 보냈습니다.')
    else:
        print('메시지를 성공적으로 보내지 못했습니다. 오류메시지 : ' + str(response.json()))

#############################################

def run_fastapi():
    uvicorn.run(app, host="0.0.0.0", port=8096)

async def main():
    threading.Thread(target=run_fastapi, daemon=True).start()
    asyncio.create_task(maintain_websocket())
    await send_frame()

if __name__ == "__main__":
    asyncio.run(main())