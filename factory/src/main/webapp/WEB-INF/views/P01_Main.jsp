<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
<!DOCTYPE html>
<html lang="en">
  <heads>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>P01_Main</title>
    <!-- 전역 style -->
    <link
      rel="stylesheet"
      href="/style/globals.css"
      type="text/css"
    />
    <link
      rel="stylesheet"
      href="/style/header.css"
      type="text/css"
    />
    <!-- 지역 style -->
    <link
      rel="stylesheet"
      href="/style/P01_Main.css"
      type="text/css"
    />
  </heads>
  <body>
    <!-- View -->
    <div alt="전역 컨테이너" id="globals-container">
      <!-- header -->
      <header alt="상단 바">
        <section alt="로고 컨테이너">
          <!-- location.reload() -> 이동 없는 form -->
          <form action="/" method="get">
            <button alt="P001_Main으로 이동" type="submit">
              <img
                alt="로고 이미지"
                src="/imgs/Logo.jpg"
              />
            </button>
          </form>
        </section>
        <nav alt="페이지 이동 탭">
          <!-- btn 비동기통신 로그인 -->
          <div alt="헤더 로그인 btn 컨테이너">
            <button alt="팝업로그인 버튼" id="btn-logIn" href="#">
              <span>로그인1</span>
            </button>
          </div>
          <div alt="헤더 탭 세로선" class="vertical-line"></div>
          <!-- a태그 로그인 -->
          <div alt="헤더 a태그 컨테이너" class="h-a-container">
            <a href="/login"><span>로그인2</span></a>
          </div>
          <div alt="헤더 탭 세로선" class="vertical-line"></div>
          <div alt="헤더 a태그 컨테이너" class="h-a-container">
            <a href="/P03_Join"><span>회원가입</span></a>
          </div>
        </nav>
      </header>

      <!-- main -->
      <main alt="메인콘텐츠">
        <article alt="페이지 이동 버튼 구역">
          <!-- 버튼 4개 Grid -->
          <!-- 큰 버튼 1개 -->
          <div alt="Monitor 버튼 컨테이너">
            <section alt="location-Btn 컨테이너">
             <button alt="P04_Monitor 페이지로 이동" id="btn-Monitor">
 			 	<span>실시간 <br />모니터링</span>
			 </button>
            </section>
          </div>
          <!-- 작은 버튼 3개 (세로 쌓기) -->
          <aside alt="aside 버튼 컨테이너">
            <section alt="location-Btn 컨테이너">
              <button alt="P05_SafetyRules 페이지로 이동" id="btn-safetyRules">
                <span>안전 수칙</span>
              </button>
            </section>
            <section alt="location-Btn 컨테이너">
              <button alt="P06_Protocol 페이지로 이동" id="btn-protocol">
                <span>비상 시 <br />대응 체계<br /></span>
              </button>
            </section>
            <section alt="location-Btn 컨테이너">
              <button alt="P07_EEIF 페이지로 이동" id="btn-EEIF">
                <span>비상 연락망</span>
              </button>
            </section>
          </aside>
        </article>
      </main>
    </div>

    <!-- 팝업 컨테이너 (초기 숨김 상태) -->
    <div alt="로그인 팝업" id="popup-logIn" class="popup">
      <button class="closePopup">×</button>
      <div id="content-logIn"></div>
    </div>

    <!-- jQuery -->
    <script src="/js/jquery-3.6.0.js"></script>
    <!-- <script src="/js/jquery.min.js"></script>
   <script src="/js/jquery.scrolly.min.js"></script>
   <script src="/js/jquery.scrollex.min.js"></script>
   <script src="/js/skel.min.js"></script>
   <script src="/js/util.js"></script> -->

    <!-- Scripts -->
    <script src="/js/P01_Main.js"></script>
    <script>
      $("#popup-logIn").css("display", "block"); // 인라인 스타일 추가
      console.log($("#popup-logIn").attr("style")); // 이제 인라인 스타일을 확인할 수 있음
    </script>
    
    <script>
  	document.getElementById('btn-Monitor').addEventListener('click', function () {
    location.href = '/monitor';
  });
	</script>
  </body>
</html>
