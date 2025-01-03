<%@page import="com.smhrd.demo.model.FactoryMember"%> <%@ page language="java"
contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
isELIgnored="false"%> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>P01_Login</title>
    <link rel="stylesheet" href="<c:url value='/style/login-styles.css' />" />
  </head>
  <body>
    <div class="login-container">
      <div class="login-box">
        <h2>씨씨콜콜</h2>
        <form
          alt="로그인 페이지 컨테이너-form"
          id="logInForm"
          method="post"
          action="/LoginFrom"
          class="enterForm"
        >
          <div class="form-group">
            <label for="username">아이디</label>
            <input
              type="text"
              id="username"
              name="id"
              placeholder="아이디를 입력해 주세요"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="pw"
              placeholder="비밀번호를 입력해 주세요"
              required
            />
          </div>
          <button type="submit" class="login-btn">로그인</button>
        </form>
          <section alt="로그인 페이지 a태그 컨테이너">
        <div>
          <span>로그인 계정이 없으신가요?</span>
          <a href="/P03_Join"><span>회원가입</span></a>
        </div>
      </section>
      </div>
    </div>
    <script src="<c:url value='/js/login-scripts.js' />"></script>
  </body>
</html>
