<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>회원가입</title>
<link rel="stylesheet" href="/style/P03_Join.css" />
<style>
/* 전체 레이아웃 */
body {
	font-family: "Arial", sans-serif;
	background-color: #f4f7f9;
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

.signup-container {
	background: #ffffff;
	border-radius: 15px;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 450px;
	padding: 30px 25px;
}

h1 {
	font-size: 26px;
	color: #333;
	text-align: center;
	margin-bottom: 30px;
}

.form-group {
	margin-bottom: 20px;
}

label {
	display: block;
	font-size: 14px;
	font-weight: bold;
	margin-bottom: 8px;
	color: #555;
}

input, select {
	width: 100%;
	padding: 12px;
	font-size: 14px;
	border: 1px solid #ddd;
	border-radius: 6px;
	box-sizing: border-box;
}

input:focus, select:focus {
	border-color: #333;
	outline: none;
}

.form-group span {
	font-size: 12px;
	color: red;
	margin-top: 5px;
	display: block;
}

button {
	width: 100%;
	padding: 15px;
	font-size: 16px;
	color: white;
	background-color: #333;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

button:hover {
	background-color: #000;
}

/* 관리자 및 일반 사용자 선택 디자인 */
.role-selection {
	display: flex;
	justify-content: space-around;
	margin-top: 20px;
}

.role-option {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 40%;
	padding: 20px;
	border: 2px solid #b0b0b0;
	border-radius: 10px;
	background-color: #d9d9d9;
	cursor: pointer;
	transition: all 0.3s ease;
}

input[type="radio"] {
	display: none;
}

input[type="radio"]:checked+.role-option {
	border-color: #4a4a4a;
	background-color: #4a4a4a;
	color: white;
	font-weight: bold;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

footer {
	text-align: center;
	margin-top: 25px;
	font-size: 14px;
	color: #555;
}

footer a {
	color: #333;
	text-decoration: none;
}

footer a:hover {
	text-decoration: underline;
}
</style>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
	<div class="signup-container">
		<h1>회원가입</h1>
		<form id="joinForm" action="/joinForm" method="post">
			<div class="form-group">
				<label for="id">아이디</label> <input type="text" id="id" name="id"
					placeholder="아이디를 입력하세요" required /> <span id="idCheckMessage">아이디
					중복 확인이 필요합니다.</span>
				<button type="button" id="idCheckButton">아이디 중복 확인</button>
			</div>
			<div class="form-group">
				<label for="pw">비밀번호</label> <input type="password" id="pw"
					name="pw" placeholder="비밀번호를 입력하세요" required />
			</div>
			<div class="form-group">
				<label for="pwConfirm">비밀번호 확인</label> <input type="password"
					id="pwConfirm" name="pwConfirm" placeholder="비밀번호를 다시 입력하세요"
					required /> <span id="pwCheckMessage">비밀번호가 일치하지 않습니다.</span>
			</div>
			<div class="form-group">
				<label for="name">이름</label> <input type="text" id="name"
					name="name" placeholder="이름을 입력해 주세요" required />
			</div>
			
			<div class="form-group">
				<label for="phone">전화번호</label> <input type="text" id="phone"
					name="phone" placeholder="01012345678 형식으로 입력하세요" required />	
			</div>
			<div class="form-group" id="inputState">
				<label for="companyName">회사 명</label> <select id="companyName"
					name="companyIdx" required>
					<option value="" disabled selected>회사 명을 선택해 주세요</option>

				</select>
			</div>
			<div class="role-selection">
				<input type="radio" id="admin" name="role" value="관리자	" /> 
				<label for="admin" class="role-option">관리자</label> 
				<input type="radio" id="user" name="role" value="일반 사용자" checked /> 
				<label for="user" class="role-option">일반 사용자</label>
			</div>
			<button type="submit">가입하기</button>
		</form>
		<footer>
			<p>
				이미 계정이 있으신가요? <a href="/login">로그인</a>
			</p>
		</footer>
	</div>
	<script>
      // 회사명 로드
 $.ajax({
        url: '/api/companies',
        method: 'GET',
        success: function (data) {
        	console.log(data);
            let dropdown = $('#companyName');
            dropdown.empty().append('<option value="" disabled selected>회사 명을 선택해 주세요</option>');
            // 데이터 순회하여 드롭다운 옵션 추가
            data.forEach(function (company) {
            	 console.log('회사 정보:', company);
                dropdown.append('<option value="' + company.companyIdx + '">' + company.companyName + '</option>');
            });
            // 드롭다운의 값이 변경될 때 실행되는 이벤트 핸들러 등록
            $('#companyName').on('change', function() {
                let selectedValue = $(this).val();
                console.log('선택된 companyIdx:', selectedValue);
            });
        },
        error: function () {
            alert('회사명을 불러오는 데 실패했습니다.');
        }
    });

//아이디 중복 확인
 document.getElementById("idCheckButton").addEventListener("click", function () {
     const id = document.getElementById("id").value;
     const idCheckMessage = document.getElementById("idCheckMessage");

     if (id.length < 4) {
         alert("아이디는 최소 4글자 이상이어야 합니다.");
         idCheckMessage.textContent = "아이디는 최소 4글자 이상이어야 합니다.";
         idCheckMessage.style.color = "red";
         return;
     }

     $.ajax({
         url: "/api/check-id?id=" + encodeURIComponent(id),
         method: "GET", 
         success: function (data) {
             if (data.available) {
                 alert("사용 가능한 아이디입니다.");
                 idCheckMessage.textContent = "사용 가능한 아이디입니다.";
                 idCheckMessage.style.color = "green";
             } else {
                 alert("이미 사용 중인 아이디입니다.");
                 idCheckMessage.textContent = "이미 사용 중인 아이디입니다.";
                 idCheckMessage.style.color = "red";
             }
         },
         error: function () {
             alert('아이디 중복 확인 요청에 실패했습니다. 다시 시도해주세요.');
             idCheckMessage.textContent = "오류가 발생했습니다.";
             idCheckMessage.style.color = "red";
         }
     });
 });

      // 비밀번호 확인
      document.getElementById("pwConfirm").addEventListener("input", function () {
         const pw = document.getElementById("pw").value;
         const pwConfirm = document.getElementById("pwConfirm").value;
         const message = document.getElementById("pwCheckMessage");
         message.style.display = pw === pwConfirm ? "none" : "block";
      });

      // 폼 제출 유효성 검사
      document.getElementById("joinForm").addEventListener("submit", function (event) {
         const id = document.getElementById("id").value;
         const pw = document.getElementById("pw").value;
         const pwConfirm = document.getElementById("pwConfirm").value;
         if (pw !== pwConfirm || id.length < 4) {
            event.preventDefault();
            alert("입력 정보를 다시 확인해주세요.");
         }
      });
   </script>
</body>
</html>
