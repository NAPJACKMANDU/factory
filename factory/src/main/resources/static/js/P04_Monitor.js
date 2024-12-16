/*
--2 '로그 토글 버튼' 클릭 --> '.log-tuple이 on/off' 이벤트
--3 '헤더 버튼' 클릭 --> header의 자손 button 클릭 시 팝업창 띄우기 이벤트  
--4 'CAM-container' 영상 새로고침 때마다 자동재생(네트워크 무관)
--5 ➡️➡️➡️'addLog' --> '.log-tuple이 append 되는 이벤트'
--8 제외할 '개별 화면 컨테이너' 선택('화면 제외 실행') && 노출 화면 초기화
--9 ➡️➡️➡️'로그 추가 이벤트' 시 로그 발생 시점부터 '녹화 시작' && 'DB에 로그 저장(txt•video)'
-10 ➡️➡️➡️'저장된 로그' 탭 클릭 시 '녹화•저장된 로그(txt•video)' 조회 : 녹화 영상은 페이지 이동
-11 드래그 앤 드롭 및 레이아웃 옵션
*/



/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --2 '로그 토글' 버튼 클릭 --> '.log-tuple이 on/off' 이벤트 */

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
    video.muted = true; // 소리 없음으로 자동 재생 허용
    video.play().catch((error) => {
      console.error("자동 재생이 차단되었습니다:", error);
    });
  });
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
    this.muted = true; // 비디오의 소리 제거
    this.play().catch((error) => {
      console.error("자동 재생이 차단되었습니다:", error);
    });
  });
});

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --9 ➡️➡️➡️'로그 추가 이벤트' 시 로그 발생 시점부터 '녹화 시작' && 'DB에 로그 저장(txt•video)' */
/* -10 ➡️➡️➡️'저장된 로그' 탭 클릭 시 '녹화•저장된 로그(txt•video)' 조회 : 녹화 영상은 페이지 이동  */
