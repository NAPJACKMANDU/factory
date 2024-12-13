let socket2;

function connectWebSockets() {
    

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
			console.log(data.fallDetected);

            if (data.fallDetected !== undefined) {
				
				// data.fallDetected가 참이면 현재 시간으로 로그 띄우기
				if(data.fallDetected){ 
					blink('cam1', 'red');
					plusLog('cam1', '위험', '🚨');
					showReportContainer();
					showProtocolContainer();
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
//----------------------------------------------------------------------------
//시간 

/**
 * 현재 시간을 포맷팅해서 반환
 * @returns {string} HH:mm:ss 형식의 현재 시간
 */
function getFormattedTimestamp() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
//---------------------------------------------------------------------------

/**
 * 로그 추가 함수
 * @param {string} cameraId - 카메라 ID
 * @param {string} status - 상태 (예: '위험')
 * @param {string} icon - 아이콘 (예: '🚨')
 */

// 성공
function plusLog(cameraId, status, icon	){
	const timestamp = getFormattedTimestamp();
	    const logContainer = document.getElementById('log-tuple-container');

	    // 로그 HTML 템플릿 생성
	    const newLog = document.createElement('section');
	    newLog.setAttribute('alt', '로그-튜플');
	    newLog.className = 'log-tuple';
	    newLog.style.opacity = 0; // 초기 투명도 설정
	    newLog.style.transform = 'translateY(-10px)'; // 초기 위치 설정

	    newLog.innerHTML = `
	        <p class="log-timestamp">${timestamp}</p>
	        <p alt="로그 콘텐츠" class="log-content">${cameraId}</p>
	        <span class="log-content">${icon}</span>
	    `;

	    // 로그 컨테이너에 추가
	    logContainer.prepend(newLog);

	    // 부드러운 전환 애니메이션
	    requestAnimationFrame(() => {
	        newLog.style.opacity = 1;
	        newLog.style.transform = 'translateY(0)';
	    });
}

//----------------------------------------------------------------------------------

/**
 * 깜빡임 시작 함수
 * @param {string} targetId - 깜빡임 대상 ID
 * @param {string} color - 깜빡임 색상
 */
// 성공
function blink(targetId, color) {
    const $target = document.getElementById(targetId);
    if (!$target) {
        console.error(`ID가 '${targetId}'인 요소를 찾을 수 없습니다.`);
        return;
    }

    let isRed = false; // 빨간색 여부를 토글하기 위한 변수

    blinkInterval = setInterval(() => {
        isRed = !isRed;
        $target.style.borderColor = isRed ? color : "transparent";
    }, 350); // 350ms 간격으로 깜빡임
}

/**
 * 깜빡임 중지 함수
 * @param {string} targetId - 깜빡임 대상 ID
 */
function blinkStop(targetId) {
    const $target = document.getElementById(targetId);
    if (!$target) {
        console.error(`ID가 '${targetId}'인 요소를 찾을 수 없습니다.`);
        return;
    }

    clearInterval(blinkInterval); // 깜빡임 멈추기
    $target.style.borderColor = ""; // 테두리 기본값으로 초기화
    blinkInterval = null;
}

//-----------------------------------------------------------------------------------
//신고, 상황종료
const $reportContainer = $(".report-container"); // 신고 컨테이너
const $protocolContainer = $(".sb-container"); // 상황 종료 컨테이너
// 초기 상태에서 .report-container 숨기기
  $reportContainer.hide().css({
    opacity: 0,
    transform: "translateY(-10px)",
  });
  
  // 초기 상태에서 프로토콜 버튼 컨테이너 숨기기
      $protocolContainer.hide().css({
        opacity: 0,
        transform: "translateY(-10px)",
        borderColor: "transparent", // 초기 borderColor 설정
      });

function showReportContainer() {
    if ($reportContainer.is(":hidden")) {
      $reportContainer.stop(true, true).show().animate(
        {
          opacity: 1,
          transform: "translateY(0)",
        },
        150
      );
    }
  }
  
function showProtocolContainer() {
      if ($protocolContainer.is(":hidden")) {
        $protocolContainer.stop(true, true).show().animate(
          {
            opacity: 1,
            transform: "translateY(0)",
          },
          150
        );
      }
    }

  /**
   * .report-container를 숨기기
   */
  
  $("#stop-blink").on("click", function () {
    hideReportContainer(); // 신고 컨테이너 숨기기
    $protocolContainer.stop(true, true).animate(
      {
        opacity: 0,
        transform: "translateY(-10px)",
      },
      350,
      function () {
        $(this).hide(); // 애니메이션 완료 후 숨기기
      }
    );
  });

  function hideReportContainer() {
    $reportContainer.stop(true, true).animate(
      {
        opacity: 0,
        transform: "translateY(-10px)",
      },
      350,
      function () {
        $(this).hide(); // 애니메이션 완료 후 숨기기
      }
    );
  }
  
  
  
//------------------------------------------------------------------------------------
window.onload = () => {
    // WebSocket 연결
    connectWebSockets();
};
