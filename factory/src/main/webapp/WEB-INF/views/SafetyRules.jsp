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
    <title>수칙 테이블</title>
    <link
      rel="stylesheet"
      href="style/globals.css"
    />
    <link
      rel="stylesheet"
      href="style/saftyRules.css"
    />
  </head>
  <body>
    <div id="globals-container">
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
