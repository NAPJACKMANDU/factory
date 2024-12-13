<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSocket Video Stream</title>
    <script>
        let socket;
        let canvas;
        let ctx;

        function connectWebSocket() {
            socket = new WebSocket('ws://172.30.1.54:8095/signal');
            
            socket.onopen = () => {    
                console.log('웹소켓 연결됨');
            };

            socket.onmessage = (event) => {
                let blob = new Blob([event.data], { type: 'image/jpeg' });
                let url = URL.createObjectURL(blob);
                let img = new Image();
                img.src = url;

                // 이미지가 로드되면 캔버스에 그리기
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);  // 캔버스를 비움
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);  // 캔버스에 이미지 그리기
                };

                console.log('이미지 수신됨');
            };

            socket.onerror = (error) => {
                console.log('웹소켓 오류:', error);
            };

            socket.onclose = () => {
                console.log('웹소켓 닫힘');
            };
        }

        window.onload = () => {
            canvas = document.getElementById('videoCanvas');
            ctx = canvas.getContext('2d');
            connectWebSocket();
        };
    </script>
</head>
<body>
    <h1>실시간 비디오 스트림</h1>
    <canvas id="videoCanvas" width="640" height="480"></canvas>
</body>
</html>
