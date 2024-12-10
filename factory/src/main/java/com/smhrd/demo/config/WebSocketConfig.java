package com.smhrd.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.smhrd.demo.handler.SendResultWebSocketHandler;
import com.smhrd.demo.handler.VideoWebSocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // WebSocket 핸들러 등록
        VideoWebSocketHandler videoWebSocketHandler = new VideoWebSocketHandler();
        registry.addHandler(videoWebSocketHandler, "/signal").setAllowedOrigins("*");// CORS 설정
        SendResultWebSocketHandler sendResultWebSocketHandler = new SendResultWebSocketHandler();
        registry.addHandler(sendResultWebSocketHandler, "/res").setAllowedOrigins("*");// CORS 설정
    }
}
