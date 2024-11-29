<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSocket Video Stream</title>
</head>
<body>
    <!-- 비디오 플레이어 -->
    <video id="videoPlayer" autoplay muted controls></video>

    <script>
        // 페이지가 완전히 로드된 후 실행
        window.onload = function() {
            const videoElement = document.getElementById("videoPlayer");
            const socket = new WebSocket("ws://localhost:8095/video-stream");
            socket.binaryType = "arraybuffer"; // 바이너리 데이터를 ArrayBuffer로 처리

            let mediaSource = new MediaSource();
            videoElement.src = URL.createObjectURL(mediaSource);

            let sourceBuffer = null;
            let queue = []; // 데이터를 대기시키는 큐

            // MediaSource가 열리면 SourceBuffer 추가
            mediaSource.addEventListener("sourceopen", () => {
                console.log("MediaSource Opened");
                sourceBuffer = mediaSource.addSourceBuffer("video/mp4; codecs=\"avc1.42E01E\"");

                // SourceBuffer 업데이트가 끝난 후 대기 중인 데이터 처리
                sourceBuffer.addEventListener("updateend", () => {
                    if (queue.length > 0 && !sourceBuffer.updating) {
                        const nextBuffer = queue.shift();
                        sourceBuffer.appendBuffer(nextBuffer);
                    }
                });
            });

            socket.onopen = () => {
                console.log("WebSocket 연결 열림.");
            };

            socket.onmessage = (event) => {
                console.log("수신된 데이터 타입:", typeof event.data);
                console.log("ArrayBuffer 여부:", event.data instanceof ArrayBuffer);

                if (event.data instanceof ArrayBuffer) {
                    const videoData = new Uint8Array(event.data);
                    console.log("수신된 데이터 크기: " + videoData.length + " bytes");

                    if (videoData.length > 0) {
                        if (mediaSource.readyState === "open" && sourceBuffer && !sourceBuffer.updating) {
                            // MediaSource가 열려 있고, SourceBuffer가 업데이트 중이 아니면 데이터를 추가
                            sourceBuffer.appendBuffer(videoData);
                        } else {
                            // 업데이트 중일 경우 대기
                            console.log("SourceBuffer가 업데이트 중입니다. 데이터 대기 중...");
                            queue.push(videoData);
                        }
                    }
                } else {
                    console.error("수신된 데이터가 ArrayBuffer가 아닙니다.");
                }
            };

            socket.onerror = (error) => {
                console.error("WebSocket 에러 발생:", error);
            };

            socket.onclose = (event) => {
                console.log("WebSocket 연결 종료. 코드:", event.code);
            };
        };
    </script>
</body>
</html>
