let socket1, socket2;
let canvas, ctx;

function connectWebSockets() {
    // 첫 번째 WebSocket: 이미지 스트리밍
    socket1 = new WebSocket('ws://172.30.1.54:8095/signal');

    socket1.onopen = () => {
        console.log('Socket1(WebSocket for image) 연결됨');
    };

    socket1.onmessage = (event) => {
        let blob = new Blob([event.data], { type: 'image/jpeg' });
        let url = URL.createObjectURL(blob);
        let img = new Image();
        img.src = url;

        // 이미지가 로드되면 캔버스에 그리기
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 비움
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 캔버스에 이미지 그리기
        };

        //console.log('이미지 수신됨');
    };

    socket1.onerror = (error) => {
        console.error('Socket1(WebSocket for image) 에러:', error);
    };

    socket1.onclose = () => {
        console.log('Socket1(WebSocket for image) 닫힘');
    };

    // 두 번째 WebSocket: 낙상 감지 데이터
    socket2 = new WebSocket('ws://172.30.1.54:8095/res');

    socket2.onopen = () => {
        console.log('Socket2(WebSocket for fall detection) 연결됨');
    };

    socket2.onmessage = (event) => {
        try {
			console.log('온메세지 이벤트 발생')
            const data = JSON.parse(event.data);
            console.log('수신한 데이터:', data);

            if (data.fallDetected !== undefined) {
                // JSP 화면에 표시
                const statusElement = document.getElementById('fallStatus');
                if (statusElement) {
                    statusElement.innerText = 
                        data.fallDetected ? '낙상이 감지되었습니다!' : '정상 상태입니다.';
                } else {
                    console.error('fallStatus 요소를 찾을 수 없습니다!');
                }
            } else {
                console.error('데이터에 fallDetected 속성이 없습니다:', data);
            }
        } catch (error) {
            console.error('WebSocket 메시지 처리 오류:', error);
        }
    };

    socket2.onerror = (error) => {
        console.error('Socket2(WebSocket for fall detection) 에러:', error);
    };

    socket2.onclose = () => {
        console.log('Socket2(WebSocket for fall detection) 닫힘');
    };
}

window.onload = () => {
    // 캔버스 초기화
    canvas = document.getElementById('videoCanvas');
    ctx = canvas.getContext('2d');

    if (!canvas || !ctx) {
        console.error('캔버스를 초기화하는 데 실패했습니다. videoCanvas 요소를 확인하세요.');
        return;
    }

    // WebSocket 연결
    connectWebSockets();
};
