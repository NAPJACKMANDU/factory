package com.smhrd.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.smhrd.demo.handler.VideoWebSocketHandler;

@Configuration
@EnableWebSocket // Spring에서 웹소켓 기능을 활성화
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // "/video-stream" 경로로 웹소켓 핸들러 등록
        registry.addHandler(new VideoWebSocketHandler(), "/video-stream")
                .setAllowedOrigins("*"); // 모든 도메인에서의 요청 허용 (CORS 설정)
    }
}
