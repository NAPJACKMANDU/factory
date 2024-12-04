package com.smhrd.demo.websocket;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

@ServerEndpoint("/signal")
public class WebSocketServer {

    // 데스크탑 세션을 추적하기 위한 맵
    private static final Map<String, Session> desktopSessions = new HashMap<>();

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("웹소킷 연결됨: " + session.getId());

        // 데스크탑 클라이언트와의 연결을 추적하려면
        // 예시로 데스크탑 세션을 따로 구분하는 방법을 적용할 수 있습니다.
        // 예를 들어, 'desktop' 클라이언트로 설정
        desktopSessions.put("desktop", session);
    }

    @OnMessage
    public void onMessage(Session session, byte[] message) {
        // 비디오 데이터를 수신하고 WebSocket을 통해 전송하는 예시
        try {
            System.out.println("웹소킷 메시지 수신, 크기: " + message.length);
            // 데이터 처리 후, 클라이언트에 메시지 전송
            session.getBasicRemote().sendBinary(ByteBuffer.wrap(message));
        } catch (Exception e) {  // IOException 대신 일반 Exception을 잡는 방법
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("웹소킷 연결 종료: " + session.getId());

        // 연결 종료 시 세션을 제거
        desktopSessions.remove(session.getId());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        throwable.printStackTrace();
    }

    // 데스크탑에 전송하는 메서드 예시
    private void sendToDesktop(byte[] message) {
        // 데스크탑 클라이언트 세션을 찾아서 메시지를 전송
        Session desktopSession = desktopSessions.get("desktop");

        if (desktopSession != null && desktopSession.isOpen()) {
            try {
                // 데스크탑으로 메시지 전송 (Binary 메시지)
                desktopSession.getBasicRemote().sendBinary(ByteBuffer.wrap(message));
                System.out.println("데스크탑에 메시지 전송: " + message.length + " bytes");
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("데스크탑 클라이언트가 연결되어 있지 않습니다.");
        }
    }
}

