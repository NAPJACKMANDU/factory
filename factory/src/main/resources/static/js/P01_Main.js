/*
--1 헤더 '팝업로그인 버튼' 클릭 --> 비동기통신 '로그인 팝업' 띄우기 이벤트

--2.1 '#btn-Monitor' 클릭 --> "/Monitor" 페이지로 이동
--2.2 '#btn-safetyRules' 클릭 --> "/safetyRules" 페이지로 이동
--2.3 '#btn-protocol' 클릭 --> "/protocol" 페이지로 이동
--2.4 '#btn-EEIF' 클릭 --> "/EEIF" 페이지로 이동
*/

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/* --1 ➡️➡️ 헤더 '팝업로그인 버튼' 클릭 --> 비동기통신 '로그인 팝업' 띄우기 이벤트 */

$(document).ready(function () {
  // 팝업 설정 객체
  const popups = {
    logIn: {
      button: 'button[alt="팝업로그인 버튼"]',
      popup: "#popup-logIn",
      content: "#content-logIn",
      title: "로그인",
      endpoint: "/getLoginPopup", // 서버 엔드포인트 (더미 데이터용)
    },
  };

  // 🌟 더미 데이터 객체 추가
  const dummyData = {
    "/getLoginPopup": {
      message: "로그인 페이지입니다. 임의 데이터로 테스트 중.",
    },
    "/getSafetyRules": {
      message: "안전 수칙: 임의 데이터로 테스트 중.",
    },
    "/getProtocol": {
      message: "프로토콜 정보: 임의 데이터로 테스트 중.",
    },
    "/getEEIF": {
      message: "비상 연락망: 임의 데이터로 테스트 중.",
    },
  };

  // 🌟 비동기 통신을 대신하여 더미 데이터 반환
  function fetchDummyData(endpoint) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (dummyData[endpoint]) {
          resolve(dummyData[endpoint]); // 더미 데이터 반환
        } else {
          reject(new Error("해당 엔드포인트에 대한 데이터가 없습니다."));
        }
      }, 300); // 300ms의 지연 시간으로 비동기 테스트
    });
  }

  // openPopup 함수 수정: 실제 통신 대신 더미 데이터 사용
  function openPopup(config) {
    const { popup, content, title, endpoint } = config;

    fetchDummyData(endpoint)
      .then((data) => {
        const message = data.message || "데이터를 불러올 수 없습니다.";

        const dynamicContent = `
        <h3>${title}</h3>
        <p>${message}</p>
        <form id="loginForm">
          <input type="text" placeholder="아이디" name="username" required />
          <input type="password" placeholder="비밀번호" name="password" required />
          <button type="submit">로그인</button>
        </form>
      `;

        $(content).html(dynamicContent);

        // 팝업 슬라이드 애니메이션
        $(popup).css("display", "block").animate(
          {
            top: "20%",
          },
          500
        );
      })
      .catch((error) => {
        $(content).html(`<p>${error.message}</p>`);
        $(popup).css("display", "block").animate({ top: "20%" }, 500);
      });
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

  // 이벤트 바인딩
  Object.keys(popups).forEach((key) => {
    const config = popups[key];

    // 팝업 열기
    $(config.button).on("click", function () {
      openPopup(config);
    });

    // 팝업 닫기
    $(".closePopup").on("click", function () {
      closePopup(config.popup);
    });
  });
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
