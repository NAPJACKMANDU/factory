<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" isELIgnored="false"%> <%@taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core"%> <%@ taglib prefix="fmt"
uri="http://java.sun.com/jsp/jstl/fmt"%> <%@ page isELIgnored="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>비상연락망</title>
    <link rel="stylesheet" href="/call.css" />
  </head>
  <body>
    <form id="call_frm" action="/call" method="Get" style="display: inline">
      <div class="contact-table-container">
        <h1>비상연락망</h1>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>직위</th>
              <th>전화번호</th>
              <th>비고</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody id="list">
            <%--
            <c:forEach items="${allcall}" var="a">
              <tr id="callall" style="background-color: #f9f9f9">
                <td>${a.idx}</td>
                <td>${a.name}</td>
                <td>${a.role}</td>
                <td>${a.phone}</td>
                <td
                  class="editable"
                  contenteditable="true"
                  data-id="${a.idx}"
                  data-field="note"
                >
                  ${a.note}
                </td>
                <td class="button-cell">
                  <button
                    type="button"
                    class="add-contact"
                    onclick="callbyupdate('${a.idx}')"
                  >
                    수정
                  </button>
                  <button class="add-contact" onclick="callbyupdate(event)">
                    수정
                  </button>
                </td>
                <td class="button-cell">
                  <button
                    type="button"
                    class="delete-button"
                    onclick="callbydelete('${a.idx}')"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            </c:forEach>
            --%>
          </tbody>
        </table>
      </div>
    </form>
    <script src="/js/call.js"></script>
  </body>
</html>
