<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" isELIgnored="false"%> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core"%>
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

      input[type="radio"]:checked + .role-option {
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
  </head>
  <body>
    <!-- View -->
    <div alt="전역 컨테이너" id="globals-container">
      <!-- header -->
      <header alt="헤더">
        <section alt="로고 컨테이너">
          <form action="/Main" method="get">
            <button alt="P001_Main으로 이동" type="submit">
              <img alt="로고 이미지" src="/imgs/Logo.jpg" />
            </button>
          </form>
        </section>
      </header>

      <!-- main -->
      <main alt="메인콘텐츠">
        <!-- 회원가입 정보 입력 구역 -->
        <form
          alt="회원가입 페이지 컨테이너"
          action="#"
          method="post"
          id="joinForm"
          class="enterForm"
        >
          <section alt="회원가입 input_필수">
            <h4>필수 입력</h4>
            <input
              alt="회원가입ID"
              name="id"
              id="id"
              type="text"
              placeholder="사업자 ID 입력"
            />
            <div alt="id체크 컨테이너">
              <!-- 아이디 중복 체크 -->
              <span>사용 가능한 ID</span>
              <!-- <span>중복 ID가 있습니다.</span> -->
              <button name="id_chk"><span>중복 체크</span></button>
            </div>
            <input
              alt="회원가입PW"
              name="pw"
              id="pw"
              type="password"
              placeholder="비밀번호 입력"
            />
            <input
              alt="비밀번호 확인"
              name="pw_chk"
              id="pw_chk"
              type="password"
              placeholder="비밀번호 확인"
            />
            <div alt="pw체크 컨테이너">
              <!-- 비밀번호 일치 체크 -->
              <span>비밀번호가 일치합니다.</span>
              <!-- <span>비밀번호가 일치하지 않습니다.</span> -->
            </div>
            <p>기업 정보</p>
            <input
              alt="회원가입 회사명"
              name="company_name"
              id="company_name"
              type="text"
              placeholder="기업명"
            />
            <input
              alt="회원가입 회사 주소"
              name="company_addr"
              id="company_addr"
              type="text"
              placeholder="주소 입력"
            />
            <input
              alt="회원가입 회사 연락처"
              name="company_tel"
              id="company_tel"
              type="tel"
              placeholder="공식 회선 번호 (예: 02-123-4567)"
            />
            <input
              alt="회원가입 회사 홈페이지 ="
              name="url"
              id="url"
              type="text"
              placeholder="www.yourCompany.com/"
            />
            <p>가입자 정보</p>
            <input
              alt="가입자 성명"
              name="name"
              id="name"
              type="text"
              placeholder="홍길동"
            />
            <input
              alt="가입자 연락처"
              name="tel"
              id="tel"
              type="tel"
              placeholder="010-1234-5678"
            />
            <p>가입 정보 찾기</p>
            <input
              alt="회원정보 찾기email"
              name="email"
              id="email"
              type="email"
              placeholder="yourEmail@email.com"
            />
          </section>
          <hr />
          <section>
            <!-- <h4>선택 입력</h4> -->
            <div alt="회원가입input_선택>직책">
              <p alt="직책 입력">직책 선택</p>
              <!-- // value는 예시! -->
              <table>
                <td>
                  <input
                    name="role"
                    id="r_admin"
                    type="radio"
                    value="admin"
                  />관리자 회원
                </td>
                <td>
                  <input
                    name="role"
                    id="r_norm"
                    type="radio"
                    value="norm"
                  />일반 회원
                </td>
              </table>
            </div>
          </section>

          <section alt="회원가입 정보 제출 컨테이너">
            <!-- <input name="agreement" type="checkbox" value="#" />정보제공동의 -->
            <p>
              <button alt="회원가입 버튼" type="submit" form="joinForm">
                <span>가입하기</span>
              </button>
            </p>
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
    <script src="/js/P03_Join.js"></script>
    <script src="/js/globals.js"></script>

    <script>
      // 이곳에 script를 입력
    </script>
  </body>
</html>
