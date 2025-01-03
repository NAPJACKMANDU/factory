<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core"%> <%@ taglib prefix="fmt"
uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>P05_safetyRules</title>
    <link rel="stylesheet" href="style/globals.css" />
    <link rel="stylesheet" href="style/saftyRules.css" />

    <style>
      header {
        background-color: #0b0c0cd8;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70px;

        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
      }

      header a {
        text-decoration: none;
        color: whitesmoke;
        font-weight: 600;
      }

      header a:hover {
        color: lightblue;
      }

      div[alt="a 컨테이너"] {
        width: 250px;
      }

      .vertical-line {
        border: 0.005px solid #9aa0a6;
        width: 0.5px;
        height: 55px;
      }

      nav {
        display: flex;
        gap: 5%;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
      }
    </style>
  </head>
  <body>
    <div id="globals-container">
      <!-- header -->
      <header alt="헤더" id="sr-header">
        <!-- 부가기능 탭 -->
        <nav alt="부가기능 탭">
          <div alt="a 컨테이너">
            <a href="#" style="font-size: 11.8pt">CCTV모니터</a>
          </div>
          <div class="vertical-line"></div>
          <div alt="a 컨테이너">
            <a href="#" style="font-size: 11.8pt">연락망</a>
          </div>
          <div class="vertical-line"></div>
          <div alt="a 컨테이너">
            <a href="#" style="font-size: 11.8pt">정보 등록</a>
          </div>
        </nav>
      </header>
      <div id="sr-container">
        <h2>수칙 테이블</h2>
        <table>
          <thead>
            <tr class="th">
              <th id="th-init">순번</th>
              <th id="th-tl">수칙 제목</th>
              <th>수칙 분류</th>
              <th id="th-end">수칙 등록일자</th>
            </tr>
          </thead>
          <tbody>
            <c:forEach var="item" items="${list}">
              <tr>
                <!-- 순번 -->
                <td id="td-init">${item.srIdx}</td>

                <!-- 수칙 제목 -->
                <td id="td-tl">
                  <a
                    href="javascript:void(0);"
                    onclick="openPdf('${item.safetyPath}');"
                    >${item.srTitle}</a
                  >
                  <!-- <%-- javascript:void(0);는 클릭할 때 페이지가 새로고침되지 않도록 하는 역할을 한다..
             openPdf('${item.safetyPath}')는 item.safetyPath에 저장된 파일 경로를 openPdf 함수에 전달하고
              해당 경로에 있는 PDF 파일을 새 탭에서 열도록 한다. --%> -->
                </td>

                <!-- 수칙 분류 -->
                <td>${item.srDesc}</td>

                <!-- 등록일 -->
                <td id="td-end">
                  <fmt:formatDate
                    value="${item.createdAt}"
                    pattern="yyyy-MM-dd HH:mm"
                  />
                </td>
              </tr>
            </c:forEach>
          </tbody>
        </table>
      </div>
    </div>

    <script src="/js/SafetyRules.js"></script>
  </body>
</html>
