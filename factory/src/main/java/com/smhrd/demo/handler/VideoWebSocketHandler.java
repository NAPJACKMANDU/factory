package com.smhrd.demo.handler;

import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

import java.nio.ByteBuffer;

public class VideoWebSocketHandler extends BinaryWebSocketHandler {

    /**
     * 바이너리 메시지를 처리하는 메서드.
     * @param session 웹소켓 세션 객체
     * @param message 클라이언트에서 받은 바이너리 메시지
     */
    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) throws Exception {
        // 클라이언트에서 보낸 영상 데이터 (바이너리 형식)를 가져옴
        ByteBuffer payload = message.getPayload();

        // 받은 데이터를 그대로 클라이언트로 되돌려 보내는 에코 기능 (테스트용)
        session.sendMessage(new BinaryMessage(payload));
    }

    /**
     * 웹소켓 연결이 성공적으로 수립되었을 때 호출되는 메서드.
     * @param session 연결된 클라이언트와의 세션 객체
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("웹소켓 연결됨: " + session.getId());
    }

    /**
     * 웹소켓 연결이 종료되었을 때 호출되는 메서드.
     * @param session 연결 종료된 세션 객체
     * @param status 연결 종료 상태
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("웹소켓 연결 종료: " + session.getId());
    }
}

