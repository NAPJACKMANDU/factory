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
