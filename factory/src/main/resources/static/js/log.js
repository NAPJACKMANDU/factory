/**
 * --💡 log.js ◼️◼️◼️◼️◼️
 * --0 웹소켓 트리거 이벤트
 * --1 'CAM-container' 이상•연기 AI탐지 --> '탐지 화면 프레이밍+깜빡임' && '프로토콜 버튼' 활성화 이벤트
 *
 * --4 'addLog' --> '.log-tuple이 append 되는 이벤트' / 'logData' --> 발생한 로그를 서버에 전송
 * --5 이상 탐지 로그 자동 추가
 * --6 '로그 추가 이벤트' 시 '프로토콜 버튼 컨테이너' 표시 및 상황 종료 시 숨기기
 * --7 AI 탐지 이벤트 시 강조 및 깜빡임 효과 적용
 * --8 119신고 + 상황 종료 버튼 활성화
 * --9 비상 대응 지침 브라우저 팝업
 */

// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================

/* --0 웹소켓 트리거 이벤트 */

let socket2;

function connectWebSockets() {
  // 두 번째 WebSocket: 낙상 감지 데이터
  socket2 = new WebSocket("ws://172.30.1.54:8095/res");

  socket2.onopen = () => {
    console.log("Socket2(WebSocket for fall detection) 연결됨");
  };

  socket2.onmessage = (event) => {
    try {
      console.log("온메세지 이벤트 발생");
      const data = JSON.parse(event.data);
      console.log("수신한 데이터:", data);
      console.log(data.fallDetected);

      if (data.fallDetected !== undefined) {
        // data.fallDetected가 참이면 현재 시간으로 로그 띄우기
        if (data.fallDetected) {
          blink("cam1", "red");
          plusLog("cam1", "위험", "🚨");
          showReportContainer();
          showProtocolContainer();
        }
      } else {
        console.error("데이터에 fallDetected 속성이 없습니다:", data);
      }
    } catch (error) {
      console.error("WebSocket 메시지 처리 오류:", error);
    }
  };

  socket2.onerror = (error) => {
    console.error("Socket2(WebSocket for fall detection) 에러:", error);
  };

  socket2.onclose = () => {
    console.log("Socket2(WebSocket for fall detection) 닫힘");
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
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
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
function plusLog(cameraId, status, icon) {
  const timestamp = getFormattedTimestamp();
  const logContainer = document.getElementById("log-tuple-container");

  // 로그 HTML 템플릿 생성
  const newLog = document.createElement("section");
  newLog.setAttribute("alt", "로그-튜플");
  newLog.className = "log-tuple";
  newLog.style.opacity = 0; // 초기 투명도 설정
  newLog.style.transform = "translateY(-10px)"; // 초기 위치 설정

  // p태그에 직접 style 걸기 - 로그 폰트 작게(타임스탬프프)
  newLog.innerHTML = `
	        <p class="log-timestamp" style="font-size: small;">${timestamp}</p>
	        <p alt="로그 콘텐츠" class="log-content">${cameraId}</p>
	        <span class="log-content">${icon}</span>
	    `;

  // 로그 컨테이너에 추가
  logContainer.prepend(newLog);

  // 부드러운 전환 애니메이션
  requestAnimationFrame(() => {
    newLog.style.opacity = 1;
    newLog.style.transform = "translateY(0)";
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

// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================

/* --1 'CAM-container' 이상•연기 AI탐지 --> '탐지 화면 프레이밍+깜빡임' && '프로토콜 버튼' 활성화 이벤트 */

// AI 탐지 이벤트 시 강조 및 깜빡임 효과 적용
$(document).ready(function () {
  let blinkInterval = null; // 깜빡임 제어 변수
  let warningActive = false; // #blink-start-warning 클릭 상태 확인

  // 초기 CAM-container 테두리 색상 설정
  $(".CAM-container").css({ borderColor: "#34495e" });

  /*
   * 깜빡임 시작 함수
   * @param {Array} targets - 대상 CAM-container ID 리스트
   * @param {string} color - 깜빡임 색상
   */

  function startBlink(targets, color) {
    blinkInterval = setInterval(() => {
      targets.forEach(({ id }) => {
        const $target = $(id);
        if ($target.length) {
          const currentColor = $target.css("border-color");
          $target.css({
            borderColor:
              currentColor === "rgba(0, 0, 0, 0)" ||
              currentColor === "transparent"
                ? color
                : "rgba(0, 0, 0, 0)",
          });
        } else {
          console.warn(`ID: ${id}가 존재하지 않습니다.`);
        }
      });
    }, 350);
  }

  /*
   * 깜빡임 중지 함수
   * @param {Array} targets - 대상 CAM-container ID 리스트
   */
  function stopBlink(targets) {
    clearInterval(blinkInterval);
    targets.forEach(({ id }) => {
      const $target = $(id);
      if ($target.length) {
        $target.css({ borderColor: "#34495e" });
      }
    });
    blinkInterval = null;
  }

  //#blink-start-warning 버튼 클릭 이벤트
  $("#blink-start-warning").on("click", function () {
    const targetId = $("#targetId").val();
    warningActive = true; // #blink-start-warning 활성화 상태
    stopBlink([{ id: targetId }]); // 기존 깜빡임 제거
    startBlink([{ id: targetId }], "#ff8c00"); // 주황색 테두리 깜빡임 시작
  });

  //#blink-start-danger 버튼 클릭 이벤트
  $("#blink-start-danger").on("click", function () {
    if (!warningActive) {
      // #blink-start-warning 클릭 선행 조건 확인
      alert("먼저 '이상 확인 중' 버튼을 클릭하세요."); // 사용자 알림
      return;
    }
    const targetId = $("#targetId").val();
    stopBlink([{ id: targetId }]); // 기존 깜빡임 제거 (중첩 방지)
    startBlink([{ id: targetId }], "#8B0000"); // 빨간색 테두리 깜빡임 시작
    warningActive = false; // #blink-start-warning 상태 초기화
  });

  //#stop-blink 버튼 클릭 이벤트
  $("#stop-blink").on("click", function () {
    const targetId = $("#targetId").val();
    stopBlink([{ id: targetId }]); // 깜빡임 제거
    warningActive = false; // 상태 초기화
  });
});

// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================

/* --4 'addLog' --> '.log-tuple이 append 되는 이벤트' / 'logData' --> 발생한 로그를 서버에 전송 */

/**
 * 로그를 추가하고 부드러운 전환 애니메이션 적용
 * @param {string} cameraNumber - 카메라 번호
 * @param {string} status - '경고' 또는 '위험'
 * @param {string} icon - 상태 아이콘
 */
function addLog(cameraNumber, status, icon) {
  const timestamp = getFormattedTimestamp();
  const newLog = $(`
    <section alt="로그-튜플" class="log-tuple" style="opacity: 0; transform: translateY(-10px);">
      <p alt="로그 콘텐츠" class="log-content">카메라 ${cameraNumber}</p>
      <p class="log-timestamp">${timestamp}</p>
      <p alt="로그 상태" class="log-content">${status}</p>
      <span class="log-content">${icon}</span>
    </section>
  `);

  $("#log-tuple-container").prepend(newLog);

  // 부드러운 전환 애니메이션 적용
  newLog.animate({ opacity: 1, transform: "translateY(0)" }, 200);

  // 로그 상태에 따라 토글 버튼 상태 변경
  updateLogToggleButton();

  // // 🌟 addLog 실행 시 휴지통 버튼 표시
  // $('button[alt="로그 비우기 버튼"]').fadeIn(300);

  // 서버로 로그 데이터 전송
  const logData = {
    cameraNumber: cameraNumber || "unknown", // 기본값 설정: cameraNumber가 없을 경우 기본값 "unknown" 사용
    status: status || "undefined", // 기본값 설정: status가 없을 경우 기본값 "undefined" 사용
    icon: icon || "default", // 기본값 설정: icon이 없을 경우 기본값 "default" 사용
    timestamp: timestamp || new Date().toISOString(), // 기본값 설정: timestamp가 없을 경우 현재 시간을 ISO 포맷으로 추가
  };

  // 서버 엔드포인트 설정
  const logEndpoint = "https://api.#.com/saveLog"; // 엔드포인트 URL 수정 필요 ⬅️⬅️⬅️

  // 데이터 전송
  $.ajax({
    url: logEndpoint, // 서버의 로그 저장 API 경로
    method: "POST", // HTTP 메서드: POST를 사용해 데이터를 서버에 전송
    contentType: "application/json", // 전송 데이터 타입: JSON
    data: JSON.stringify(logData), // 데이터를 JSON 문자열로 변환
    success: function (response) {
      console.log("로그 저장 성공:", response); // 서버 응답 출력
      // 성공 시 추가 작업을 여기에 작성 가능
    },
    error: function (error) {
      console.error("로그 저장 실패:", error); // 에러 출력
      // 사용자 친화적인 에러 알림 메시지
      alert("로그 저장에 실패했습니다. 다시 시도해주세요.");
    },
  });
}

// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================

/* --5 이상 탐지 로그 자동 추가 */

// $(function () {
//   const $trashButton = $('button[alt="로그 비우기 버튼"]'); // 🌟 휴지통 버튼

//   // 🌟 초기 상태에서 휴지통 버튼 숨김
//   // $trashButton.hide();

//   // 🗑️ 버튼 클릭 시 모든 로그 비우기
//   $trashButton.click(function () {
//     const $logContainer = $("#log-tuple-container");

//     // 로그 전체에 페이드 아웃 애니메이션 적용
//     $logContainer.children(".log-tuple").animate(
//       {
//         opacity: 0,
//         margin: 0, // 여백 제거로 완전 축소
//       },
//       300 // 애니메이션 지속 시간
//       // function () {
//       //   $(this).remove(); // 애니메이션 완료 후 요소 제거

//       //   // 🌟 모든 로그 제거 후 휴지통 버튼 숨김
//       //   if ($(".log-tuple").length === 0) {
//       //     $trashButton.fadeOut(300);
//       //   }
//       // }
//     );
//   });
// });

// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================

/* --6 '로그 추가 이벤트' 시 '프로토콜 버튼 컨테이너' 표시 및 상황 종료 시 숨기기 */

$(document).ready(function () {
  /*
   * 현재 시각을 YY-MM-DD HH24:MI:SS 형식으로 반환
   * @returns {string} - 포맷된 타임스탬프
   */

  function getFormattedTimestamp() {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `[${hours}:${minutes}]<br><span class="small-font">${year}-${month}-${day}</span>`;
  }

  // const $trashButton = $('button[alt="로그 비우기 버튼"]'); // 🌟 휴지통 버튼

  // // 🌟 초기 상태에서 휴지통 버튼 숨김
  // $trashButton.hide();

  /*
   * 로그를 추가하고 부드러운 전환 애니메이션 적용
   * @param {string} cameraLabel - 카메라 라벨 (예: 카메라 1)
   * @param {string} status - '경고' 또는 '위험'
   * @param {string} icon - 상태 아이콘
   */

  function addLog(cameraLabel, status, icon) {
    const timestamp = getFormattedTimestamp();
    const newLog = $(`
      <section alt="로그-튜플" class="log-tuple" style="opacity: 0; transform: translateY(-10px);">
      <p class="log-timestamp">${timestamp}</p>
      <p alt="로그 콘텐츠" class="log-content">${cameraLabel}</p>
      <span class="log-content">${icon}</span>
      </section>
    `);

    $("#log-tuple-container").prepend(newLog);

    // 부드러운 전환 애니메이션 적용
    newLog.animate({ opacity: 1, transform: "translateY(0)" }, 300);

    // // 🌟 addLog 실행 시 휴지통 버튼 표시
    // $trashButton.fadeIn(300);

    // 서버로 로그 데이터 전송
    const logData = {
      cameraLabel,
      status,
      icon,
      timestamp,
    };

    $.ajax({
      url: "/saveLog",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(logData),
      success: function (response) {
        console.log("로그 저장 성공:", response);
      },
      error: function (error) {
        console.error("로그 저장 실패:", error);
      },
    });
  }

  // ⚠️ '이상 확인 중' 버튼 클릭 시 경고 로그 추가
  $("#blink-start-warning").on("click", function () {
    const cameraLabel = $("#targetId option:selected").text(); // 선택된 옵션의 텍스트 가져오기
    addLog(cameraLabel, "경고", "⚠️");
  });

  // 🚨 '이상 발생' 버튼 클릭 시 위험 로그 추가
  $("#blink-start-danger").on("click", function () {
    const cameraLabel = $("#targetId option:selected").text(); // 선택된 옵션의 텍스트 가져오기
    addLog(cameraLabel, "위험", "🚨");
  });

  $(document).ready(function () {
    const $protocolContainer = $("#on-the-case");
    let pressTimer; // CAM-container 꾹 누르기 타이머

    // 초기 상태에서 프로토콜 버튼 컨테이너 숨기기
    $protocolContainer.hide().css({
      opacity: 0,
      transform: "translateY(-10px)",
      borderColor: "transparent", // 초기 borderColor 설정
    });

    //프로토콜 버튼 컨테이너를 부드럽게 나타내기

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

    // ⚠️🚨 '.btn-onTheCase' 버튼 클릭 시 프로토콜 버튼 컨테이너 표시 🌟🌟🌟🌟🌟➡️➡️➡️ 추후 통신 이벤트로 변경
    $(".btn-onTheCase").on("click", function () {
      showProtocolContainer();
    });

    // 상황 종료 버튼 클릭 시 프로토콜 버튼 컨테이너 숨기기
    $("#stop-blink").on("click", function () {
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
  });

  // 초기 버튼 상태 설정
  updateLogToggleButton();
});

// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================

/* --7 AI 탐지 이벤트 시 강조 및 깜빡임 효과 적용 */

$(document).ready(function () {
  let blinkInterval = null; // 깜빡임 제어 변수
  let warningTriggered = false; // #btn-warning 클릭 상태 확인

  // 초기 CAM-container 테두리 색상 설정
  $(".CAM-container").css({ borderColor: "#4a4a4a" });

  // 깜빡임 시작 함수
  // @param {Array} targets - 대상 CAM-container ID 리스트
  // @param {string} color - 깜빡임 색상

  function startBlink(targets, color) {
    blinkInterval = setInterval(() => {
      targets.forEach(({ id }) => {
        const $target = $(id);
        if ($target.length) {
          const currentColor = $target.css("border-color");
          $target.css({
            borderColor:
              currentColor === "rgba(0, 0, 0, 0)" ||
              currentColor === "transparent"
                ? color
                : "rgba(0, 0, 0, 0)",
          });
        } else {
          console.warn(`ID: ${id}가 존재하지 않습니다.`);
        }
      });
    }, 350);
  }

  // 깜빡임 중지 함수
  // @param {Array} targets - 대상 CAM-container ID 리스트

  function stopBlink(targets) {
    clearInterval(blinkInterval);
    targets.forEach(({ id }) => {
      const $target = $(id);
      if ($target.length) {
        $target.css({ borderColor: "#4a4a4a" });
      }
    });
    blinkInterval = null;
  }

  // #btn-warning 버튼 클릭 이벤트
  // "이상 확인 중" 상태로 변경하고 주황색 테두리로 깜빡임

  $("#btn-warning").on("click", function () {
    const targetId = $("#selectedCamera").val(); // 선택된 카메라 ID 가져오기
    warningTriggered = true; // #btn-warning 활성화 상태 설정
    stopBlink([{ id: targetId }]); // 기존 깜빡임 제거
    startBlink([{ id: targetId }], "#ff8c00"); // 주황색 테두리 깜빡임 시작
  });

  // #btn-danger 버튼 클릭 이벤트
  // "이상 발생" 상태로 빨간색 테두리로 깜빡임

  $("#btn-danger").on("click", function () {
    const targetId = $("#selectedCamera").val(); // 선택된 카메라 ID 가져오기
    warningTriggered = true;
    stopBlink([{ id: targetId }]); // 기존 깜빡임 제거 (중첩 방지)
    startBlink([{ id: targetId }], "#8B0000"); // 빨간색 테두리 깜빡임 시작
  });

  // #btn-stop 버튼 클릭 이벤트
  // 모든 깜빡임 효과 중지

  $("#btn-stop").on("click", function () {
    const targetId = $("#selectedCamera").val(); // 선택된 카메라 ID 가져오기
    stopBlink([{ id: targetId }]); // 깜빡임 제거
    warningTriggered = false; // 상태 초기화
  });
});

// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================

/* --8 119신고 + 상황 종료 버튼 활성화 */

$(document).ready(function () {
  const $reportContainer = $(".report-container"); // 신고 컨테이너
  const $protocolContainer = $(".sb-container"); // 상황 종료 컨테이너

  // 초기 상태에서 .report-container 숨기기
  $reportContainer.hide().css({
    opacity: 0,
    transform: "translateY(-10px)",
  });

  // .report-container를 부드럽게 나타내기

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

  // .report-container를 숨기기

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

  // blink 이벤트 트리거 시 .report-container 표시

  $("#blink-start-warning, #blink-start-danger").on("click", function () {
    showReportContainer(); // 신고 컨테이너 표시
  });

  // #stop-blink 버튼 클릭 시 .report-container와 .sb-container 숨기기

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
});

// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================
// =========================================================================================

/* --9 비상 대응 지침 브라우저 팝업 */

$(document).ready(function () {
  /**
   * 새로운 브라우저 팝업 열기 함수
   * - 팝업 URL, 이름, 창 특성을 설정하고 동적으로 HTML 콘텐츠를 로드합니다.
   */
  function openProtocolPopup() {
    const popupUrl = "about:blank"; // 팝업 URL, 초기값 설정 (동적 로드 전)
    const popupName = "ProtocolPopup"; // 팝업 창 이름 (고유)
    const popupFeatures = "width=800,height=600,scrollbars=yes,resizable=yes"; // 팝업 창 특성

    // 팝업 창 열기
    const popupWindow = window.open(popupUrl, popupName, popupFeatures);

    // 팝업이 정상적으로 열렸는지 확인
    if (popupWindow) {
      // AJAX를 통해 외부 HTML 파일 로드
      $.get("protocol-popup.html")
        .done(function (htmlContent) {
          // HTML 콘텐츠를 팝업 창에 삽입
          popupWindow.document.open(); // 팝업 창의 문서 초기화
          popupWindow.document.write(htmlContent); // 외부 HTML 삽입
          popupWindow.document.close(); // 문서 작성 완료

          // 스타일 및 스크립트 적용 확인 (예: CSS 파일 경로)
          const styleLink = popupWindow.document.createElement("link");
          styleLink.rel = "stylesheet";
          styleLink.href = "protocol-popup.css"; // CSS 파일 경로
          popupWindow.document.head.appendChild(styleLink);
        })
        .fail(function () {
          // HTML 파일 로드 실패 시 경고
          alert("팝업 콘텐츠를 로드하지 못했습니다. 경로를 확인하세요.");
        });
    } else {
      // 팝업 차단 경고
      alert("팝업이 차단되었습니다. 팝업 차단 설정을 확인해주세요.");
    }
  }

  // 이벤트 등록: 특정 버튼 클릭 시 팝업 열기
  $("#blink-start-danger").on("click", function () {
    openProtocolPopup(); // 팝업 열기 함수 호출
  });
});
