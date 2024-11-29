/*
--1 하단바 뒤로가기 버튼
*/

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --1 하단바 뒤로가기 버튼 */

document.getElementById("btn-back").addEventListener("click", function () {
  if (window.history.length > 1) {
    window.history.back(); // 히스토리 스택에 이전 페이지가 있으면 이동
  } else {
    alert("이전 페이지가 없습니다.");
  }
});

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
