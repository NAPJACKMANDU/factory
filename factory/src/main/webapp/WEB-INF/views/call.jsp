<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" isELIgnored="false"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page isELIgnored="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>비상연락망</title>
<style>
body {
	font-family: Arial, sans-serif;
	background-color: #f4f7f9;
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

.contact-table-container {
	width: 100%;
	max-width: 1200px;
	background: #ffffff;
	border-radius: 15px;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
	overflow: hidden;
}

h1 {
	text-align: center;
	font-size: 28px;
	color: #333;
	margin: 20px 0;
}

table {
	width: 100%;
	border-collapse: collapse;
}

thead {
	background-color: #4a4a4a;
	color: white;
}

th, td {
	text-align: center;
	padding: 15px;
	font-size: 16px;
	border: 1px solid #ddd;
}

tbody tr:nth-child(even) {
	background-color: #f9f9f9;
}

tbody tr:hover {
	background-color: #f1f1f1;
}

.editable {
	cursor: pointer;
}

.editable:focus {
	outline: none;
	border: 1px solid #000;
	background-color: #fff;
}

.add-contact {
	display: inline-block;
	padding: 8px 15px;
	font-size: 14px;
	text-align: center;
	color: white;
	background-color: #4a4a4a; /* 수정 버튼 기본 색상 */
	border: none;
	border-radius: 5px;
	cursor: pointer;
	text-decoration: none;
	transition: all 0.3s ease;
}

.add-contact:hover {
	background-color: #333;
}

.delete-button {
	display: inline-block;
	padding: 8px 15px;
	font-size: 14px;
	text-align: center;
	color: white;
	background-color: #4a4a4a; /* 삭제 버튼 기본 색상 */
	border: none;
	border-radius: 5px;
	cursor: pointer;
	text-decoration: none;
	transition: all 0.3s ease;
}

.delete-button:hover {
	background-color: #c0392b; /* hover 시 어두운 빨간색 */
}

.button-cell {
	text-align: center;
	padding: 10px 0;
}
</style>
</head>
<body>
    <form id = "call_frm" action="/call" method="Get" style="display: inline;">
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
                  <%--   <c:forEach items="${allcall}" var="a">
                        <tr id="callall" style="background-color: #f9f9f9;">
                            <td>${a.idx}</td>
                            <td>${a.name}</td>
                            <td>${a.role}</td>
                            <td>${a.phone}</td>
                           <td class="editable" contenteditable="true" data-id="${a.idx}" data-field="note">${a.note}</td>
                            <td class="button-cell">
                                <button type="button" class="add-contact" onclick="callbyupdate('${a.idx}')">수정</button>
	                  <button class="add-contact" onclick="callbyupdate(event)">수정</button>

    </td>
                            <td class="button-cell">
                                <button type="button" class="delete-button" onclick="callbydelete('${a.idx}')">삭제</button>
                           
                            
                            </td>
                        </tr>
                    </c:forEach> --%>
                </tbody>
            </table>
        </div>
    </form>
	<script>
	
	 function getAllCall() {
         console.log("데이터 가져오기 시작");
         $.ajax({
             url: "/calls",
             type: "get",
             success: printList,
             error: function() {
                 alert("통신 실패");
             }
         });
     }

     // 데이터 출력 함수
     function printList(data) {
         var code = "";
         for (var i = 0; i < data.length; i++) {
         if (data[i].companyIdx == ${member.companyIdx}) {
             code += "<tr style='background-color: #f9f9f9;'>";
             code += "<td>" +  i + "</td>";
             code += "<td>" + data[i].name + "</td>";
             code += "<td>" + data[i].role + "</td>";
             code += "<td>" + data[i].phone + "</td>";
             code += "<td class='editable' contenteditable='true' data-id='" + data[i].idx + "' data-field='note'>" + data[i].note + "</td>";
             code += "<td class='button-cell'>";
             code += "<button type='button' class='add-contact' onclick='callbyupdate(event)'>수정</button>";
             code += "</td>";
             code += "<td class='button-cell'>";
             code += "<button type='button' class='delete-button' onclick='callbydelete(" + data[i].idx + ")'>삭제</button>";
             code += "</td>";
             code += "</tr>";
         }
         }
         $("#list").html(code); // tbody에 새 코드 삽입
     }
     
     
     // 수정 함수
     function callbyupdate(event) {
         let target = $(event.target).closest("tr");
         let idx = target.find(".editable").data("id");
         let note = target.find(".editable").text(); // 수정된 노트 값 가져오기

         $.ajax({
             url: "call/" + idx,
             type: "patch",
             contentType: "application/json",
             data: JSON.stringify({ idx: idx, note: note }),
             success: function(response) {
                 getAllCall(); // 수정 후 데이터 다시 불러오기
             },
             error: function() {
                 alert("통신 실패");
             }
         });
     }

     // 페이지 로드 시 데이터 불러오기
     $(document).ready(function() {
         getAllCall();
     });
     
     function callbydelete(idx) {
    	 $.ajax({
    		 url : "/call/" + idx,
    		 type : "delete",
    		 success : getAllCall,
    		 error : function() {
    			 alert()
    		 }
    	 })
     }
  
     
     
 </script>
</body>
</html>
