/*
--1 헤더 '팝업로그인 버튼' 클릭 --> 비동기통신 '로그인 팝업' 띄우기 이벤트

--2.1 '#btn-Monitor' 클릭 --> "/Monitor" 페이지로 이동
--2.2 '#btn-safetyRules' 클릭 --> "/safetyRules" 페이지로 이동
--2.3 '#btn-protocol' 클릭 --> "/protocol" 페이지로 이동
--2.4 '#btn-EEIF' 클릭 --> "/EEIF" 페이지로 이동
*/

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --1 ➡️➡️ 로그인 버튼 클릭 --> 로그인 폼 제출 및 데이터 처리 이벤트 */

$(document).ready(function () {
  // 로그인 버튼 클릭 이벤트 핸들러
  $("button[alt='로그인on클릭']").on("click", function (e) {
    e.preventDefault(); // 기본 제출 이벤트를 방지

    // 로그인 폼에서 입력된 값 가져오기
    const username = $("#id").val();
    const password = $("#pw").val();

    // 아이디와 비밀번호 입력 값 검증
    if (!username || !password) {
      alert("아이디와 비밀번호를 모두 입력해 주세요.");
      return;
    }

    // 로그인 데이터 처리 (여기서는 더미 데이터로 처리)
    const loginData = {
      username: '#',
      password: '#',
    };

    // 로그인 처리 (비동기 통신 예시)
    loginUser(loginData);
  });

  // 🌟 로그인 처리 함수 (여기서 실제 서버와의 통신이 이루어져야 함)
  function loginUser(data) {
    // 로그인 데이터 로그로 확인
    console.log("로그인 시도: ", data);

    // 비동기 통신을 통해 서버로 로그인 정보 전송 (여기서는 더미 응답 사용)
    // 이 부분은 실제 서버 API로 교체해야 함
    setTimeout(() => {
      if (data.username === "#" && data.password === "#") {
        alert("로그인 성공!");
        closePopup("#popup-logIn"); // 로그인 성공 시 팝업 닫기
      } else {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    }, 1000); // 1초 후 로그인 처리 결과 확인
  }

  // 팝업 닫기 함수
  function closePopup(popup) {
    $(popup).animate(
      {
        top: "-100%",
      },
      500,
      function () {
        $(this).css("display", "none");
      }
    );
  }
});


/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* 버튼: '.location' 페이지 이동
 --2.1 '#btn-Monitor' 클릭 --> "/Monitor" 
 --2.2 '#btn-safetyRules' 클릭 --> "/safetyRules" 
 --2.3 '#btn-protocol' 클릭 --> "/protocol"
 --2.4 '#btn-EEIF' 클릭 --> "/EEIF"
 */

$(document).ready(function () {
  // --2.1 '#btn-Monitor' 클릭 이벤트
  $("#btn-Monitor").on("click", function () {
    window.location.href = "/monitor"; // 'href' 속성을 통해 URL로 이동
  });

  // --2.2 '#btn-safetyRules' 클릭 이벤트
  $("#btn-safetyRules").on("click", function () {
    window.location.href = "/safetyRules";
  });

  // --2.3 '#btn-protocol' 클릭 이벤트
  $("#btn-protocol").on("click", function () {
    window.location.href = "/protocol";
  });

  // --2.4 '#btn-EEIF' 클릭 이벤트
  $("#btn-EEIF").on("click", function () {
    window.location.href = "/EEIF";
  });
});
