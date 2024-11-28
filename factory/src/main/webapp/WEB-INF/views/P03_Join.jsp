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

input {
   width: 100%;
   padding: 12px;
   font-size: 14px;
   border: 1px solid #ddd;
   border-radius: 6px;
   box-sizing: border-box;
}

input:focus {
   border-color: #333;
   outline: none;
}

.form-group span {
   font-size: 12px;
   color: red;
   margin-top: 5px;
   display: block;
}

/* 버튼 색상 변경 */
button {
   width: 100%;
   padding: 15px;
   font-size: 16px;
   color: white;
   background-color: #333; /* 검정색 */
   border: none;
   border-radius: 6px;
   cursor: pointer;
   transition: background-color 0.3s ease;
}

button:hover {
   background-color: #000; /* 짙은 검정색 */
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
   border: 2px solid #ddd;
   border-radius: 10px;
   background-color: #f9f9f9;
   cursor: pointer;
   transition: all 0.3s ease;
}

.role-option:hover {
   border-color: #333;
   background-color: #eaeaea;
}

input[type="radio"] {
   display: none; /* 기본 라디오 숨김 */
}

input[type="radio"]:checked+.role-option {
   border-color: #4a4a4a; /* 진한 회색 */
   background-color: #4a4a4a; /* 선택된 배경: 진한 회색 */
   color: white; /* 글자 색: 흰색 */
   font-weight: bold;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15); /* 부드러운 그림자 */
}

.role-option {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   width: 40%;
   padding: 20px;
   border: 2px solid #b0b0b0; /* 기본 테두리: 연한 회색 */
   border-radius: 10px;
   background-color: #d9d9d9; /* 기본 배경: 연한 회색 */
   color: #333; /* 기본 글자 색: 짙은 회색 */
   cursor: pointer;
   transition: all 0.3s ease;
}

.role-option:hover {
   border-color: #6a6a6a; /* 마우스 오버 시 테두리: 중간 진한 회색 */
   background-color: #bfbfbf; /* 마우스 오버 시 배경: 중간 회색 */
   color: #222; /* 마우스 오버 시 글자 색: 더 진한 회색 */
}

.role-option img {
   width: 50px;
   height: 50px;
   margin-bottom: 10px;
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
<style>
/* 기존 input 스타일과 동일한 select 스타일 */
select {
   width: 100%;
   padding: 12px;
   font-size: 14px;
   border: 1px solid #ddd;
   border-radius: 6px;
   background-color: #fff;
   box-sizing: border-box;
   appearance: none; /* 기본 드롭다운 스타일 제거 */
   background-image:
      url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="%23ddd" d="M2 0L0 2h4z"/></svg>');
   /* 드롭다운 화살표 */
   background-repeat: no-repeat;
   background-position: right 10px center;
   background-size: 10px 10px;
   cursor: pointer;
}

select:focus {
   border-color: #333; /* 선택 시 테두리 강조 */
   outline: none;
   box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>
</head>
<body>
   <div class="signup-container">
      <h1>회원가입</h1>
      <form id="joinForm" action="joinForm" method="post">
         <div class="form-group">
            <label for="id">아이디</label> <input type="text" id="id" name="id"
               placeholder="아이디를 입력하세요" required /> <span
               id="idCheckMessage">아이디 중복 확인이 필요합니다.</span>
            <button type="button" id="idCheckButton">아이디 중복 확인</button>
         </div>
         <div class="form-group">
            <label for="pw">비밀번호</label> <input type="password" id="pw"
               name="pw" placeholder="비밀번호를 입력하세요" required />
         </div>
         <div class="form-group">
            <label for="pwConfirm">비밀번호 확인</label> <input type="password"
               id="pwConfirm" name="pwConfirm" placeholder="비밀번호를 다시 입력하세요"
               required /> <span id="pwCheckMessage">비밀번호가 일치하지
               않습니다.</span>
         </div>
         <div class="form-group">
            <label for="name">이름</label> <input type="text" id="name"
               name="name" placeholder="이름을 입력해 주세요" required />
         </div>
         <div class="form-group" id = "inputState">
            <label for="companyName">회사 명</label> 
            <select id="companyName" name="companyName" required>
               <option value="" disabled selected>회사 명을 선택해 주세요</option>
               <!-- JSTL로 회사명 동적 렌더링 -->
               <c:forEach var="c" items="${getCompanyName}">
                  <option value="${c.companyName}">${c.companyName}</option>
               </c:forEach>
            </select>
            
         </div>
         <div class="role-selection">
            <input type="radio" id="admin" name="role" value="admin" /> <label
               for="admin" class="role-option"> 관리자 </label> <input type="radio"
               id="user" name="role" value="user" checked /> <label for="user"
               class="role-option"> 일반 사용자 </label>
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
      // 아이디 중복 확인 기능
      document
        .getElementById("idCheckButton")
        .addEventListener("click", function () {
          const id = document.getElementById("id").value;
          if (id.length < 4) {
            alert("아이디는 최소 4글자 이상이어야 합니다.");
            return;
          }
          // 예제: 중복 확인 API 호출 (AJAX 또는 Fetch 사용)
          fetch(`/api/check-id?id=${id}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.available) {
                alert("사용 가능한 아이디입니다.");
                document.getElementById("idCheckMessage").style.display =
                  "none";
              } else{
                alert("이미 사용 중인 아이디입니다.");
                document.getElementById("idCheckMessage").style.display =
                  "block";
              }
            })
            .catch((error) => {
              console.error("에러:", error);
            });
        });

      // 비밀번호 확인 기능
      document
        .getElementById("pwConfirm")
        .addEventListener("input", function () {
          const pw = document.getElementById("pw").value;
          const pwConfirm = document.getElementById("pwConfirm").value;
          const message = document.getElementById("pwCheckMessage");

          if (pw === pwConfirm) {
            message.style.display = "none";
          } else {
            message.style.display = "block";
          }
        });

      // 폼 제출 시 유효성 검사
      document
        .getElementById("joinForm")
        .addEventListener("submit", function (event) {
          const id = document.getElementById("id").value;
          const pw = document.getElementById("pw").value;
          const pwConfirm = document.getElementById("pwConfirm").value;

          if (pw !== pwConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            event.preventDefault();
          }

          if (id.length < 4) {
            alert("아이디는 최소 4글자 이상이어야 합니다.");
            event.preventDefault();
          }
        });
      
      
    </script>
</body>
</html>
