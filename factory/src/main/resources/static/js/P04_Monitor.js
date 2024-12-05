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
  let blinkInterval = null; // 깜빡임 제어 변수
  let warningActive = false; // #blink-start-warning 클릭 상태 확인

  // 초기 CAM-container 테두리 색상 설정
  $(".CAM-container").css({ borderColor: "#34495e" });

  /**
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

  /**
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

  /**
   * #blink-start-warning 버튼 클릭 이벤트
   */
  $("#blink-start-warning").on("click", function () {
    const targetId = $("#targetId").val();
    warningActive = true; // #blink-start-warning 활성화 상태
    stopBlink([{ id: targetId }]); // 기존 깜빡임 제거
    startBlink([{ id: targetId }], "#ff8c00"); // 주황색 테두리 깜빡임 시작
  });

  /**
   * #blink-start-danger 버튼 클릭 이벤트
   */
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

  /**
   * #stop-blink 버튼 클릭 이벤트
   */
  $("#stop-blink").on("click", function () {
    const targetId = $("#targetId").val();
    stopBlink([{ id: targetId }]); // 깜빡임 제거
    warningActive = false; // 상태 초기화
  });
});

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --1 '로그 토글' 버튼 클릭 --> '.log-tuple이 on/off' 이벤트 */

// let clickCount = 0;
// $(function () {
//   // alt 속성이 "로그 토글 버튼"인 특정 버튼에 이벤트 바인딩
//   $('.log-toggle>button[alt="로그 토글 버튼"]').click(function () {
//     clickCount++;
//     if (clickCount % 2 === 0) {
//       // 짝수 번째 클릭: 로그 항목 표시
//       $(".log-tuple").show(350); // show 애니메이션 350ms
//     } else {
//       // 홀수 번째 클릭: 로그 항목 숨기기
//       $(".log-tuple").hide(150); // hide 애니메이션 150ms
//     }
//   });
// });

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --2 'CAM-container' 화면 클릭 --> '선택 화면 확대/축소' 이벤트 & '화면 제외' 이벤트 */

let selectedVideoElement = null; // 현재 선택된 비디오 요소
let mediaRecorder;
let recordedChunks = [];
let isRecording = false; // 녹화 상태 확인

$(document).ready(function () {
  let isExpanded = false; // 확장 상태 확인
  let expandedElement = null; // 확대된 CAM-container 추적
  let pressTimer; // 클릭 시간 확인을 위한 타이머 변수
  const excludedCameras = new Set(); // 화면 제외된 CAM-container 저장

  $(".CAM-container")
    .on("mousedown", function (event) {
      const $this = $(this);

      // 마우스 좌클릭인지 확인 (event.button === 0)
      if (event.button === 0) {
        pressTimer = setTimeout(() => {
          pressTimer = null;
        }, 300);
      }
    })
    .on("mouseup", function (event) {
      if (event.button !== 0) return;

      if (pressTimer) {
        clearTimeout(pressTimer);

        const $MArea = $(".M-area");
        const $clickedItem = $(this);

        if (!isExpanded) {
          $MArea.css({ display: "block", width: "100%" });

          $clickedItem
            .addClass("expanded")
            .css({
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1.5)",
              zIndex: 10,
            })
            .siblings(".CAM-container")
            .filter(function () {
              const camId = $(this).attr("id");
              return !excludedCameras.has(camId);
            })
            .hide();

          $("body").css("overflow", "hidden");

          // 클릭된 CAM-container에서 기존 비디오 요소를 참조
          selectedVideoElement = $clickedItem.find("video")[0];
          if (selectedVideoElement) {
            const stream = selectedVideoElement.captureStream();
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (e) => {
              if (e.data.size > 0) {
                recordedChunks.push(e.data);
              }
            };
          } else {
            console.error("비디오 요소를 찾을 수 없습니다.");
          }

          isExpanded = !isExpanded;
        } else {
          $MArea.css({ display: "grid", width: "99%" });

          $(".CAM-container").each(function () {
            const camId = $(this).attr("id");
            if (!excludedCameras.has(camId)) {
              $(this).show().css({
                position: "static",
                top: "auto",
                left: "auto",
                transform: "scale(1)",
                zIndex: 1,
              });
            }
          });

          $clickedItem.removeClass("expanded");
          $("body").css("overflow", "");
          isExpanded = !isExpanded;
        }
      }
    })
    .on("mouseleave", function () {
      clearTimeout(pressTimer);
    });

  // 's' 키로 녹화 시작
  document.addEventListener("keydown", (event) => {
    if (event.key === "s" && selectedVideoElement && !isRecording) {
      if (!mediaRecorder) {
        console.error("미디어 녹화기가 초기화되지 않았습니다.");
        return;
      }
      mediaRecorder.start();
      isRecording = true;
      console.log("녹화가 시작되었습니다.");
      console.log(mediaRecorder)
    }
  });

  // 'e' 키로 녹화 종료 및 업로드
  document.addEventListener("keydown", async (event) => {
    if (event.key === "e" && mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.onstop = async () => {
        console.log("녹화가 종료되었습니다.");

        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const formData = new FormData();
        formData.append("file", blob, "recorded-video.webm");

        try {
        	console.log("고고");
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

        recordedChunks = [];
        isRecording = false;
      };
    }
  });



  // #cam-sel 버튼 클릭 시 제외 처리
  // $("#cam-sel").on("click", function () {
  //   isCamSelClicked = true; // #cam-sel 버튼 클릭 상태 기록

  //   // 제외 처리
  //   $(".CAM-container").each(function () {
  //     const $this = $(this);
  //     const camId = $this.attr("id");

  //     if ($this.css("border-color") === "rgb(0, 128, 0)") {
  //       // 녹색 border인 CAM-container만 제외
  //       excludedCameras.add(camId);
  //       $this.fadeOut(300, function () {
  //         $this.css({
  //           border: "5px solid #4a4a4a", // 기본 border 복원
  //           display: "none",
  //         });
  //       });
  //     }
  //   });
  // });

  // #cam-all 버튼 클릭 시 모든 CAM-container 표시
  // $("#cam-all").on("click", function () {
  //   // 🌟 모든 화면 다시 표시
  //   excludedCameras.clear(); // 제외된 화면 목록 초기화
  //   $(".CAM-container").fadeIn(300, function () {
  //     $(this).css({
  //       border: "5px solid #4a4a4a", // 기본 border 복원
  //     });
  //   });
  //   isCamSelClicked = false; // 초기 상태로 복구
  // });

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

  // 🌟 addLog 실행 시 휴지통 버튼 표시
  $('button[alt="로그 비우기 버튼"]').fadeIn(300);

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
  const $trashButton = $('button[alt="로그 비우기 버튼"]'); // 🌟 휴지통 버튼
  const $protocolContainer = $("#on-the-case"); // 프로토콜 버튼 컨테이너
  const $stopBlinkButton = $("#stop-blink"); // 상황 종료 버튼
  const $reportButton = $("#report"); // 119 신고 버튼

  // 🌟 초기 상태에서 휴지통 버튼 숨김
  $trashButton.hide();

  // 🗑️ 버튼 클릭 시 모든 로그 비우기
  $trashButton.click(function () {
    const $logContainer = $("#log-tuple-container");

    // 로그 전체에 페이드 아웃 애니메이션 적용
    $logContainer.children(".log-tuple").animate(
      {
        opacity: 0,
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

      // 🌟 모든 로그 제거 후 휴지통 버튼 숨김
      if ($(".log-tuple").length === 0) {
        $trashButton.fadeOut(300);
      }
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
        border: "6px solid #34495e",
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
