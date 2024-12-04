<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" isELIgnored="false"%> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>P05_비상 연락망</title>
    <!-- 전역 style -->
    <link rel="stylesheet" href="/style/globals.css" />
    <link rel="stylesheet" href="/style/header.css" />
    <!-- 지역 style -->
    <link rel="stylesheet" href="/style/P05_EEIF.css" />
    <link rel="stylesheet" href="/style/P04_Monitor.css" />
  </head>
  <body>
    <!-- View -->
    <div alt="전역 컨테이너" id="globals-container">
      <!-- header -->
      <header alt="헤더">
        <!-- 부가기능 탭 -->
        <nav alt="부가기능 탭">
          <div alt="a 컨테이너">
            <a href="#">CCTV모니터</a>
          </div>
          <div class="vertical-line"></div>
          <div alt="a 컨테이너">
            <a href="#">프로토콜</a>
          </div>
          <div class="vertical-line"></div>

          <div alt="a 컨테이너">
            <a href="#">안전수칙</a>
          </div>
        </nav>
      </header>

      <main alt="연락망 프로필 컨테이너">
        <!-- 연락처 1 -->
        <article alt="연락망 프로필">
          <div alt="연락망 사진">
            <img src="/imgs/c6.jpg" alt="땡칠.png" />
            <!-- 예시: alt="이미지 제목/또는 성명" -->
          </div>
          <div alt="연락망 정보">
            <section alt="성명"><h3>${담당자 성명}</h3></section>
            <section alt="직무정보">
              <p>${부서}<span>•</span>${직책}</p>
            </section>
            <section alt="연락정보">
              <ul>
                <li>${연락처}</li>
                <!-- 이하는 필요한 정보 예시 -->
                <li>${근무시간}</li>
                <li>${근무위치}</li>
              </ul>
            </section>
          </div>
        </article>

        <!-- 💛 이하 '정렬 확인용' 예시 -> 반복문 로직 작성 후에는 삭제하시면 됩니다! 💛 -->
        <!-- 연락처 2~5 -->
        <!-- <article alt="연락망 프로필">
          <div alt="연락망 사진">
            <img src="/imgs/c13.jpg" alt="길동.png" />
          </div>
          <div alt="연락망 정보">
            <section alt="정보1"><h3>담당자 성명</h3></section>
            <section alt="정보2">
              <p>부서<span>•</span>직책</p>
            </section>
            <section alt="정보3">
              <ul>
                <li>연락처</li>
                <li>근무시간</li>
                <li>근무위치</li>
              </ul>
            </section>
          </div>
        </article>

        <article alt="연락망 프로필">
          <div alt="연락망 사진">
            <img src="/imgs/c7.jpg" alt="명숙.png" />
          </div>
          <div alt="연락망 정보">
            <section alt="정보1"><h3>담당자 성명</h3></section>
            <section alt="정보2">
              <p>부서<span>•</span>직책</p>
            </section>
            <section alt="정보3">
              <ul>
                <li>연락처</li>
                <li>근무시간</li>
                <li>근무위치</li>
              </ul>
            </section>
          </div>
        </article>

        <article alt="연락망 프로필">
          <div alt="연락망 사진">
            <img
              src="/imgs/c16.jpg"
              alt="오리.png"
            />
          </div>
          <div alt="연락망 정보">
            <section alt="정보1"><h3>담당자 성명</h3></section>
            <section alt="정보2">
              <p>부서<span>•</span>직책</p>
            </section>
            <section alt="정보3">
              <ul>
                <li>연락처</li>
                <li>근무시간</li>
                <li>근무위치</li>
              </ul>
            </section>
          </div>
        </article>

        <article alt="연락망 프로필">
          <div alt="연락망 사진">
            <img src="/imgs/c11.jpg" alt="기차.png" />
          </div>
          <div alt="연락망 정보">
            <section alt="정보1"><h3>담당자 성명</h3></section>
            <section alt="정보2">
              <p>부서<span>•</span>직책</p>
            </section>
            <section alt="정보3">
              <ul>
                <li>연락처</li>
                <li>근무시간</li>
                <li>근무위치</li>
              </ul>
            </section>
          </div>
        </article> -->
      </main>
    </div>

    <!-- jQuery -->
    <script src="/js/jquery-3.6.0.js"></script>
    <!-- scripts -->
    <!-- <script src="/js/P05_EEIF.js"></script> -->
  </body>
</html>
