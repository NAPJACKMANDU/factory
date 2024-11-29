package com.smhrd.demo.handler;

import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

import java.io.File;
import java.io.FileInputStream;
import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class VideoWebSocketHandler extends BinaryWebSocketHandler {

    // ExecutorService를 사용하여 비디오 스트리밍을 백그라운드에서 처리 
	// 11/29 14:44 newSingleThreadExecutor() --> newCachedThreadPool()로 변경
	private final ExecutorService executorService = Executors.newCachedThreadPool();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("웹소켓 연결됨: " + session.getId());

        // 클라이언트 연결 시 비디오 전송 시작
        executorService.submit(() -> streamVideo(session));
    }

    private void streamVideo(WebSocketSession session) {
        // 로컬 저장소에서 비디오 파일 읽기
        File videoFile = new File("C:/videos/sample.mp4"); // 동영상 파일 경로 학원에서 바꿀 예정
        if (!videoFile.exists()) {
            System.out.println("비디오 파일을 찾을 수 없습니다!");
        }
        try (FileInputStream inputStream = new FileInputStream(videoFile)) {
            byte[] buffer = new byte[1024 * 16]; // 16KB 버퍼 buffer로 동영상 파일의 일부를 읽어 전송할 예정
            int bytesRead;

            // 파일의 데이터를 읽어서 클라이언트에 전송
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                // 연결이 끊어졌는지 확인
            	if (session.isOpen()) {
            	    ByteBuffer byteBuffer = ByteBuffer.wrap(buffer, 0, bytesRead);
            	    session.sendMessage(new BinaryMessage(byteBuffer));
            	    System.out.println("프레임 전송 중, 크기: " + bytesRead + " bytes");
            	    System.out.println("보낸 데이터 내용: " + Arrays.toString(buffer));
            	} else {
            	    System.out.println("세션이 열려 있지 않음. 데이터 전송 중단.");	
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
        
        // 모든 클라이언트가 종료된 경우에만 ExecutorService 종료
        if (executorService.isShutdown()) {
            System.out.println("ExecutorService 이미 종료됨");
        } else {
            executorService.shutdown(); // 모든 클라이언트 연결이 종료된 후에 실행
            System.out.println("ExecutorService 종료");
        }
    }
}


