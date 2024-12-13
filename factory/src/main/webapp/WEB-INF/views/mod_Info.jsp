<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%> <%@taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core"%> <%@ taglib prefix="fmt"
uri="http://java.sun.com/jsp/jstl/fmt"%> <%@ page isELIgnored="false"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<title>P06_Info</title>
<!-- 전역 style -->
<!-- 지역 style -->
<link rel="stylesheet" href="/style/P06_mod-Info.css" />
</head>
<body>
	<!-- View -->
	<div alt="mod-container" id="globals-container">
		<!-- header -->
		<header alt="헤더">
			<!-- 부가기능 탭 -->
			<nav alt="부가기능 탭">
				<div alt="a 컨테이너">
					<a href="/CCTV_Monitor" style="font-size: 11.8pt">CCTV모니터</a>
				</div>
				<div class="vertical-line"></div>
				<div alt="a 컨테이너">
					<a href="SafetyRules" style="font-size: 11.8pt">안전수칙</a>
				</div>
				<div class="vertical-line"></div>

				<div alt="a 컨테이너">
					<a href="/call" style="font-size: 11.8pt">연락망</a>
				</div>
			</nav>
		</header>

		<main alt="정보 등록 수정 컨테이너">
			<!-- 회원 정보 변경 -->
			<div class="mod-container">
				<h2>내 정보 변경</h2>
				<form id="info_frm" onsubmit="update(event)" >
					<input type = "hidden" id = "info_idx" value = '${member.idx}'>
					<div class="form-group">
						<label for="name">이름</label> <input type="text" id="if_name"
							name="name" placeholder="이름을 입력해 주세요" required />
					</div>

					<div class="form-group">
						<label for="pw">비밀번호</label> <input type="text" id="if_pw" name="pw"
							placeholder="비밀번호을 입력해 주세요" required />
					</div>
					<div class="form-group">
						<label for="pwConfirm">비밀번호 확인</label> <input type="password"
							id="pwConfirm" name="pwConfirm" placeholder="비밀번호를 다시 입력하세요"
							required /> <span id="pwCheckMessage">비밀번호가
							일치하지 않습니다.</span>
					</div>
					<div class="form-group">
						<label for="phone">전화번호</label> <input type="text" id="if_phone"
							name="phone" placeholder="01012345678 형식으로 입력하세요" required />
					</div>

					<button onclick="update()">등록하기</button>
				</form>
			</div>

			<!-- 🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟 -->

			<!-- 안전사고 대응책 등록 -->
			<div class="mod-container">
				<h2>안전 사고 대응책</h2>
				<!-- ✅ 자료등록 ✅ -->
				<!--  📢 일반 안전수칙 등록 -->
				<form id="safetyRuleForm" method="post">
					<div class="form-group">
						<label for="#">안전수칙</label> <input type="file" id="safetyRuleFile"
							name="safetyRuleFile" />
						<div alt="프로토콜 자료 등록 버튼 컨테이너">
							<button type="button" id="addSafetyRuleButton">자료 추가</button>
							<button type="button" id="previewButton_1">pdf 미리보기</button>
						</div>
					</div>
				</form>

				<!-- 📢 상황별 비상 대응 절차 등록 -->
				<form id="emergencyForm" action="#" method="post">
					<div class="form-group">
						<label for="emergencySelect">비상 시 초동 대응 절차</label> <select
							id="emergencySelect" name="emergencyType" required>
							<option value="" disabled selected>비상 상황 선택</option>
							<option value="fire">화재</option>
							<option value="fall">낙상</option>
							<option value="faint">실신</option>
						</select> <input type="file" id="emergencyFile" name="emergencyFile" />
						<div alt="프로토콜 자료 등록 버튼 컨테이너">
							<button type="button" id="addEmergencyButton">자료 추가</button>
							<button type="button" id="previewButton_2">pdf 미리보기</button>
						</div>
					</div>
				</form>

				<!-- ✅ 추가된 자료 비동기 조회 ✅ -->
				<div id="emergencyListContainer">
					<h3>추가된 자료 목록</h3>
					<table>
						<th class="safetyRule">안전수칙</th>
						<tr>
							<td><span id="f_safetyRule">(사)smhrd_B공장_안전수칙.pdf</span></td>
						</tr>
						<th class="fire">비상 상황_화재</th>
						<tr>
							<td><span id="f_fire"></span></td>
						</tr>
						<th class="fall">비상 상황_낙상</th>
						<tr>
							<td><span id="f_fall">추락_전도_낙상_대응지침.pdf</span></td>
						</tr>
						<th class="faint">비상 상황_실신</th>
						<tr>
							<td><span id="f_faint">실신사고_대응지침.pdf</span></td>
						</tr>
					</table>
				</div>
			</div>
		</main>
	</div>

	<!-- jQuery -->
	<script src="/js/jquery-3.6.0.js"></script>
	<!-- scripts -->
	<script src="/js/P06_mod-Info.js"></script>
</body>
</html>
