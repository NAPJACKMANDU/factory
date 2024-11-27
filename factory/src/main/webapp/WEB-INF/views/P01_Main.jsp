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
      <header alt="헤더">
        <section alt="로고 컨테이너">
          <form action="/Main" method="get">
            <button alt="P001_Main으로 이동" type="submit">
              <!-- <button alt="임의설정"> -->
              <img
                alt="로고 이미지"
                src="/src/main/resources/static/imgs/Logo.jpg"
              />
            </button>
          </form>
        </section>
        <!-- 로그인된 기업명 표시 (h태그 초반 숨김 설정) -->
        <div alt="로그인 기업명 표시 컨테이너">
          <h1 alt="자사 서비스명">씨See콜Call</h1>
          <h1 alt="로그인 기업명">전국양배추운송연합</h1>
        </div>
        <nav alt="페이지 이동 탭">
          <div alt="헤더 a태그 컨테이너" class="h-a-container">
            <a alt="로그인 페이지로 이동" href="#"><span>로그인</span></a>

            <h3 alt="로그인 관리자 회원명">관리자</h3>
            <a alt="로그아웃" href="#"><span>로그아웃</span></a>
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

    <!-- jQuery -->
    <script src="/js/jquery-3.6.0.js"></script>
     <script src="/js/jquery.min.js"></script>
               <script src="/js/jquery.scrolly.min.js"></script>
               <script src="/js/jquery.scrollex.min.js"></script>
               <script src="/js/skel.min.js"></script>
               <script src="/js/util.js"></script> 

    <!-- Scripts -->
    <script src="/js/P01_Main.js"></script>
    <script>
      $("#popup-logIn").css("display", "block"); // 인라인 스타일 추가
      console.log($("#popup-logIn").attr("style")); // 이제 인라인 스타일을 확인할 수 있음
    </script>
  </body>
</html>
