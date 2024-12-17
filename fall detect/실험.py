import threading
import uvicorn
import time
from ultralytics import YOLO
import collections
from datetime import datetime
import MySQLdb
from MySQLdb.cursors import DictCursor
import atexit

app = FastAPI()

websocket_connection = None

async def maintain_websocket():
    global websocket_connection
    try:
        websocket_connection = await websockets.connect('ws://172.30.1.54:8095/res')
        print("웹소켓 연결됨.")
        while True:
            await asyncio.sleep(3600)
    except Exception as e:
        print(f"웹소켓 연결 오류: {e}")

async def send_res_bool(res):
    global websocket_connection
    if websocket_connection is None:
        print("웹소켓 연결이 열리지 않았습니다.")
        return
    try:
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
            if len(frame_data) > 8192:
                np_array = np.frombuffer(frame_data, np.uint8)
                frame = cv2.imdecode(np_array, cv2.IMREAD_GRAYSCALE)
                if frame is not None:
                    print(f"받은 프레임 크기: {frame.shape}")
                    cv2.imshow("Received Frame", frame)
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        break
                frame_data = b""
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

    fps = 20
    delay = 1 / fps

    try:
        async with websockets.connect('ws://172.30.1.54:8095/signal') as websocket:
            while True:
                start_time = time.time()
                result_frame, fall = await detect(cap)
                await send_res_bool(fall)
                resized_frame = cv2.resize(result_frame, (320, 240))
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

conn = MySQLdb.connect(
    host='project-db-campus.smhrd.com',
    user='seocho_DCX_DB_p3_3',
    passwd='smhrd3',
    db='seocho_DCX_DB_p3_3',
    port=3312,
    cursorclass=DictCursor
)
cursor = conn.cursor()

async def save_db(file_name):
    sql_query = """
        INSERT INTO tb_clip (clip_name, clip_size, camera_idx, created_at, clip_path, company_idx, clip_ext)
        VALUES (%s, %s ,%s, NOW(6), %s, %s, %s)
    """
    data = (
        f'{file_name}', 0, 1,
        fr'C:\\Users\\smhrd\\Desktop\\Spring\\factory\\fall detect\\saved_videos\\{file_name}', 
        1, '.webm'
    )
    try:
        await asyncio.to_thread(cursor.execute, sql_query, data)
        conn.commit()
        print("Data inserted successfully.")
    except MySQLdb.Error as e:
        print("Error while inserting data:", e)
        conn.rollback()

def close_db_connection():
    cursor.close()
    conn.close()
    print("Database connection closed.")

atexit.register(close_db_connection)

CONFIDENCE_THRESHOLD = 0.3
BUFFER_SIZE = 100
POST_BUFFER_SIZE = 100

frame_buffer = collections.deque(maxlen=BUFFER_SIZE)

async def save_video(frames, fps=10):
    if not frames:
        print("저장할 프레임이 없습니다.")
        return

    script_directory = os.path.dirname(os.path.abspath(__file__))
    save_directory = os.path.join(script_directory, "../factory/src/main/resources/static/videos")
    os.makedirs(save_directory, exist_ok=True)
    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"fall_detected_{current_time}.webm"
    await save_db(filename)
    path = os.path.join(save_directory, filename)
    height, width, _ = frames[0].shape
    fourcc = cv2.VideoWriter_fourcc(*'VP80')
    out = cv2.VideoWriter(path, fourcc, fps, (width, height))
    for frame in frames:
        out.write(frame)
    out.release()
    print(f"영상이 저장되었습니다: {path}")

async def detect(cap):
    global frame_buffer

    fall_detected = False
    success, frame = cap.read()
    if not success:
        return None, False
    detection = model(frame)[0]
    for data in detection.boxes.data.tolist():
        confidence = float(data[4])
        if confidence < CONFIDENCE_THRESHOLD:
            continue
        fall_detected = True

    frame_buffer.append(frame)

    if fall_detected:
        frames_to_save = list(frame_buffer)
        async def post_save_task():
            for _ in range(POST_BUFFER_SIZE):
                success, post_frame = cap.read()
                if not success:
                    break
                frames_to_save.append(post_frame)
                await asyncio.sleep(1 / 10)
            await save_video(frames_to_save)
        asyncio.create_task(post_save_task())
    return frame, fall_detected

def run_fastapi():
    uvicorn.run(app, host="0.0.0.0", port=8096)

async def main():
    threading.Thread(target=run_fastapi, daemon=True).start()
    asyncio.create_task(maintain_websocket())
    await send_frame()

if __name__ == "__main__":
    asyncio.run(main())