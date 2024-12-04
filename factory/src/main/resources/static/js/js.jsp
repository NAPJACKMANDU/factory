<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<script type="text/javascript">
let selectedVideoElement = null; // 현재 선택된 비디오 요소
let mediaRecorder;
let recordedChunks = [];

document.querySelectorAll('.video-item').forEach((item) => {
  item.addEventListener('click', (event) => {
    // 클릭한 항목의 비디오 경로 가져오기
    const videoPath = event.target.getAttribute('data-video');
    
    // 선택된 비디오를 표시하거나 처리할 수 있는 로직을 추가하세요.
    if (selectedVideoElement) {
      selectedVideoElement.srcObject.getTracks().forEach(track => track.stop()); // 이전 비디오 스트림 중지
    }

    // 새로운 비디오 요소 생성
    selectedVideoElement = document.createElement('video');
    selectedVideoElement.src = videoPath;
    selectedVideoElement.controls = true;
    selectedVideoElement.autoplay = true;
    selectedVideoElement.loop = true;

    document.body.appendChild(selectedVideoElement); // 비디오를 화면에 추가

    // 선택된 비디오의 스트림을 캡처
    const stream = selectedVideoElement.captureStream();
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };
  });
});

// 's' 키를 눌렀을 때 녹화 시작
document.addEventListener("keydown", (event) => {
  if (event.key === "s" && selectedVideoElement) {
    mediaRecorder.start();
    console.log("녹화가 시작되었습니다.");
  }
});

// 'e' 키를 눌렀을 때 녹화 종료
document.addEventListener("keydown", (event) => {
  if (event.key === "e" && mediaRecorder) {
    mediaRecorder.stop();
    mediaRecorder.onstop = async () => {
      console.log("녹화가 종료되었습니다.");

      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("file", blob, "recorded-video.webm");

      try {
        const response = await fetch("/videos/upload", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          console.log("동영상이 성공적으로 업로드되었습니다.");
        } else {
          console.error("동영상 업로드에 실패했습니다.");
        }
      } catch (error) {
        console.error("동영상 업로드 중 오류가 발생했습니다:", error);
      }
    };
  }
});
// --------------------------------------------------------------
</script>
</body>
</html>