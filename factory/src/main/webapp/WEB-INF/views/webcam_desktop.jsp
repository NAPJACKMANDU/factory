<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSocket Video Stream</title>
    <script src="/js/videoWebsocket.js"></script>

</head>
<body>
    <h1>실시간 비디오 스트림</h1>
    <canvas id="videoCanvas" width="640" height="480"></canvas>
    <br>
    <h1>낙상 감지 시스템</h1>
    <p id="fallStatus">상태를 확인 중...</p>
</body>
</html>
