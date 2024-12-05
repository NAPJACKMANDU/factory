document.addEventListener("DOMContentLoaded", () => {
  // 드래그 가능한 항목 선택
  const items = document.querySelectorAll(".sub-category li");

  // 드롭 가능한 카메라 화면 선택
  const dropzones = document.querySelectorAll(".camera");

  // 화면 분할 버튼 선택
  const layoutButtons = document.querySelectorAll(".layout-btn");

  // 전체 리셋 버튼 선택
  const resetButton = document.querySelector(".reset-btn");

  // 카메라 그리드 컨테이너
  const cameraGrid = document.getElementById("cameraGrid");

  // 카테고리 클릭 이벤트 처리
  const categories = document.querySelectorAll(".category > span");
  categories.forEach((category) => {
    category.addEventListener("click", () => {
      const subCategory = category.nextElementSibling; // 해당 카테고리의 하위 요소
      if (subCategory) {
        const isVisible = subCategory.style.display === "block";
        subCategory.style.display = isVisible ? "none" : "block"; // 클릭 시 토글
      }
    });
  });

  // 드래그 시작 이벤트
  items.forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      // 이미지 또는 비디오 경로를 데이터로 저장
      if (item.dataset.img) {
        e.dataTransfer.setData("image", item.dataset.img);
      } else if (item.dataset.video) {
        e.dataTransfer.setData("video", item.dataset.video);
      }
    });
  });

  // 드래그 오버(드롭 허용)
  dropzones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault(); // 기본 동작 방지
      zone.classList.add("drag-over"); // 드래그 중 강조 스타일 추가
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("drag-over"); // 강조 스타일 제거
    });

    // 드롭 이벤트
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("drag-over");

      // 드래그 데이터에서 이미지 또는 비디오 경로 가져오기
      const imgSrc = e.dataTransfer.getData("image");
      const videoSrc = e.dataTransfer.getData("video");

      // 기존 내용 제거
      const existingNumber = zone.querySelector(".camera-number"); // 기존 번호 확인
      zone.innerHTML = "";

      // 이미지 드롭 처리
      if (imgSrc) {
        const img = document.createElement("img"); // 새로운 이미지 생성
        img.src = imgSrc;
        img.alt = "Camera Feed";
        img.style.width = "100%";
        img.style.height = "100%";
        zone.appendChild(img); // 드롭존에 이미지 추가
      }

      // 비디오 드롭 처리
      if (videoSrc) {
        const video = document.createElement("video"); // 새로운 비디오 생성
        video.src = videoSrc;
        video.controls = true; // 비디오 컨트롤 활성화
        video.autoplay = true; // 자동 재생
        video.loop = true; // 반복 재생
        video.style.width = "100%";
        video.style.height = "100%";
        zone.appendChild(video); // 드롭존에 비디오 추가
      }

      // 기존 번호 유지
      if (existingNumber) {
        zone.appendChild(existingNumber);
      }
    });
    // --------------------------------------------------------------
//    
//    let selectedVideoElement = null; // 현재 선택된 비디오 요소
//    let mediaRecorder;
//    let recordedChunks = [];
//
//    document.querySelectorAll('.video-item').forEach((item) => {
//      item.addEventListener('click', (event) => {
//        // 클릭한 항목의 비디오 경로 가져오기
//        const videoPath = event.target.getAttribute('data-video');
//
//        // 선택된 비디오를 표시하거나 처리할 수 있는 로직을 추가하세요.
//        if (selectedVideoElement) {
//          selectedVideoElement.srcObject.getTracks().forEach(track => track.stop()); // 이전 비디오 스트림 중지
//        }
//
//        // 새로운 비디오 요소 생성
//        selectedVideoElement = document.createElement('video');
//        selectedVideoElement.src = videoPath;
//        selectedVideoElement.controls = true;
//        selectedVideoElement.autoplay = true;
//        selectedVideoElement.loop = true;
//
//        document.body.appendChild(selectedVideoElement); // 비디오를 화면에 추가
//
//        // 선택된 비디오의 스트림을 캡처
//        const stream = selectedVideoElement.captureStream();
//        mediaRecorder = new MediaRecorder(stream);
//
//        mediaRecorder.ondataavailable = (e) => {
//          if (e.data.size > 0) {
//            recordedChunks.push(e.data);
//          }
//        };
//      });
//    });
//
//    // 's' 키를 눌렀을 때 녹화 시작
//    document.addEventListener("keydown", (event) => {
//      if (event.key === "s" && selectedVideoElement) {
//        mediaRecorder.start();
//        console.log("녹화가 시작되었습니다.");
//      }
//    });
//
//    // 'e' 키를 눌렀을 때 녹화 종료
//    document.addEventListener("keydown", (event) => {
//      if (event.key === "e" && mediaRecorder) {
//        mediaRecorder.stop();
//        mediaRecorder.onstop = async () => {
//          console.log("녹화가 종료되었습니다.");
//
//          const blob = new Blob(recordedChunks, { type: "video/webm" });
//          const formData = new FormData();
//          formData.append("file", blob, "recorded-video.webm");
//
//          try {
//            const response = await fetch("/videos/upload", {
//              method: "POST",
//              body: formData,
//            });
//            if (response.ok) {
//              console.log("동영상이 성공적으로 업로드되었습니다.");
//            } else {
//              console.error("동영상 업로드에 실패했습니다.");
//            }
//          } catch (error) {
//            console.error("동영상 업로드 중 오류가 발생했습니다:", error);
//          }
//        };
//      }
//    });
    // --------------------------------------------------------------
    
    // 우클릭 시 드롭존 초기화
    zone.addEventListener("contextmenu", (e) => {
      e.preventDefault(); // 기본 우클릭 메뉴 방지
      const existingNumber = zone.querySelector(".camera-number");
      zone.innerHTML = ""; // 드롭존 초기화
      if (existingNumber) {
        zone.appendChild(existingNumber); // 번호 유지
      }
    });
  });

  // 전체 드롭존 초기화
  resetButton.addEventListener("click", () => {
    dropzones.forEach((zone) => {
      const existingNumber = zone.querySelector(".camera-number");
      zone.innerHTML = ""; // 드롭존 초기화
      if (existingNumber) {
        zone.appendChild(existingNumber); // 번호 유지
      }
    });
  });

  // 화면 레이아웃 설정
  const layouts = {
    16: "repeat(4, 1fr)", // 16 화면 레이아웃
    4: "repeat(2, 1fr)", // 4 화면 레이아웃
    1: "1fr", // 1 화면 레이아웃
  };

  // 레이아웃 변경
  layoutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const layout = button.dataset.layout; // 버튼의 데이터 속성 가져오기
      const visibleCameras = parseInt(layout); // 표시할 화면 수

      cameraGrid.style.gridTemplateColumns = layouts[visibleCameras]; // 그리드 컬럼 변경

      dropzones.forEach((zone, index) => {
        zone.style.display = index < visibleCameras ? "block" : "none"; // 선택된 화면 수만큼 표시
      });
    });
  });

  // 초기 16 화면 설정
  document.querySelector('[data-layout="16"]').click(); // 기본 16 화면으로 초기화
});

// ==========================================================
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
    const $Marea = $(".M-area");

    if (layout === "grid-4") {
      $Marea.css("grid-template-columns", "repeat(4, 1fr)");
    } else if (layout === "grid-2") {
      $Marea.css("grid-template-columns", "repeat(2, 1fr)");
    } else if (layout === "grid-1") {
      $Marea.css("grid-template-columns", "1fr");
    }
  });
});

// ==========================================================

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
  const $trashButton = $('button[alt="로그 비우기 버튼"]'); // 🌟 휴지통 버튼

  // 🌟 초기 상태에서 휴지통 버튼 숨김
  $trashButton.hide();

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

    // 🌟 addLog 실행 시 휴지통 버튼 표시
    $trashButton.fadeIn(300);

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

// ==============================================

// AI 탐지 이벤트 시 강조 및 깜빡임 효과 적용
$(document).ready(function () {
  let blinkInterval = null; // 깜빡임 제어 변수
  let warningTriggered = false; // #btn-warning 클릭 상태 확인

  // 초기 CAM-container 테두리 색상 설정
  $(".CAM-container").css({ borderColor: "#4a4a4a" });

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
        $target.css({ borderColor: "#4a4a4a" });
      }
    });
    blinkInterval = null;
  }

  /**
   * #btn-warning 버튼 클릭 이벤트
   * "이상 확인 중" 상태로 변경하고 주황색 테두리로 깜빡임
   */
  $("#btn-warning").on("click", function () {
    const targetId = $("#selectedCamera").val(); // 선택된 카메라 ID 가져오기
    warningTriggered = true; // #btn-warning 활성화 상태 설정
    stopBlink([{ id: targetId }]); // 기존 깜빡임 제거
    startBlink([{ id: targetId }], "#ff8c00"); // 주황색 테두리 깜빡임 시작
  });

  /**
   * #btn-danger 버튼 클릭 이벤트
   * "이상 발생" 상태로 빨간색 테두리로 깜빡임
   */
  $("#btn-danger").on("click", function () {
    if (!warningTriggered) {
      // #btn-warning 클릭 선행 조건 확인
      alert("먼저 '이상 확인 중' 버튼을 클릭하세요."); // 사용자 알림
      return;
    }
    const targetId = $("#selectedCamera").val(); // 선택된 카메라 ID 가져오기
    stopBlink([{ id: targetId }]); // 기존 깜빡임 제거 (중첩 방지)
    startBlink([{ id: targetId }], "#8B0000"); // 빨간색 테두리 깜빡임 시작
    warningTriggered = false; // #btn-warning 상태 초기화
  });

  /**
   * #btn-stop 버튼 클릭 이벤트
   * 모든 깜빡임 효과 중지
   */
  $("#btn-stop").on("click", function () {
    const targetId = $("#selectedCamera").val(); // 선택된 카메라 ID 가져오기
    stopBlink([{ id: targetId }]); // 깜빡임 제거
    warningTriggered = false; // 상태 초기화
  });
});

// ==============================================
