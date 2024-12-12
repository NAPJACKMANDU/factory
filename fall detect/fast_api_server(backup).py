import cv2
import asyncio
import websockets
import numpy as np
from fastapi import FastAPI, WebSocket
import threading
import uvicorn
import time
import os
from ultralytics import YOLO
import math
from torchvision import transforms
import torch

# FastAPI 앱 생성
app = FastAPI()

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

    fps = 10  # 목표 FPS
    delay = 1 / fps

    try:
        async with websockets.connect('ws://172.30.1.54:8095/signal') as websocket:
            while True:
                start_time = time.time()

                result_frame, fall = detect(cap)
                
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



os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'

CONFIDENCE_THRESHOLD = 0.1  # Confidence threshold 낮추기
GREEN = (0, 255, 0)
WHITE = (255, 255, 255)

#model = YOLO('fall_det_1.pt')
model = YOLO('yolov8n-pose.pt')



# Loop through the video frames
def detect(cap) :
    
    fall_detected = False  # 낙상 감지 변수 초기화

    success, frame = cap.read()
    #cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    #cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 640)

    if success:
        detection = model(frame)[0]

        for data in detection.boxes.data.tolist():  # 데이터 : [xmin, ymin, xmax, ymax, confidence_score, class_id]
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
                    cv2.rectangle(frame, (int(xmin), int(ymin)), (int(xmax), int(ymax)), color=(0, 0, 255), thickness=5, lineType=cv2.LINE_AA)
                    cv2.putText(frame, 'Person Fell down', (11, 100), 0, 1, [0, 0, 2550], thickness=3, lineType=cv2.LINE_AA)
                    fall_detected = True

            # 키포인트 그리기
            cv2.circle(frame, (int(left_shoulder_x), int(left_shoulder_y)), 5, (0, 255, 0), -1)
            cv2.circle(frame, (int(right_shoulder_x), int(right_shoulder_y)), 5, (0, 255, 0), -1)
            cv2.circle(frame, (int(left_hip_x), int(left_hip_y)), 5, (255, 0, 0), -1)
            cv2.circle(frame, (int(right_hip_x), int(right_hip_y)), 5, (255, 0, 0), -1)
            cv2.circle(frame, (int(left_ankle_x), int(left_ankle_y)), 5, (0, 0, 255), -1)
            cv2.circle(frame, (int(right_ankle_x), int(right_ankle_y)), 5, (0, 0, 255), -1)

        # 이미지 표시
        return frame, fall_detected



###############################################



def run_fastapi():
    uvicorn.run(app, host="0.0.0.0", port=8096)

async def main():
    threading.Thread(target=run_fastapi, daemon=True).start()
    await send_frame()

if __name__ == "__main__":
    asyncio.run(main())