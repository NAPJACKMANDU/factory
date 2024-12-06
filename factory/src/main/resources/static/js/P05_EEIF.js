$(document).ready(function () {
  const $contactAddModal = $("#contact-add-modal"); // 모달 선택자
  const $addButton = $('article[alt="연락망 프로필 추가"] button'); // 추가 버튼
  const $closeButton = $(".close-contact-add-modal"); // 닫기 버튼

  // 모달 열기 함수
  function openContactAddModal() {
    $contactAddModal.removeClass("hidden");
  }

  // 모달 닫기 함수
  function closeContactAddModal() {
    $contactAddModal.addClass("hidden");
    $("#contact-add-form")[0].reset(); // 폼 초기화
  }

  // 모달 열기 이벤트
  $addButton.on("click", openContactAddModal);

  // 모달 닫기 이벤트
  $closeButton.on("click", closeContactAddModal);

  // 폼 제출 처리
  $("#contact-add-form").on("submit", function (event) {
    event.preventDefault();

    const name = $("#contact-name").val();
    const department = $("#contact-department").val();
    const phone = $("#contact-phone").val();
    const hours = $("#contact-hours").val();
    const location = $("#contact-location").val();

    // 새로운 연락망 프로필 생성
    const newProfile = `
      <article alt="연락망 프로필">
        <div alt="연락망 사진">
          <img src="/src/main/resources/static/imgs/default.jpg" alt="default-profile" />
        </div>
        <div alt="연락망 정보">
          <section alt="정보1"><h3>${name}</h3></section>
          <section alt="정보2"><p>${department}</p></section>
          <section alt="정보3">
            <ul>
              <li>${phone}</li>
              <li>${hours}</li>
              <li>${location}</li>
            </ul>
          </section>
        </div>
      </article>
    `;

    // 연락망 컨테이너에 추가
    $('main[alt="연락망 프로필 컨테이너"]').append(newProfile);

    // 모달 닫기
    closeContactAddModal();
  });

  // 외부 클릭 시 모달 닫기
  $contactAddModal.on("click", function (event) {
    if ($(event.target).is($contactAddModal)) {
      closeContactAddModal();
    }
  });
});
