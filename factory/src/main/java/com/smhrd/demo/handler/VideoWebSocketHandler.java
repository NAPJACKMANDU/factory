package com.smhrd.demo.handler;

import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

import java.io.File;
import java.io.FileInputStream;
import java.nio.ByteBuffer;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class VideoWebSocketHandler extends BinaryWebSocketHandler {

    // ExecutorService를 사용하여 비디오 스트리밍을 백그라운드에서 처리
    private final ExecutorService executorService = Executors.newSingleThreadExecutor();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("웹소켓 연결됨: " + session.getId());

        // 클라이언트 연결 시 비디오 전송 시작
        executorService.submit(() -> streamVideo(session));
    }

    private void streamVideo(WebSocketSession session) {
        // 로컬 저장소에서 비디오 파일 읽기
        File videoFile = new File("C:/videos/sample.mp4"); // 동영상 파일 경로 학원에서 바꿀 예정
        try (FileInputStream inputStream = new FileInputStream(videoFile)) {
            byte[] buffer = new byte[1024 * 16]; // 16KB 버퍼 buffer로 동영상 파일의 일부를 읽어 전송할 예정
            int bytesRead;

            // 파일의 데이터를 읽어서 클라이언트에 전송
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                // 연결이 끊어졌는지 확인
                if (!session.isOpen()) {
                    break;
                }

                // 읽은 데이터를 바이너리 메시지로 변환하여 전송
                ByteBuffer byteBuffer = ByteBuffer.wrap(buffer, 0, bytesRead);
                session.sendMessage(new BinaryMessage(byteBuffer));

                // 클라이언트가 데이터를 처리할 시간을 주기 위해 잠시 멈춤
                Thread.sleep(33); // 약 30fps (33ms) 보통 게임이 아니고선 30프레임으로 함
            }

            System.out.println("비디오 스트리밍 완료");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("웹소켓 연결 종료: " + session.getId());
        executorService.shutdown(); // 작업 종료
    }
}


