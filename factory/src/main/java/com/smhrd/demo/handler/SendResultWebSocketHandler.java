package com.smhrd.demo.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

@Component
public class SendResultWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        try {
            // JSON 데이터 파싱
            Map<String, Object> payload = mapper.readValue(message.getPayload(), Map.class);
            Boolean fallDetected = (Boolean) payload.get("result");

            // 결과 확인
            System.out.println("낙상 감지 여부: " + fallDetected);
        } catch (JsonProcessingException e) {
            System.err.println("JSON 처리 오류: " + e.getMessage());
        }
    }
}

