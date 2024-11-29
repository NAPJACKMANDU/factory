package com.smhrd.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.smhrd.demo.handler.VideoWebSocketHandler;

@Configuration
@EnableWebSocket // Spring에서 웹소켓 기능을 활성화
public class WebSocketConfig implements WebSocketConfigurer {

    /**
     * 웹소켓 핸들러를 특정 엔드포인트에 등록하는 메서드.
     * @param registry WebSocketHandler를 등록할 레지스트리 객체
     */
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // "/video-stream" 경로로 웹소켓 핸들러 등록
        registry.addHandler(new VideoWebSocketHandler(), "/video-stream")
                .setAllowedOrigins("*"); // 모든 도메인에서의 요청 허용 (CORS 설정)
    }
}
