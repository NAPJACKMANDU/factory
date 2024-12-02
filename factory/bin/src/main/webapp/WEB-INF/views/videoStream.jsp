<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
    // 비디오 태그와 WebSocket 연결 초기화
    const videoElement = document.getElementById("videoPlayer");
    const socket = new WebSocket("ws://localhost:8095/video-stream");

    // MediaSource API를 사용하여 실시간 스트리밍 데이터를 처리
    let mediaSource = new MediaSource();
    videoElement.src = URL.createObjectURL(mediaSource);

    // MediaSource 준비가 완료되면 실행
    mediaSource.addEventListener("sourceopen", () => {
        const sourceBuffer = mediaSource.addSourceBuffer("video/mp4; codecs=\"avc1.42E01E\"");

        // WebSocket에서 메시지를 수신하면 비디오 데이터를 버퍼에 추가
        socket.onmessage = (event) => {
            const videoData = new Uint8Array(event.data); // 서버에서 받은 데이터를 Uint8Array로 변환

            // sourceBuffer가 사용 중이지 않으면 데이터를 추가
            if (!sourceBuffer.updating) {
                sourceBuffer.appendBuffer(videoData); // 비디오 소스 버퍼에 추가
            } else {
                console.log("sourceBuffer가 사용 중입니다.");
            }
        };

        // WebSocket 연결 종료 시
        socket.onclose = () => {
            console.log("웹소켓 연결 종료");
        };

        // WebSocket 에러 발생 시
        socket.onerror = (error) => {
            console.error("웹소켓 에러 발생:", error);
        };
    });
</script>

</body>
</html>
