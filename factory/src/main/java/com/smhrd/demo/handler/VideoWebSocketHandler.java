package com.smhrd.demo.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component
public class VideoWebSocketHandler extends BinaryWebSocketHandler {

    private final Set<WebSocketSession> sessions = new HashSet<>();
    
    

    // WebSocket 연결이 열릴 때
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("새로운 WebSocket 세션이 열렸습니다: " + session.getId());
    }

    // WebSocket을 통해 수신한 이진 데이터 처리
    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) throws IOException {
        byte[] imageData = message.getPayload().array();
        //System.out.println("Received image data with size: " + imageData.length);
        
        // 받은 이미지 데이터를 모든 클라이언트에게 전송
        for (WebSocketSession s : sessions) {
            if (!s.getId().equals(session.getId())) {
            	try {
            		s.sendMessage(new BinaryMessage(imageData));  // 다른 클라이언트로 비디오 데이터 전송
                    //System.out.println("청크를 보내는 세션 및 크기: " + s.getId()+ "," +imageData.length);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    

    // WebSocket 연결이 닫힐 때
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        System.out.println("WebSocket 세션이 닫혔습니다: " + session.getId());
    }
}
