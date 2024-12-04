document.addEventListener("DOMContentLoaded", () => {
  const slide = document.querySelector(".slide");
  const articles = document.querySelectorAll(".slide > article");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0; // 현재 슬라이드 인덱스

  const updateSlide = () => {
    const offset = -currentIndex * 100; // 이동 거리 계산
    slide.style.transform = `translateX(${offset}%)`;
  };

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + articles.length) % articles.length; // 이전 슬라이드
    updateSlide();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % articles.length; // 다음 슬라이드
    updateSlide();
  });
});
