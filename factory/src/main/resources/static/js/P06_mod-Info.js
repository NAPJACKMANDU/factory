/**
 * 1. 안전수칙a/대응지침popup 파일 등록
 * 2. PDF의 url 추출 --> a, popup
 */


 // 비밀번호 확인
      document
        .getElementById("pwConfirm")
        .addEventListener("input", function () {
          const pw = document.getElementById("if_pw").value;
          const pwConfirm = document.getElementById("pwConfirm").value;
          const message = document.getElementById("pwCheckMessage");
          message.style.display = pw === pwConfirm ? "none" : "block";
        });


function update(event) {
    event.preventDefault(); // 기본 폼 제출 방지

    let infofrm = $('#info_frm').serialize(); // 폼 데이터 직렬화
    let idx = $('#info_idx').val(); // hidden input에서 idx 가져오기
    console.log(infofrm);

    $.ajax({
        url: "update/" + idx,
        type: "PATCH",
        data: infofrm,
        success: function(response) {
            console.log(response); // 성공 메시지 출력
            window.location.href = "/CCTV_Monitor"; // 성공 시 페이지 이동
        },
        error: function() {
            alert("통신 실패");
        }
    });
}
   
$(document).ready(function () {
  // 비상 대응 안내 문서의 파일명을 출력하는 기능	
  $("#addEmergencyButton").click(function () {
    const fileInput = $("#emergencyFile")[0]; // 파일 입력 필드 #emergencyFile 참조
    console.log(fileInput)
    
    const file = fileInput && fileInput.files ? fileInput.files[0] : null; // 업로드된 파일 객체 가져오기
    console.log(file)
    
    if (file) {
      $("#f_fire").text(file.name); // 파일명을 #f_fire에 출력
    } else {
      alert("파일을 등록해주세요."); // 파일이 등록되지 않은 경우 알림
    }
  });

  // PDF 파일 URL 변수
  let safetyRuleUrl = null;
  let emergencyFileUrl = null;

  // PDF 파일 URL 추출 🌟🌟🌟 --> 📢서버엔드포인트 : CCTV모니터 'nav > div > a[alt="연락망"]'의 하이퍼링크에 담길 값!
  $("#addSafetyRuleButton, #addEmergencyButton").click(function () {
    const safetyRuleFileInput = $("#safetyRuleFile")[0];
    const safetyRuleFile =
      safetyRuleFileInput && safetyRuleFileInput.files
        ? safetyRuleFileInput.files[0]
        : null;
    safetyRuleUrl = safetyRuleFile ? URL.createObjectURL(safetyRuleFile) : null;

    // 비상 대응 파일 URL 추출
    const emergencyFileInput = $("#emergencyFile")[0];
    const emergencyFile =
      emergencyFileInput && emergencyFileInput.files
        ? emergencyFileInput.files[0]
        : null;
    emergencyFileUrl = emergencyFile
      ? URL.createObjectURL(emergencyFile)
      : null;

    // 디버깅 로그: 추출된 URL 확인
    console.log("Safety Rule PDF URL:", safetyRuleUrl);
    console.log("Emergency PDF URL:", emergencyFileUrl);
  });

  // 안전수칙 PDF 미리보기 기능
  $("#previewButton_1").click(function () {
    if (safetyRuleUrl) {
      window.open(safetyRuleUrl, ""); // 안전수칙 PDF URL을 새 탭에서 열기
    } else {_blank
      alert("안전수칙 파일을 등록해주세요."); // URL이 없는 경우 알림
    }
  });

  // 비상 대응 PDF 미리보기 기능
  $("#previewButton_2").click(function () {
    if (emergencyFileUrl) {
      window.open(emergencyFileUrl, "_blank"); // 비상 대응 PDF URL을 새 탭에서 열기
    } else {
      alert("비상 대응 파일을 등록해주세요."); // URL이 없는 경우 알림
    }
  });

   $("#addSafetyRuleButton").click(function () {
	    const fileInput = $("#safetyRuleFile")[0]; // 파일 입력 필드 참조
	    const file = fileInput && fileInput.files ? fileInput.files[0] : null; // 업로드된 파일 객체 가져오기

	    if (file) {
	        const fileName = file.name; // 업로드된 파일명
	        $("#safetyRuleFile").text(fileName); // 파일명을 화면에 출력

	        // 키워드 리스트 정의
	        const keywords = ["화재", "낙상", "실신"];

	        // 파일명에서 키워드 추출
	        const extractedKeyword = keywords.find(keyword => fileName.includes(keyword));

	        if (extractedKeyword) {
	            console.log("추출된 키워드:", extractedKeyword);

	            // FormData 객체 생성
	            const formData = new FormData();
	            formData.append("file", file); // 파일 추가
	            formData.append("srTitle", fileName); // 제목 추가
	            formData.append("srDesc", extractedKeyword); // 키워드 추가

	            console.log("전송 데이터:", fileName, extractedKeyword);

	            // AJAX를 이용해 데이터를 서버로 전송
	            $.ajax({
	                url: "/SafetyForm",
	                type: "POST",
	                data: formData,
	                processData: false, // FormData를 문자열로 변환하지 않음
	                contentType: false, // 멀티파트 전송을 위한 Content-Type 설정
	                success: function (data) {
	                    console.log("키워드 저장 완료:", data);
	                    alert("파일 업로드가 완료되었습니다.");
	                  
	                },
	                error: function (error) {
	                    console.error("키워드 저장 중 오류 발생:", error);
	                    alert("파일 업로드 중 오류가 발생했습니다.");
	                }
	            });
	        } else {
	            // 키워드를 찾지 못한 경우 기본 값을 설정하거나 경고 메시지를 표시
	            alert("파일명에 키워드가 없습니다.");
	        }
	    } else {
	        alert("파일을 등록해주세요.");
	    }
	});

});