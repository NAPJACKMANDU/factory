/*
--1 헤더 '로그인 기업명 표시', '로그인 관리자 회원명' --> 로그인 성공 시 기업명과 관리자명 상단바에 노출

--2.1 '#btn-Monitor' 클릭 --> "/Monitor" 페이지로 이동
--2.2 '#btn-safetyRules' 클릭 --> "/safetyRules" 페이지로 이동
--2.3 '#btn-protocol' 클릭 --> "/protocol" 페이지로 이동
--2.4 '#btn-EEIF' 클릭 --> "/EEIF" 페이지로 이동
*/

/* 💡◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️◼️ */
/*--1 헤더 '로그인 기업명 표시', '로그인 관리자 회원명' --> 로그인 성공 시 기업명과 관리자명 상단바에 노출 */

$(document).ready(function () {
  // 💡 더미 데이터 설정
  const dummyLoginSuccess = true; // 로그인 성공 여부를 제어하는 더미 데이터

  // 💡 기본 상태 초기화
  function initializeHeader() {
    $('h1[alt="자사 서비스명"]').show(); // 기본 자사 서비스명 표시
    $('h1[alt="로그인 기업명"]').hide(); // 로그인 후 기업명 숨김
    $('a[alt="로그인 페이지로 이동"]').show(); // 로그인 링크 표시
    $('h3[alt="로그인 관리자 회원명"]').hide(); // 관리자명 숨김
    $('a[alt="로그아웃"]').hide(); // 로그아웃 숨김
  }

  // 💡 로그인 성공 시 상태 전환
  function handleLoginSuccess() {
    $('h1[alt="자사 서비스명"]').hide(); // 자사 서비스명 숨김
    $('h1[alt="로그인 기업명"]').show(); // 로그인 후 기업명 표시
    $('a[alt="로그인 페이지로 이동"]').hide(); // 로그인 링크 숨김
    $('h3[alt="로그인 관리자 회원명"]').show(); // 관리자명 표시
    $('a[alt="로그아웃"]').show(); // 로그아웃 표시
  }

  // 💡 실행 코드
  initializeHeader(); // 기본 상태 초기화

  // 더미 데이터를 사용한 테스트: 로그인 성공 시 상태 전환
  if (dummyLoginSuccess) {
    handleLoginSuccess();
  }

  // 💡 테스트 후 더미 데이터 코드 제거 안내
  // 아래의 if문 괄호 부분을 수정하고,
  // 상수 선언 된 dummyLoginSuccess 변수를 삭제하면
  // 더미 데이터 코드로 된 테스트는 해제됩니다!
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
    window.location.href = "/Monitor"; // 'href' 속성을 통해 URL로 이동
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
