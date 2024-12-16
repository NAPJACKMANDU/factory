/**
 * --💡 CCTV_Monitor.js ◼️◼️◼️◼️◼️
 *
 * --1 드래그 앤 드롭
 * --2 우클릭 시 드롭존 초기화
 * --3 드래그 앤 드롭 및 레이아웃 옵션
 * --4 'CAM-container' 화면 클릭 --> '선택 화면 확대/축소' 이벤트 & '화면 제외' 이벤트
 */

// ==========================================================
/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --1 드래그 앤 드롭 */

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
      } else if (item.dataset.src) {
        e.dataTransfer.setData("jsp", item.dataset.src);
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
      // 드래그한 JSP 경로 가져오기
      const jspPath = e.dataTransfer.getData("jsp");

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

      if (jspPath) {
        // 기존 내용 제거
        const existingNumber = zone.querySelector(".camera-number");
        zone.innerHTML = "";

        // JSP를 iframe으로 로드
        const iframe = document.createElement("iframe");
        iframe.src = jspPath;
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.frameBorder = "0";
        zone.appendChild(iframe);
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

    // ==========================================================
    /* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
    /* --2 우클릭 시 드롭존 초기화 */

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
/* --3 드래그 앤 드롭 및 레이아웃 옵션 */

$(document).ready(function () {
  let maxCount = 2; // 초기 열 수 (grid-4 레이아웃)
  let rowCount = 2; // 초기 행 수

  /**
   * 💡 행(rowCount)과 열(maxCount)을 업데이트하는 함수
   * - 현재 CAM-container 개수를 기준으로 행(rowCount)을 동적으로 계산
   * - maxCount는 현재 레이아웃 설정에 따라 변경됨
   */
  function updateCounts() {
    const totalItems = $(".CAM-container").length; // 현재 화면에 있는 CAM-container 개수
    rowCount = Math.ceil(totalItems / maxCount); // 총 항목 수를 열 수로 나눈 뒤 올림하여 행 수 계산
    console.log("Updated maxCount:", maxCount);
    console.log("Updated rowCount:", rowCount);
  }

  /**
   * 💡 드래그 앤 드롭 이벤트 설정
   * - CAM-container를 드래그 가능하게 설정
   * - category-list의 category에 드롭 가능하게 설정
   */
  $(".CAM-container").draggable({
    revert: "invalid", // 잘못된 드롭 위치에 놓으면 원래 위치로 돌아감
    zIndex: 100, // 드래그 중인 요소가 다른 요소 위에 표시되도록 설정
  });

  $("#category-list .category").droppable({
    accept: ".CAM-container", // 드롭 가능한 대상 설정
    drop: function (event, ui) {
      const droppedItem = ui.draggable; // 드롭된 CAM-container 가져오기
      $(this).append(droppedItem); // 현재 카테고리에 추가
      updateCounts(); // 드롭 후 행(rowCount) 및 열(maxCount) 정보 업데이트
    },
  });

  /**
   * 💡 레이아웃 변경 버튼 클릭 이벤트 설정
   * - grid-4, grid-2, grid-1 레이아웃으로 전환
   * - maxCount를 변경하고 updateCounts를 호출하여 rowCount도 동기화
   */
  $(".layout-btn").on("click", function () {
    const layout = $(this).data("layout"); // 버튼에 지정된 레이아웃 값 가져오기
    const $Marea = $(".M-area"); // 레이아웃이 적용될 영역 선택

    // 레이아웃에 따라 grid 설정 및 maxCount 값 변경
    if (layout === "grid-4") {
      $Marea.css("grid-template-columns", "repeat(4, 1fr)");
      maxCount = 4; // 4개 카메라 허용
    } else if (layout === "grid-2") {
      $Marea.css("grid-template-columns", "repeat(2, 1fr)");
      maxCount = 2; // 2개 카메라 허용
    } else if (layout === "grid-1") {
      $Marea.css("grid-template-columns", "1fr");
      maxCount = 1; // 1개 카메라 허용
    }

    updateCounts(); // 레이아웃 변경 후 행(rowCount) 및 열(maxCount) 정보 업데이트

    // 선택한 레이아웃 값과 maxCount를 콘솔에 출력 (디버깅용)
    console.log("선택된 레이아웃:", layout);
    console.log("최대 카메라 수:", maxCount);
  });

  /**
   * 💡 전역 함수로 maxCount와 rowCount 제공
   * - 다른 스크립트에서 레이아웃 정보를 활용할 수 있도록 함
   */
  window.getMaxCount = () => maxCount;
  window.getRowCount = () => rowCount;

  // 페이지 로드 시 초기 updateCounts 호출
  updateCounts();
});

// ======================================================
/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --4 'CAM-container' 화면 클릭 --> '선택 화면 확대/축소' 이벤트 & '화면 제외' 이벤트 */

let selectedVideoElement = null; // 현재 선택된 비디오 요소
let mediaRecorder;
let recordedChunks = [];
let isRecording = false; // 녹화 상태 확인
let selectedCameraIdx = null;
let maxCount;

$(document).ready(function () {
  let isExpanded = false; // 확장 상태 확인
  let expandedElement = null; // 확대된 CAM-container 추적
  let pressTimer; // 클릭 시간 확인을 위한 타이머 변수
  const excludedCameras = new Set(); // 화면 제외된 CAM-container 저장

  // 💡 maxCount 값을 반환하는 함수 (다른 스크립트에서 사용 가능)
  window.getMaxCount = function () {
    return maxCount;
  };

  //드래그 이벤트로 카메라 선택
  $(".video-item").on("dragstart", function (e) {
    // 드래그된 요소의 value 속성 값을 가져옴
    selectedCameraIndex = $(this).attr("value");
    e.originalEvent.dataTransfer.setData("text/plain", selectedCameraIndex);
    console.log("카메라 :", selectedCameraIndex);
  });

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
            console.log("camId  :  " + camId);

            if (!excludedCameras.has(camId)) {
              $(this).show().css({
                position: "static",
                top: "auto",
                left: "auto",
                transform: "scale(1)",
                Index: 1,
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

      console.log("녹화가 시작되었습니다. 선택된 카메라:", selectedCameraIndex);
      console.log(mediaRecorder);
    }
  });

  document.addEventListener("keydown", async (event) => {
    if (event.key === "e" && mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.onstop = async () => {
        console.log("녹화가 종료되었습니다.");

        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const formData = new FormData();

        formData.append("file", blob, "recorded-video.webm");

        // 선택된 카메라 인덱스를 추가
        if (selectedCameraIndex) {
          formData.append("cameraIndex", selectedCameraIndex);
        } else {
          console.error("선택된 카메라 인덱스가 없습니다.");
          return;
        }

        try {
          const response = await fetch("/videos/upload", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            console.log("동영상이 성공적으로 업로드되었습니다.");
            selectedCameraIndex = null; 
          } else {
            console.error("동영상 업로드에 실패했습니다.", response.statusText);
          }
        } catch (error) {
          console.error("동영상 업로드 중 오류가 발생했습니다:", error);
        }

        recordedChunks = [];
        isRecording = false;
      };
    }
  });
  selectedCameraIndex = null; // 업로드 후 선택 초기화

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


/*$(document).ready(function () {
  *
   * 현재 시각을 YY-MM-DD HH24:MI:SS 형식으로 반환
   * @returns {string} - 포맷된 타임스탬프
   
  function getFormattedTimestamp() {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `[${hours}:${minutes}]<br><span class="small-font">${year}-${month}-${day}</span>`;
  }

  const $trashButton = $('button[alt="로그 비우기 버튼"]'); // 🌟 휴지통 버튼

  // 🌟 초기 상태에서 휴지통 버튼 숨김
  $trashButton.hide();

  *
   * 로그를 추가하고 부드러운 전환 애니메이션 적용
   * @param {string} cameraLabel - 카메라 라벨 (예: 카메라 1)
   * @param {string} status - '경고' 또는 '위험'
   * @param {string} icon - 상태 아이콘
   
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

    *
     * 프로토콜 버튼 컨테이너를 부드럽게 나타내기
     
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

 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ 
 --7 AI 탐지 이벤트 시 강조 및 깜빡임 효과 적용 

$(document).ready(function () {
  let blinkInterval = null; // 깜빡임 제어 변수
  let warningTriggered = false; // #btn-warning 클릭 상태 확인

  // 초기 CAM-container 테두리 색상 설정
  $(".CAM-container").css({ borderColor: "#4a4a4a" });

  *
   * 깜빡임 시작 함수
   * @param {Array} targets - 대상 CAM-container ID 리스트
   * @param {string} color - 깜빡임 색상
   
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

  *
   * 깜빡임 중지 함수
   * @param {Array} targets - 대상 CAM-container ID 리스트
   
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

  *
   * #btn-warning 버튼 클릭 이벤트
   * "이상 확인 중" 상태로 변경하고 주황색 테두리로 깜빡임
   
  $("#btn-warning").on("click", function () {
    const targetId = $("#selectedCamera").val(); // 선택된 카메라 ID 가져오기
    warningTriggered = true; // #btn-warning 활성화 상태 설정
    stopBlink([{ id: targetId }]); // 기존 깜빡임 제거
    startBlink([{ id: targetId }], "#ff8c00"); // 주황색 테두리 깜빡임 시작
  });

  *
   * #btn-danger 버튼 클릭 이벤트
   * "이상 발생" 상태로 빨간색 테두리로 깜빡임
   
  $("#btn-danger").on("click", function () {
    const targetId = $("#selectedCamera").val(); // 선택된 카메라 ID 가져오기
	warningTriggered = true;
    stopBlink([{ id: targetId }]); // 기존 깜빡임 제거 (중첩 방지)
    startBlink([{ id: targetId }], "#8B0000"); // 빨간색 테두리 깜빡임 시작
  });

  *
   * #btn-stop 버튼 클릭 이벤트
   * 모든 깜빡임 효과 중지
   
  $("#btn-stop").on("click", function () {
    const targetId = $("#selectedCamera").val(); // 선택된 카메라 ID 가져오기
    stopBlink([{ id: targetId }]); // 깜빡임 제거
    warningTriggered = false; // 상태 초기화
  });
});

 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ 
 --8 119신고 + 상황 종료 버튼 활성화 

$(document).ready(function () {
  const $reportContainer = $(".report-container"); // 신고 컨테이너
  const $protocolContainer = $(".sb-container"); // 상황 종료 컨테이너

  // 초기 상태에서 .report-container 숨기기
  $reportContainer.hide().css({
    opacity: 0,
    transform: "translateY(-10px)",
  });

  *
   * .report-container를 부드럽게 나타내기
   
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

  *
   * .report-container를 숨기기
   
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

  *
   * blink 이벤트 트리거 시 .report-container 표시
   
  $("#blink-start-warning, #blink-start-danger").on("click", function () {
    showReportContainer(); // 신고 컨테이너 표시
  });

  *
   * #stop-blink 버튼 클릭 시 .report-container와 .sb-container 숨기기
   
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
*/
/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --9 비상 대응 지침 브라우저 팝업 */
/*
$(document).ready(function () {
  *//**
   * 새로운 브라우저 팝업 열기 함수
   * - 팝업 URL, 이름, 창 특성을 설정하고 동적으로 HTML 콘텐츠를 로드합니다.
   *//*
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
*/

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
// 드롭존 클릭 이벤트에 대한 방어 코드
// 빈 드롭존 클릭 시 이벤트를 차단하여 레이아웃 깨짐 방지

document.addEventListener("DOMContentLoaded", () => {
  // 모든 드롭존 요소를 선택
  const dropzones = document.querySelectorAll(".drop-zone");

  // 각 드롭존에 클릭 이벤트 추가
  dropzones.forEach((dropzone) => {
    dropzone.addEventListener("click", (event) => {
      // 드롭존 내부에 드래그된 요소가 없는 경우를 확인
      const hasContent =
        dropzone.querySelector(".camera-feed") ||
        dropzone.querySelector("video");

      // 드롭존이 비어있다면 클릭 이벤트를 차단
      if (!hasContent) {
        event.stopPropagation(); // 이벤트 버블링 방지
        event.preventDefault(); // 기본 동작 차단

        // 사용자에게 시각적 피드백 제공 (선택 사항)
        dropzone.classList.add("empty-zone-warning");
        setTimeout(() => {
          dropzone.classList.remove("empty-zone-warning");
        }, 500); // 500ms 후 경고 클래스 제거

        console.warn("빈 드롭존은 클릭할 수 없습니다."); // 콘솔 로그 출력
      }
    });
  });

  // 빈 드롭존 시각적 경고를 위한 스타일 추가 (선택 사항)
  const style = document.createElement("style");
  style.textContent = `
    .empty-zone-warning {
      border: 2px solid red;
      animation: shake 0.3s ease-in-out;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
    }
  `;
  document.head.appendChild(style);
});
