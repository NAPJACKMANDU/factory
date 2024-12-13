package com.smhrd.demo.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component
public class SendResultWebSocketHandler extends TextWebSocketHandler {

    private final Set<WebSocketSession> sessions = new HashSet<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("새로운 WebSocket 세션이 열렸습니다: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            // JSON 데이터 파싱
            Map<String, Object> payload = objectMapper.readValue(message.getPayload(), Map.class);
            Boolean fallDetected = (Boolean) payload.get("result");

            // 받은 fallDetected 값을 다른 모든 클라이언트에게 전송
            String responseJson = objectMapper.writeValueAsString(Map.of("fallDetected", fallDetected));

            // 모든 세션에 전송
            for (WebSocketSession s : sessions) {
                if (!s.getId().equals(session.getId())) { // 자신에게 전송하지 않도록
                    try {
                        s.sendMessage(new TextMessage(responseJson));
                        System.out.println("다른 세션으로 메시지 전송 성공: " + responseJson);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        } catch (JsonProcessingException e) {
            System.err.println("JSON 처리 오류: " + e.getMessage());
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        System.out.println("WebSocket 세션이 닫혔습니다: " + session.getId());
    }
}
