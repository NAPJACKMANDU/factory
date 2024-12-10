<%@page import="com.smhrd.demo.model.IncidentModel"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page isELIgnored="false"%>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>CCTV Monitor</title>
<style type="text/css">
/* Secondary Modal Styles */
/* Secondary Modal Styles */
#secondary-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.42);
    z-index: 2000;
}

#secondary-modal.hidden {
    display: none;
}

#secondary-modal .secondary-modal-content {
    background-color: #34495edc;
    color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    width: 700px;
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease;
}

#secondary-modal .secondary-modal-content h2 {
    margin-bottom: 7px;
    border-bottom: 2px solid #1abc9c;
    padding-bottom: 10px;
    width: 80%;
    color: white;
}

#secondary-modal .secondary-modal-content article {
    overflow-y: auto;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

#secondary-modal .secondary-modal-content table {
    width: 80%;
    border: 1px solid whitesmoke;
    border-radius: 5px;
    text-align: center;
}

#secondary-modal .secondary-modal-content table .th {
    background-color: #243447;
    padding: 10px;
    color: white;
}

#secondary-modal .secondary-modal-content table .content {
    height: 35px;
    color: black;
}

#secondary-modal .secondary-modal-content .close-secondary-modal {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}


.hidden {
	display: none;
}

#secondary-modal-video {
	position: fixed; /* 화면을 기준으로 위치 */
	top: 50%; /* 화면의 세로 중간 */
	left: 50%; /* 화면의 가로 중간 */
	transform: translate(-50%, -50%); /* 중심을 맞추기 위해 이동 */
	z-index: 9999; /* 다른 요소들보다 위에 위치하도록 더 높은 값으로 설정 */
	padding: 20px; /* 여백 */
	width: 100%; /* 모달의 너비를 화면의 %로 설정 (필요에 따라 조정) */
	max-width: 1000px; /* 최대 너비 설정 */
}

.modal-contents {
	display: flex;
	flex-direction: column;
	align-items: center; /* 자식 요소를 중앙 정렬 */
	justify-content: center;
	overflow: hidden; /* 비디오가 모달 영역을 넘어가지 않도록 */
	position: relative; /* 비디오 위치 조정을 위해 */
	height: 550px; /* 고정된 높이 설정 (필요에 따라 조정) */
}

#video-player {
	width: 100%; /* 비디오의 너비를 사각형의 너비에 맞춤 */
	height: 100%; /* 비디오의 높이를 사각형의 높이에 맞춤 */
	object-fit: cover; /* 비디오가 영역을 완전히 채우도록 설정 */
}
</style>
<!-- 전역 style -->
<%--
    <link rel="stylesheet" href="<c:url value='/style/globals.css' />" />
    <link rel="stylesheet" href="<c:url value='/style/header.css'/>" />
    <!-- 지역 style -->
    <link rel="stylesheet" href="<c:url value='/style/P04_Monitor.css'/>" />
    --%>

<link rel="stylesheet" href="/style/globals.css" type="text/css" />
<link rel="stylesheet" href="/style/P04_Monitor.css" type="text/css" />
<link rel="stylesheet" href="/style/header.css" type="text/css" />

<!-- <link
      rel="stylesheet"
      href="/src/main/resources/static/style/calendar.css"
    /> -->
<link rel="stylesheet" href="/style/calendar.css" type="text/css" />
<link rel="stylesheet" href="/style/CCTV_Monitor.css" type="text/css" />

<link rel="stylesheet"
	href="/style/P04_Monitor.css" />
<link rel="stylesheet"
	href="/style/CCTV_Monitor.css" />
<script src="https://developers.kakao.com/sdk/js/kakao.js">
	

</script>
</head>
<body>

	<div alt="전역 컨테이너" class="container">
		<!-- 좌측 사이드바 -->
		<aside class="left-sidebar">
			<section alt="카테고리-컨테이너">
				<h2>Camera Categories</h2>
				<ul>
					<li class="category"><span>Category 1</span>
						<ul class="sub-category">
							<li class="video-item" draggable="true" value="1"
								data-video="/video/TN1.mp4">Camera 1</li>
							<li class="video-item" draggable="true" value="2"
								data-video="/video/TN2.mp4">Camera 2</li>
							<li draggable="true" data-img="/imgs/category3/img3.png">
								Camera 3</li>
							<li draggable="true" data-img="/imgs/c12.jpg">Camera 4</li>
						</ul></li>
					<li class="category"><span>Category 2</span>
						<ul class="sub-category">
							<li class="video-item" draggable="true" value="5"
								data-video="/video/TN3.mp4">Camera 5</li>
							<li class="video-item" draggable="true" value="6"
								data-video="/video/TARO1.mp4">Camera 6</li>
								<li class="video-item" draggable="true" value="7"
								data-video="/video/thon4.mp4">Camera 7</li>
							<li class="video-item" draggable="true" value="8"
								data-video="/video/sch1.mp4">Camera 8</li>
						</ul></li>

					<li class="category"><span>Category 3</span>
						<ul class="sub-category">
							<li draggable="true" data-img="/imgs/c13.jpg">Camera 9</li>
							<li draggable="true" data-img="/imgs/c14.jpg">Camera 10</li>
							<li draggable="true" data-img="/imgs/c15.jpg">Camera 11</li>
							<li draggable="true" data-img="/imgs/c16.jpg">Camera 12</li>
						</ul></li>
					<li class="category"><span>Category 4</span>
						<ul class="sub-category">
							<li draggable="true" data-img="/imgs/c12.jpg">Camera 13</li>
							<li draggable="true" data-img="/imgs/c11.jpg">Camera 14</li>
							<li draggable="true" data-img="/imgs/c10.jpg">Camera 15</li>
							<li draggable="true" data-img="/imgs/c9.jpg">Camera 16</li>
						</ul></li>
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

				<!-- 2차 모달 -->
				<div id="secondary-modal" class="secondary-modal hidden">
					<div class="secondary-modal-content">
						<span class="close-secondary-modal">&times;</span>
						<table>
							<thead>
								<tr alt="탐지로그 조회 테이블 헤더">
									<th class="th">번호</th>
									<th class="th">영상 제목</th>
									<th class="th">카메라 번호</th>
									<th class="th">시간</th>
								</tr>
							</thead>
							<tbody id="list">
								<!-- 여기서 행들이 추가될 예정입니다. -->
							</tbody>
						</table>
					</div>
				</div>

			</footer>
		</aside>
		<!-- 비디오 모달 -->
		<div id="secondary-modal-video" class="hidden">
			<div class="modal-contents">
				<span class="close-secondary-modals" style="cursor: pointer;">&times;</span>
				<!-- 닫기 버튼 추가 -->
				<div class="video-container">
					<video id="video-player" controls>
						<source id="video-source" src="" type="video/webm">
						Your browser does not support the video tag.
					</video>
				</div>
			</div>
		</div>

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
			<temp class="temp"> //탐지 대상 지정
			<div alt="탐지대상드롭다운" class="blink-controls">
				<label for="targetId">이상 탐지 대상 선택</label> <select id="targetId">
					<option value="#cam1">1</option>
					<option value="#cam2">2</option>
					<option value="#cam3">3</option>
					<option value="#cam4">4</option>
					<option value="#cam5">5</option>
					<option value="#cam6">6</option>
					<option value="#cam7">7</option>
					<option value="#cam8">8</option>
					<option value="#cam9">9</option>
					<option value="#cam10">10</option>
					<option value="#cam11">11</option>
					<option value="#cam12">12</option>
					<option value="#cam13">13</option>
					<option value="#cam14">14</option>
					<option value="#cam15">15</option>
					<option value="#cam16">16</option>
				</select>
				<div alt="탭 세로선" class="vertical-line"></div>
				<button id="blink-start-warning" class="btn-onTheCase">이상
					확인 중</button>
				<button id="blink-start-danger" class="btn-onTheCase">이상 발생
				</button>
			</div>
			</temp>
		</main>

		<!-- 우측 사이드바 -->
		<aside class="right-sidebar">
			<!-- 레이아웃 옵션 -->
			<h2>
				Layout<br />Options
			</h2>
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
            <!-- 프로토콜 버튼(1) : 상황 종료 -->
            <div
              alt="프로토콜 버튼 컨테이너"
              class="sb-container"
              id="on-the-case"
            >
              <button alt="상황 종료" id="stop-blink">상황 종료</button>
            </div>
          </div>
          <br />
          <!-- 로그 토글 -->
          <article alt="로그 컨테이너" id="log-tuple-container">
            <!-- 기록이 발생할 때마다 .log-tuple 추가 -->
          </article>
          <!-- 프로토콜 버튼(2) : 119신고 -->
        </aside>
        <!-- 부가기능 탭 -->
        <nav alt="부가기능 탭">
          <!-- 팝업 animate() Script {location 이동 없음!} -->
          <div alt="a 컨테이너">
            <a alt="연락망" href="/call">연락망</a>
          </div>
          <div alt="a 컨테이너">
            <a href="#">안전수칙</a>
          </div>
          <div alt="a 컨테이너">
            <a href="/modInfo">정보 등록</a>
          </div>
        </nav>
      </aside>
    </div>

    <!-- Protocol modal -->
    <!-- <div id="protocol-modal" class="secondary-modal hidden">
      <div class="secondary-modal-content">
        <span class="close-protocol-modal">&times;</span>
        <h2><span class="detected">화재</span> 초동 대응 지침</h2>
        <br />
        <article alt="프로토콜 모달 스크롤 발생">
          <table>
            <tr alt="프로토콜 조회 테이블 헤더">
              <td class="th"><span>단계</span></td>
              <td class="th"><span>주요 조치 및 행동 요령</span></td>
            </tr>
            <tr alt="프로토콜 조회 테이블 컨텐츠">
              <td class="content"><span>1단계: 화재 신고</span></td>
              <td class="content">
                <span
                  >- 화재 발생 장소 및 종류를 상세히 119에 신고<br />- 유관기관,
                  협력업체 등에도 화재 사실 전파</span
                >
              </td>
            </tr>
            <tr alt="프로토콜 조회 테이블 컨텐츠">
              <td class="content"><span>2단계: 초기 대응</span></td>
              <td class="content">
                <span
                  >- 자위소방대 운영: 팀별 업무 지시, 초기소화<br />- 화재 사실
                  전파 및 대피 유도</span
                >
              </td>
            </tr>
            <tr alt="프로토콜 조회 테이블 컨텐츠">
              <td class="content"><span>3단계: 피난 유도</span></td>
              <td class="content">
                <span
                  >- 1차 수평대피, 2차 수직대피 원칙<br />- 엘리베이터 금지,
                  계단 이용 권장<br />- 연기 속 대피 시 낮은 자세 유지</span
                >
              </td>
            </tr>
            <tr alt="프로토콜 조회 테이블 컨텐츠">
              <td class="content"><span>4단계: 피난 시 주의사항</span></td>
              <td class="content">
                <span
                  >- 문 닫아 화재 확산 방지<br />- 불길 통과 시 물에 적신 옷,
                  담요 사용<br />- 대피 중 불안감 최소화 위해 침착하게
                  행동</span
                >
              </td>
            </tr>
            <tr alt="프로토콜 조회 테이블 컨텐츠">
              <td class="content"><span>5단계: 금지 행위</span></td>
              <td class="content">
                <span>- 피난 후 건물 재진입 금지<br />- 승강기 사용 금지</span>
              </td>
            </tr>
          </table>
        </article>
      </div>
    </div> -->
    <!-- <div id="protocol-modal" class="secondary-modal hidden">
      <div class="secondary-modal-content">
        <span class="close-protocol-modal">&times;</span>
        <h2><span class="detected">낙상 초동 대응 지침</h2>
        <br />
        <article alt="프로토콜 모달 스크롤 발생">
          <img
            src="/src/main/resources/static/imgs/추락 전도 낙상 대응 지침.png"
            alt=""
          />
        </article>
      </div>
    </div> -->

    <!-- 119 신고 버튼 -->
    <div alt="프로토콜 버튼 컨테이너" class="report-container">
      <button alt="신고 문자 발송" id="report">119 신고</button>
    </div>

    <!-- jQuery -->
    <script src="/js/jquery-3.6.0.js"></script>
    <!-- scripts -->
    <script src="/js/P04_Monitor.js"></script>
    <script src="/js/calendar.js"></script>
    <script src="/js/CCTV_Monitor.js"></script>
  </body>
</html>
