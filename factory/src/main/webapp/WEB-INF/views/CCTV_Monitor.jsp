<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CCTV Monitor</title>
    <!-- 전역 style -->
    <%-- <link rel="stylesheet" href="<c:url value='/style/globals.css' />">
    <link rel="stylesheet" href="<c:url value='/style/header.css'/>">
    <!-- 지역 style -->
    <link rel="stylesheet" href="<c:url value='/style/P04_Monitor.css'/>"> --%>
    
    
    <link rel="stylesheet" href="/style/globals.css" type="text/css" />
    <link rel="stylesheet" href="/style/P04_Monitor.css" type="text/css" />
    <link rel="stylesheet" href="/style/header.css" type="text/css" />
    
    
    <!-- <link
      rel="stylesheet"
      href="/src/main/resources/static/style/calendar.css"
    /> -->
     <link rel="stylesheet" href="/style/calendar.css" type="text/css" />
    <link rel="stylesheet" href="/style/CCTV_Monitor.css" type="text/css" />
    

    <link
      rel="stylesheet"
      href="/src/main/resources/static/style/P04_Monitor.css"
    />
    <link
      rel="stylesheet"
      href="/src/main/resources/static/style/CCTV_Monitor.css"
    />
  </head>
  <body>
    <div alt="전역 컨테이너" class="container">
      <!-- 좌측 사이드바 -->
      <aside class="left-sidebar">
        <section alt="카테고리-컨테이너">
          <h2>Camera Categories</h2>
          <ul>
            <li class="category">
              <span>Category 1</span>
              <ul class="sub-category">
                <li
                  draggable="true"
                  data-img="/imgs/category1/img1.png"
                >
                  Camera 1
                </li>
                <li
                  draggable="true"
                  data-img="/imgs/category1/img2.png"
                >
                  Camera 2
                </li>
              </ul>
            </li>
            <li class="category">
              <span>Category 2</span>
              <ul class="sub-category">
                <li
                  draggable="true"
                  data-img="/imgs/category2/img3.png"
                >
                  Camera 3
                </li>
                <li
                  draggable="true"
                  data-img="/imgs/category2/img4.png"
                >
                  Camera 4
                </li>
              </ul>
            </li>
            <li class="category">
              <span>Category 3</span>
              <ul class="sub-category">
                <li
                  draggable="true"
                  data-img="/imgs/category3/img5.png"
                >
                  Camera 5
                </li>
                <li
                  draggable="true"
                  data-img="/imgs/category3/img6.png"
                >
                  Camera 6
                </li>
                <li
                  draggable="true"
                  data-video="/video/TN1.mp4"
                >
                  Camera 7
                </li>
                <li
                  draggable="true"
                  data-video="/video/TN2.mp4"
                >
                  Camera 8
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <!-- 저장된 로그 조회 구역 -->
        <footer alt="저장된 로그 조회 구역-하단바">
          <div class="calendar">
            <div class="calendar-header">
              <button id="prev-month" class="arrow small-arrow">◀</button>
              <span id="current-month"></span>
              <button id="next-month" class="arrow small-arrow">▶</button>
            </div>
            <table class="calendar-table">
              <thead>
                <tr class="calendar-weekdays">
                  <th class="weekend">일</th>
                  <th>월</th>
                  <th>화</th>
                  <th>수</th>
                  <th>목</th>
                  <th>금</th>
                  <th class="saturday">토</th>
                </tr>
              </thead>
              <tbody class="calendar-days"></tbody>
            </table>
          </div>

          <!-- 모달 -->
          <div id="modal" class="modal hidden">
            <div class="modal-content">
              <span class="close-modal">&times;</span>
              <h2 id="modal-date">날짜 정보</h2>
              <div id="modal-data">데이터를 로드 중...</div>
            </div>
          </div>
        </footer>
      </aside>

      <!-- 메인 화면 -->
      <main class="monitor M-area">
        <div class="camera-grid" id="cameraGrid">
          <!-- 16 카메라 화면 -->
          <div class="CAM-container camera dropzone" id="cam1">
            <span class="camera-number">1번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam2">
            <span class="camera-number">2번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam3">
            <span class="camera-number">3번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam4">
            <span class="camera-number">4번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam5">
            <span class="camera-number">5번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam6">
            <span class="camera-number">6번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam7">
            <span class="camera-number">7번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam8">
            <span class="camera-number">8번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam9">
            <span class="camera-number">9번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam10">
            <span class="camera-number">10번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam11">
            <span class="camera-number">11번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam12">
            <span class="camera-number">12번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam13">
            <span class="camera-number">13번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam14">
            <span class="camera-number">14번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam15">
            <span class="camera-number">15번</span>
          </div>
          <div class="CAM-container camera dropzone" id="cam16">
            <span class="camera-number">16번</span>
          </div>
        </div>
        <temp class="temp">
          //탐지 대상 지정
          <div alt="탐지대상드롭다운" class="blink-controls">
            <label for="targetId">이상 탐지 대상 선택</label>
            <select id="targetId">
              <option value="#cam1">카메라 1</option>
              <option value="#cam2">카메라 2</option>
              <option value="#cam3">카메라 3</option>
              <option value="#cam4">카메라 4</option>
              <option value="#cam5">카메라 5</option>
              <option value="#cam6">카메라 6</option>
              <option value="#cam7">카메라 7</option>
              <option value="#cam8">카메라 8</option>
              <option value="#cam9">카메라 9</option>
              <option value="#cam10">카메라 10</option>
              <option value="#cam11">카메라 11</option>
              <option value="#cam12">카메라 12</option>
              <option value="#cam13">카메라 13</option>
              <option value="#cam14">카메라 14</option>
              <option value="#cam15">카메라 15</option>
              <option value="#cam16">카메라 16</option>
            </select>
            <div alt="탭 세로선" class="vertical-line"></div>
            <button id="blink-start-warning" class="btn-onTheCase">
              이상 확인 중
            </button>
            <button id="blink-start-danger" class="btn-onTheCase">
              이상 발생
            </button>
          </div>
        </temp>
      </main>

      <!-- 우측 사이드바 -->
      <aside class="right-sidebar">
        <!-- 레이아웃 옵션 -->
        <h2>Layout<br />Options</h2>
        <section alt="레이아웃옵션-컨테이너">
          <button class="layout-btn" data-layout="16">16</button>
          <button class="layout-btn" data-layout="4">4</button>
          <button class="layout-btn" data-layout="1">1</button>
          <button class="reset-btn">Reset</button>
        </section>

        <!-- 로그 탐지 사이드 바 -->
        <aside alt="실시간 모니터링 로그 구역-사이드 바">
          <!-- 로그 비우기 -->
          <div alt="로그 비우기 컨테이너" class="log-toggle">
            <button alt="로그 비우기 버튼">🗑️</button>
            <div alt="프로토콜 버튼 컨테이너" id="on-the-case">
              <button alt="신고 문자 발송" id="report">119 신고</button>
              <button alt="상황 종료" id="stop-blink">상황 종료</button>
            </div>
          </div>
          <br />
          <!-- 로그 토글 -->
          <article alt="로그 컨테이너" id="log-tuple-container">
            <!-- 기록이 발생할 때마다 .log-tuple 추가 -->
          </article>
        </aside>
        <!-- 부가기능 탭 -->
        <nav alt="부가기능 탭">
          <!-- 팝업 animate() Script {location 이동 없음!} -->
          <div alt="a 컨테이너">
            <a href="/call">연락망</a>
          </div>
          <div alt="a 컨테이너">
            <a href="#">저장 로그</a>
          </div>
          <div alt="a 컨테이너">
            <a href="#">프로토콜</a>
          </div>
          <div alt="a 컨테이너">
            <a href="#">안전수칙</a>
          </div>
        </nav>
      </aside>
    </div>

    <!-- jQuery -->
    <script src="/js/jquery-3.6.0.js"></script>
    <!-- scripts -->
    <script src="/js/P04_Monitor.js"></script>
    <script src="/js/calendar.js"></script>
    <script src="/js/CCTV_Monitor.js"></script>
  </body>
</html>
