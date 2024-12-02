/*
--0 ➡️➡️➡️'CAM-container' 이상•연기 AI탐지 --> '탐지 화면 프레이밍+깜빡임' && '프로토콜 버튼' 활성화 이벤트
--1 '로그 토글 버튼' 클릭 --> '.log-tuple이 on/off' 이벤트
--2 'CAM-container' 화면 클릭 --> '선택 화면 확대/축소' 이벤트 & '화면 제외' 이벤트
--3 '헤더 버튼' 클릭 --> header의 자손 button 클릭 시 팝업창 띄우기 이벤트  
--4 'CAM-container' 영상 새로고침 때마다 자동재생(네트워크 무관)
--5 ➡️➡️➡️'addLog' --> '.log-tuple이 append 되는 이벤트'
--6 ➡️➡️➡️이상 탐지 로그 자동 추가
--7 ➡️➡️➡️'로그 추가 이벤트' 시 '프로토콜 버튼 컨테이너' 표시 및 상황 종료 시 숨기기
--8 제외할 '개별 화면 컨테이너' 선택('화면 제외 실행') && 노출 화면 초기화
--9 ➡️➡️➡️'로그 추가 이벤트' 시 로그 발생 시점부터 '녹화 시작' && 'DB에 로그 저장(txt•video)'
-10 ➡️➡️➡️'저장된 로그' 탭 클릭 시 '녹화•저장된 로그(txt•video)' 조회 : 녹화 영상은 페이지 이동
-11 드래그 앤 드롭 및 레이아웃 옵션
*/

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --0 'CAM-container' 이상•연기 AI탐지 --> '탐지 화면 프레이밍+깜빡임' && '프로토콜 버튼' 활성화 이벤트 */

// AI 탐지 이벤트 시 강조 및 깜빡임 효과 적용
$(document).ready(function () {
  let blinkInterval = null;

  $(".CAM-container").css({ borderColor: "#4a4a4a" });

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

  $("#blink-start-danger").on("click", function () {
    const targetId = $("#targetId").val();
    startBlink([{ id: targetId }], "#8B0000");
  });

  $("#blink-start-warning").on("click", function () {
    const targetId = $("#targetId").val();
    startBlink([{ id: targetId }], "#ff8c00");
  });

  $("#stop-blink").on("click", function () {
    const targetId = $("#targetId").val();
    stopBlink([{ id: targetId }]);
  });
});

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --1 '로그 토글' 버튼 클릭 --> '.log-tuple이 on/off' 이벤트 */

let clickCount = 0;
$(function () {
  // alt 속성이 "로그 토글 버튼"인 특정 버튼에 이벤트 바인딩
  $('.log-toggle>button[alt="로그 토글 버튼"]').click(function () {
    clickCount++;
    if (clickCount % 2 === 0) {
      // 짝수 번째 클릭: 로그 항목 표시
      $(".log-tuple").show(350); // show 애니메이션 350ms
    } else {
      // 홀수 번째 클릭: 로그 항목 숨기기
      $(".log-tuple").hide(150); // hide 애니메이션 150ms
    }
  });
});

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --2 'CAM-container' 화면 클릭 --> '선택 화면 확대/축소' 이벤트 & '화면 제외' 이벤트 */

$(document).ready(function () {
  let isExpanded = false; // 확장 상태 확인
  let pressTimer; // 클릭 시간 확인을 위한 타이머 변수
  const excludedCameras = new Set(); // 화면 제외된 CAM-container 저장
  let isCamSelClicked = false; // #cam-sel 버튼 클릭 여부 확인

  // CAM-container 확대/축소 이벤트
  $(".CAM-container")
    .on("mousedown", function () {
      const $this = $(this);

      // 클릭 시간 측정 시작
      pressTimer = setTimeout(() => {
        // 0.3초가 지나면 이벤트 비활성화
        pressTimer = null;
      }, 300);
    })
    .on("mouseup", function () {
      if (pressTimer) {
        clearTimeout(pressTimer); // 타이머 초기화

        const $MArea = $("#M-area"); // 모니터링 영역
        const $clickedItem = $(this); // 클릭된 CAM-container

        // 확대/축소 동작 처리
        if (!isExpanded) {
          // 🌟 확장 상태로 변경
          $MArea.css({ display: "block", width: "100%" }); // M-area를 단일 화면으로 확장

          // 🌟 제외된 화면을 제외하고 클릭된 CAM-container만 표시
          $clickedItem
            .addClass("expanded")
            .siblings(".CAM-container")
            .filter(function () {
              const camId = $(this).attr("id");
              return !excludedCameras.has(camId); // 제외되지 않은 CAM만 표시
            })
            .hide();
        } else {
          // 🌟 원래 상태로 복구
          $MArea.css({ display: "grid", width: "99%" }); // 그리드 레이아웃 복원

          // 🌟 제외된 화면을 제외한 CAM-container 다시 표시
          $(".CAM-container").each(function () {
            const camId = $(this).attr("id");
            if (!excludedCameras.has(camId)) {
              $(this).show();
            }
          });

          $clickedItem.removeClass("expanded");
        }

        isExpanded = !isExpanded; // 상태 토글
      }
    })
    .on("mouseleave", function () {
      clearTimeout(pressTimer); // 클릭 영역을 벗어나면 타이머 취소
    });

  // #cam-sel 버튼 클릭 시 제외 처리
  $("#cam-sel").on("click", function () {
    isCamSelClicked = true; // #cam-sel 버튼 클릭 상태 기록

    // 제외 처리
    $(".CAM-container").each(function () {
      const $this = $(this);
      const camId = $this.attr("id");

      if ($this.css("border-color") === "rgb(0, 128, 0)") {
        // 녹색 border인 CAM-container만 제외
        excludedCameras.add(camId);
        $this.fadeOut(300, function () {
          $this.css({
            border: "5px solid #4a4a4a", // 기본 border 복원
            display: "none",
          });
        });
      }
    });
  });

  // #cam-all 버튼 클릭 시 모든 CAM-container 표시
  $("#cam-all").on("click", function () {
    // 🌟 모든 화면 다시 표시
    excludedCameras.clear(); // 제외된 화면 목록 초기화
    $(".CAM-container").fadeIn(300, function () {
      $(this).css({
        border: "5px solid #4a4a4a", // 기본 border 복원
      });
    });
    isCamSelClicked = false; // 초기 상태로 복구
  });

  // 새로고침 시 제외 상태 유지
  $(window).on("load", function () {
    if (!isCamSelClicked) {
      // 🌟 #cam-sel 클릭 전 상태 유지
      $(".CAM-container").css({
        border: "5px solid #4a4a4a", // 기본 border 복원
      });
    } else {
      // 🌟 #cam-sel 클릭 후, 제외된 화면 숨기기
      $(".CAM-container").each(function () {
        const camId = $(this).attr("id");
        if (excludedCameras.has(camId)) {
          $(this).hide();
        }
      });
    }
  });

  // 초기 상태 설정: 확대/축소 이벤트가 제외된 화면에는 영향을 미치지 않도록
  $(".CAM-container").each(function () {
    const camId = $(this).attr("id");
    if (excludedCameras.has(camId)) {
      $(this).hide(); // 제외된 화면 숨기기
    }
  });
});

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --3 '헤더 버튼' 클릭 --> header의 자손 button 클릭 시 팝업창 띄우기 이벤트  */

$(document).ready(function () {
  // 팝업 구성 객체
  const popups = {
    safetyRules: {
      button: "#btn-safetyRules",
      popup: "#modal-safetyRules",
      content: "#content-safetyRules",
      title: "안전 수칙",
      endpoint: "/getSafetyRules",
    },
    protocol: {
      button: "#btn-protocol",
      popup: "#modal-protocol",
      content: "#content-protocol",
      title: "프로토콜",
      endpoint: "/getProtocol",
    },
    EEIF: {
      button: "#btn-EEIF",
      popup: "#modal-EEIF",
      content: "#content-EEIF",
      title: "연락망",
      endpoint: "/getEEIF",
    },
    savedLog: {
      button: "#btn-savedLog",
      popup: "#modal-savedLog",
      content: "#content-savedLog",
      title: "저장된 로그",
      endpoint: "/getSavedLog",
    },
  };

  /**
   * 팝업 열기 함수
   * @param {Object} config - 팝업 구성 객체
   */
  function openPopup(config) {
    const { popup, content, title, endpoint } = config;

    // 서버로부터 데이터 요청
    $.ajax({
      url: endpoint,
      method: "GET",
      success: function (data) {
        const message = data.message || "데이터를 불러올 수 없습니다.";
        const dynamicContent = `<h3>${title}</h3><p>${message}</p>`;
        $(content).html(dynamicContent);
        $(popup).css("display", "block").animate({ top: "20%" }, 500);
      },
      error: function () {
        $(content).html("<p>서버 연결 오류가 발생했습니다.</p>");
        $(popup).css("display", "block").animate({ top: "20%" }, 500);
      },
    });
  }

  /**
   * 팝업 닫기 함수
   * @param {string} popup - 닫을 팝업 ID
   */
  function closePopup(popup) {
    $(popup).animate({ top: "-100%" }, 500, function () {
      $(this).css("display", "none");
    });
  }

  /**
   * 팝업 열기/닫기 이벤트 등록
   */
  Object.keys(popups).forEach((key) => {
    const config = popups[key];

    // 동적 이벤트 위임 방식으로 버튼 클릭 이벤트 등록
    $(document).on("click", config.button, function (event) {
      event.preventDefault(); // 기본 동작 방지 (필요 시)
      const popupVisible = $(config.popup).css("display") === "block";

      if (popupVisible) {
        closePopup(config.popup);
      } else {
        openPopup(config);
      }
    });

    // 닫기 버튼 이벤트 등록
    $(document).on("click", `${config.popup} .closePopup`, function (event) {
      event.preventDefault(); // 기본 동작 방지
      closePopup(config.popup);
    });
  });

  // 부가기능 탭 내부에서 이벤트가 차단되지 않도록 설정
  $(document).on("click", "nav[alt='부가기능 탭'] button", function (event) {
    event.stopPropagation(); // 이벤트 전파 차단 방지
  });
});

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --4 'CAM-container' 영상 새로고침 때마다 자동재생(네트워크 무관) */

document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.play().catch((error) => {
      console.error("자동 재생이 차단되었습니다:", error);
    });
  });
});

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --5 'addLog' --> '.log-tuple이 append 되는 이벤트' / 'logData' --> 발생한 로그를 서버에 전송 */

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

$(function () {
  const logToggleButton = $('button[alt="로그 토글 버튼"]'); // 로그 토글 버튼
  const $protocolContainer = $("#on-the-case"); // 프로토콜 버튼 컨테이너
  const $stopBlinkButton = $("#stop-blink"); // 상황 종료 버튼
  const $reportButton = $("#report"); // 119 신고 버튼

  // 🗑️ 버튼 클릭 시 모든 로그 비우기
  $('button[alt="로그 비우기 버튼"]').click(function () {
    const $logContainer = $("#log-tuple-container");

    // 로그 전체에 페이드 아웃 애니메이션 적용
    $logContainer.children(".log-tuple").animate(
      {
        opacity: 0,
        height: 0, // 점진적으로 높이를 줄여 사라지는 효과
        margin: 0, // 여백 제거로 완전 축소
      },
      300, // 애니메이션 지속 시간
      function () {
        // 애니메이션 완료 후 요소 제거
        $(this).remove();
      }
    );

    // 애니메이션 완료 후 로그 상태 업데이트
    setTimeout(() => {
      updateLogToggleButton(); // 버튼 이모지 업데이트
    }, 50); // 애니메이션 시간보다 빠르게 설정
  });

  /**
   * 로그 상태에 따라 로그 토글 버튼 이모지 변경
   */
  function updateLogToggleButton() {
    const logCount = $(".log-tuple").length; // 현재 로그 개수 확인
    const newEmoji = logCount > 0 ? "✅" : "🔕"; // 로그 상태에 따른 이모지
    logToggleButton
      .fadeOut(200, function () {
        $(this).text(newEmoji); // 이모지 변경
      })
      .fadeIn(200); // 부드러운 전환
  }

  // 초기 상태 설정
  logToggleButton.text("🔕");
  updateLogToggleButton();
});

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --6 이상 탐지 로그 자동 추가 */
/* --7 '로그 추가 이벤트' 시 '프로토콜 버튼 컨테이너' 표시 및 상황 종료 시 숨기기 */

$(document).ready(function () {
  /**
   * 현재 시각을 YYYY-MM-DD HH24:MI:SS 형식으로 반환
   * @returns {string} - 포맷된 타임스탬프
   */
  function getFormattedTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `[${hours}:${minutes}]<br>${year}-${month}-${day}`;
  }

  /**
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

    // 로그 상태에 따라 토글 버튼 상태 변경
    updateLogToggleButton();

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

  /**
   * 로그 상태에 따라 로그 토글 버튼 이모지 변경
   */
  function updateLogToggleButton() {
    const logCount = $(".log-tuple").length;
    const newEmoji = logCount > 0 ? "✅" : "🔕";
    $('button[alt="로그 토글 버튼"]')
      .fadeOut(200, function () {
        $(this).text(newEmoji);
      })
      .fadeIn(200);
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

    /**
     * 프로토콜 버튼 컨테이너를 부드럽게 나타내기
     */
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

//* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --8 제외할 '개별 화면 컨테이너' 선택('화면 제외 실행') && 노출 화면 초기화 */

$(document).ready(function () {
  const $targetDisplay = $('div[alt="제외 화면 표시"] > span'); // 선택된 카메라 번호를 표시할 요소
  let hiddenCameras = JSON.parse(localStorage.getItem("hiddenCameras")) || []; // 숨겨진 카메라 ID 저장 (로컬 저장소에서 불러옴)
  let pressTimer; // 클릭 시간 확인을 위한 타이머 변수
  let clearedHiddenCameras = []; // 새로 선택된 카메라만 저장
  let camSelClicked = false; // #cam-sel 클릭 여부
  const clickCountMap = {}; // 각 CAM-container의 클릭 횟수를 저장

  // 초기 상태: #cam-all 컨테이너만 노출, #cam-sel 컨테이너 숨김
  $('section[alt="화면 수 조절 버튼"] > #cam-sel').parent().hide();
  $('section[alt="화면 수 조절 버튼"] > #cam-all').parent().show();

  // 페이지 로드 시 숨겨진 카메라 초기화
  hiddenCameras.forEach((cameraId) => {
    $(`#${cameraId}`).fadeOut(300); // 숨겨진 카메라 유지 (부드러운 전환 추가)
  });
  updateTargetDisplay(hiddenCameras); // span에 표시된 카메라 갱신

  // CAM-container 요소 꾹 눌렀을 때 이벤트 처리
  $(".CAM-container")
    .on("mousedown", function () {
      const $this = $(this);
      const cameraId = $this.attr("id"); // CAM-container의 ID 가져오기

      pressTimer = setTimeout(() => {
        // 클릭 횟수 초기화
        if (!clickCountMap[cameraId]) {
          clickCountMap[cameraId] = 0;
        }

        // 클릭 횟수 증가
        clickCountMap[cameraId]++;

        if (clickCountMap[cameraId] % 2 === 1) {
          // 홀수번째 클릭: 녹색 border 적용 및 제외 화면 추가
          $this.css({
            border: "6px solid green",
            transition: "border-color 0.3s ease",
          });

          if (!clearedHiddenCameras.includes(cameraId)) {
            clearedHiddenCameras.push(cameraId); // 새로 선택된 카메라 추가
            $targetDisplay.text(
              clearedHiddenCameras
                .map((id) => $(`#targetId option[value="#${id}"]`).text())
                .join(", ")
            );
          }
        } else {
          // 짝수번째 클릭: border 원래대로 복원 및 제외 화면에서 제거
          $this.css({
            border: "6px solid #4a4a4a",
            transition: "border-color 0.3s ease",
          });

          clearedHiddenCameras = clearedHiddenCameras.filter(
            (id) => id !== cameraId
          );
          $targetDisplay.text(
            clearedHiddenCameras
              .map((id) => $(`#targetId option[value="#${id}"]`).text())
              .join(", ")
          );
        }

        // 🌟 녹색 border가 있는 CAM-container가 하나라도 있으면 #cam-sel 나타내기
        if (clearedHiddenCameras.length > 0) {
          $('section[alt="화면 수 조절 버튼"] > #cam-all').parent().hide();
          $('section[alt="화면 수 조절 버튼"] > #cam-sel').parent().fadeIn(200);

          // 🌟 top-bar에 hover 효과 강제 적용
          const $topBar = $("top-bar[alt='화면 수 조절 바']");
          $topBar.addClass("hover-effect");
        } else {
          // 녹색 border가 없으면 #cam-sel 숨기고 #cam-all 표시
          $('section[alt="화면 수 조절 버튼"] > #cam-sel').parent().hide();
          $('section[alt="화면 수 조절 버튼"] > #cam-all').parent().fadeIn(500);

          // top-bar hover 효과 해제
          const $topBar = $("top-bar[alt='화면 수 조절 바']");
          $topBar.removeClass("hover-effect");
        }
      }, 350); // 0.35초 동안 누르고 있을 때 실행
    })
    .on("mouseup mouseleave", function () {
      clearTimeout(pressTimer); // 마우스를 떼거나 영역을 벗어나면 타이머 취소
    });

  // #cam-sel 버튼 클릭 시 지정된 카메라 숨기기
  $("#cam-sel").on("click", function () {
    camSelClicked = true; // #cam-sel 클릭 상태 기록
    clearedHiddenCameras.forEach((cameraId) => {
      $(`#${cameraId}`).fadeOut(300); // 지정된 카메라 숨김 (부드러운 전환 추가)
      if (!hiddenCameras.includes(cameraId)) {
        hiddenCameras.push(cameraId); // 숨겨진 카메라 리스트에 추가
        localStorage.setItem("hiddenCameras", JSON.stringify(hiddenCameras)); // 로컬 저장소에 저장
      }
    });

    clearedHiddenCameras = []; // 새로 선택된 카메라 초기화
    $targetDisplay.text(""); // span 초기화

    // 🌟 top-bar hover 효과 부드럽게 해제
    const $topBar = $("top-bar[alt='화면 수 조절 바']");
    $topBar.removeClass("hover-effect").fadeOut(150, function () {
      $(this).fadeIn(300); // 부드러운 전환 효과로 다시 나타남
    });

    // 🌟 기본값으로 돌아가 #cam-all 표시
    $('section[alt="화면 수 조절 버튼"] > #cam-sel').parent().hide();
    $('section[alt="화면 수 조절 버튼"] > #cam-all').parent().fadeIn(500); // 기본값 복원 전환 부드럽게
  });

  // #cam-all 버튼 클릭 시 모든 카메라 다시 노출 및 border 초기화
  $("#cam-all").on("click", function () {
    hiddenCameras.forEach((cameraId) => {
      $(`#${cameraId}`).fadeIn(300).css({
        border: "6px solid #4a4a4a", // border 기본값 복원
        transition: "border-color 0.3s ease",
      });
    });
    hiddenCameras = []; // 숨겨진 카메라 리스트 초기화
    clearedHiddenCameras = []; // 새로 선택된 리스트도 초기화
    localStorage.removeItem("hiddenCameras"); // 로컬 저장소 초기화
    $targetDisplay.text(""); // 선택된 카메라 표시 초기화

    // 🌟 기본값으로 돌아가 #cam-sel 숨기고 #cam-all 표시
    $('section[alt="화면 수 조절 버튼"] > #cam-sel').parent().hide();
    $('section[alt="화면 수 조절 버튼"] > #cam-all').parent().fadeIn(500);

    // top-bar hover 효과 해제
    const $topBar = $("top-bar[alt='화면 수 조절 바']");
    $topBar.removeClass("hover-effect");
  });

  // 새로고침 시 cam-sel 클릭 전 상태 유지 및 border 초기화
  $(window).on("load", function () {
    if (!camSelClicked) {
      $('section[alt="화면 수 조절 버튼"] > #cam-sel').parent().hide();
      $('section[alt="화면 수 조절 버튼"] > #cam-all').parent().show();

      // 🌟 새로고침 시 모든 CAM-container의 border 초기화
      $(".CAM-container").css({
        border: "6px solid #4a4a4a",
        transition: "border-color 0.3s ease",
      });
      clearedHiddenCameras = []; // 선택된 카메라 초기화
    }
  });

  /**
   * span에 표시된 카메라를 업데이트
   * @param {Array} cameras - 카메라 ID 배열
   */
  function updateTargetDisplay(cameras) {
    const cameraLabels = cameras.map((id) =>
      $(`#targetId option[value="#${id}"]`).text()
    );
    $targetDisplay.text(cameraLabels.join(", "));
  }

  // 동영상 자동 재생 유지
  $("video").each(function () {
    this.play().catch((error) => {
      console.error("자동 재생이 차단되었습니다:", error);
    });
  });
});

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --9 ➡️➡️➡️'로그 추가 이벤트' 시 로그 발생 시점부터 '녹화 시작' && 'DB에 로그 저장(txt•video)' */
/* -10 ➡️➡️➡️'저장된 로그' 탭 클릭 시 '녹화•저장된 로그(txt•video)' 조회 : 녹화 영상은 페이지 이동  */

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --11 드래그 앤 드롭 및 레이아웃 옵션 */
$(document).ready(function () {
  // 드래그 앤 드롭
  $(".CAM-container").draggable({
    revert: "invalid",
    zIndex: 100,
  });

  $("#category-list .category").droppable({
    accept: ".CAM-container",
    drop: function (event, ui) {
      const droppedItem = ui.draggable;
      $(this).append(droppedItem);
    },
  });

  // 레이아웃 옵션
  $(".layout-btn").on("click", function () {
    const layout = $(this).data("layout");
    const $Marea = $("#M-area");

    if (layout === "grid-4") {
      $Marea.css("grid-template-columns", "repeat(4, 1fr)");
    } else if (layout === "grid-2") {
      $Marea.css("grid-template-columns", "repeat(2, 1fr)");
    } else if (layout === "grid-1") {
      $Marea.css("grid-template-columns", "1fr");
    }
  });
});
