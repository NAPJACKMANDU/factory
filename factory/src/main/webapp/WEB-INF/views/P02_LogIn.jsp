<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" isELIgnored="false"%> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>P02_LogIn</title>
    <!-- 지역 style -->
    <link rel="stylesheet" href="/style/P02_LogIn.css" />
    <!-- 전역 style -->
    <link rel="stylesheet" href="/style/globals.css" />
    <link rel="stylesheet" href="/style/header.css" />
    <link rel="stylesheet" href="/style/footer.css" />
  </head>
  <body>
    <!-- View -->
    <div alt="전역 컨테이너" id="globals-container">
      <!-- header -->
      <header alt="헤더">
        <section alt="로고 컨테이너">
          <form action="#" method="get">
            <button alt="P01_Main으로 이동" type="submit">
              <img alt="로고 이미지" src="/imgs/Logo.jpg" />
            </button>
          </form>
        </section>
      </header>

      <!-- main -->
      <main alt="메인콘텐츠">
        <!-- 사이드 구역 -->
        <aside alt="로그인 사이드 구역">
          <section><h3>추출 키워드</h3></section>
          <section>
            <h5>오늘의 안전<br />유의 사항</h5>
            <ul>
              <li><span>주의 사항1</span></li>
              <li><span>주의 사항2</span></li>
              <li><span>주의 사항3</span></li>
            </ul>
            <article>
              <h5>기상 정보</h5>
              <ul>
                <li><span>기상 정보1</span></li>
                <li><span>기상 정보2</span></li>
                <li><span>기상 정보3</span></li>
              </ul>
            </article>
          </section>
          <section></section>
        </aside>

        <!-- 로그인 정보 입력 구역 -->
        <form
          alt="로그인 페이지 컨테이너-form"
          action=""
          method="post"
          id="logInForm"
          class="enterForm"
        >
          <section alt="로그인 input 컨테이너">
            <input alt="로그인 아이디" type="text" placeholder="아이디 입력" />
            <input
              alt="로그인 비밀번호"
              type="password"
              placeholder="비밀번호 입력"
            />
          </section>

          <section alt="로그인 버튼 컨테이너">
            <button alt="로그인submit" type="submit">
              <span>로그인</span>
            </button>
          </section>

          <section alt="로그인 페이지 a태그 컨테이너">
            <div>
              <a href="#"><span>아이디/비밀번호 찾기</span></a>
              <span> | </span>
              <a href="/P03_Join"><span>회원가입</span></a>
            </div>
          </section>
        </form>
      </main>

      <!-- footer -->
      <footer alt="하단 바">
        <!-- 뒤로가기 버튼, 고정됨 -->
        <section alt="뒤로가기 버튼 컨테이너">
          <button id="btn-back">
            <span alt="뒤로가기 버튼">⬅️</span>
          </button>
        </section>
      </footer>
    </div>
    <!-- jQuery -->
    <script src="/js/jquery-3.6.0.js"></script>
    <script src="/js/jquery.min.js"></script>
    <script src="/js/jquery.scrolly.min.js"></script>
    <script src="/js/jquery.scrollex.min.js"></script>
    <script src="/js/skel.min.js"></script>
    <script src="/js/util.js"></script>

    <!-- Scripts -->
    <!-- <script src="#"></script> -->
    <script src="/js/P02_Login.js"></script>
    <script src="/js/globals.js"></script>
  </body>
</html>
