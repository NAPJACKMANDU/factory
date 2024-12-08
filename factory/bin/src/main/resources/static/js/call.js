
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