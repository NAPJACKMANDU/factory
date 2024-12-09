$(document).ready(function () {
  // 비상 대응 안내 문서의 파일명을 출력하는 기능
  $("#addEmergencyButton").click(function () {
    const fileInput = $("#emergencyFile")[0]; // 파일 입력 필드 #emergencyFile 참조
    const file = fileInput && fileInput.files ? fileInput.files[0] : null; // 업로드된 파일 객체 가져오기

    if (file) {
      $("#f_fire").text(file.name); // 파일명을 #f_fire에 출력
    } else {
      alert("파일을 등록해주세요."); // 파일이 등록되지 않은 경우 알림
    }
  });

  // 안전수칙 파일의 파일명을 출력하는 기능
  $("#addSafetyRuleButton").click(function () {
    const fileInput = $("#safetyRuleFile")[0]; // 파일 입력 필드 #safetyRuleFile 참조
    const file = fileInput && fileInput.files ? fileInput.files[0] : null; // 업로드된 파일 객체 가져오기

    if (file) {
      $("#f_safetyRule").text(file.name); // 파일명을 #f_safetyRule에 출력
    } else {
      alert("파일을 등록해주세요."); // 파일이 등록되지 않은 경우 알림
    }
  });

  // PDF 파일 URL 변수
  let safetyRuleUrl = null;
  let emergencyFileUrl = null;

  // PDF 파일 URL 추출
  $("#addSafetyRuleButton, #addEmergencyButton").click(function () {
    // 안전수칙 파일 URL 추출
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
      window.open(safetyRuleUrl, "_blank"); // 안전수칙 PDF URL을 새 탭에서 열기
    } else {
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
});
