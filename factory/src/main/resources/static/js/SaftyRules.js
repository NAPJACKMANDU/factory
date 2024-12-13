
	function getAllCall() {
        console.log("데이터 가져오기 시작");
        $.ajax({
            url: "/SaftyRules",
            type: "Get",
            success:  printList,
            error: function() {
                alert("통신 실패");
            }
        });
    }
  
  function printList(data) {
	  console.log("데이터를 받아서 처리 시작:", data); 
      var code = "";
      for (var i = 0; i < data.length; i++) {
    	   console.log(data[i]);
     // if (data[i].companyIdx == member.companyIdx) {
          code += "<tr>";
          code += "<td>" +  (i+1) + "</td>";
          code += "<td>" + data[i].srTitle + "</td>";
          code += "<td>" + data[i].srDesc + "</td>";
          code += "<td>" + new Date(data[i].createdAt).toLocaleDateString()  + "</td>";
          code += "</tr>";
      //	}
      }
      $("#list").html(code); // tbody에 새 코드 삽입

      
  }
