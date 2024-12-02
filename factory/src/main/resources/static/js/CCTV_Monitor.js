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

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(
    'button[alt="레이아웃옵션-토글"]'
  );
  const layoutOptions = document.querySelector(
    'section[alt="레이아웃옵션-컨테이너"]'
  );

  console.log(toggleButton, layoutOptions); // 정상적으로 선택되는지 확인

  // 토글 버튼 클릭 이벤트
  toggleButton.addEventListener("click", () => {
    // visible 클래스 토글로 애니메이션 적용
    layoutOptions.classList.toggle("visible");
    console.log("Toggled"); // 이벤트 발생 확인
  });
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
