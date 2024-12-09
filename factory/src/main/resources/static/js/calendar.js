document.addEventListener("DOMContentLoaded", () => {
  const calendarDays = document.querySelector(".calendar-days"); // 날짜를 표시할 tbody
  const modal = document.getElementById("modal"); // 모달 창
  const modalDate = document.getElementById("modal-date"); // 모달에 날짜를 표시할 요소
  const modalData = document.getElementById("modal-data"); // 모달에 데이터를 표시할 요소
  const currentMonthElement = document.getElementById("current-month"); // 현재 월 표시 요소
  const prevMonthButton = document.getElementById("prev-month"); // 이전 달 버튼
  const nextMonthButton = document.getElementById("next-month"); // 다음 달 버튼

  let currentYear = 2024; // 초기 연도
  let currentMonth = 11; // 초기 월 (0: 1월, 11: 12월)
  let lastClickedDate = null; // 마지막으로 클릭한 날짜 저장
  let clickCount = 0; // 클릭 횟수 저장

  // 달력을 동적으로 렌더링하는 함수
  function renderCalendar() {
    // 달력 클리어
    calendarDays.innerHTML = "";

    // 현재 월 및 연도 업데이트
    currentMonthElement.textContent = `${currentYear}년 ${currentMonth + 1}월`;

    // 현재 월의 첫 번째 날과 마지막 날 계산
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let dayOfWeek = firstDayOfMonth; // 첫 번째 요일
    let row = document.createElement("tr"); // 주 단위 행 생성

    // 첫째 주 빈 칸 생성
    for (let i = 0; i < dayOfWeek; i++) {
      const emptyCell = document.createElement("td");
      row.appendChild(emptyCell);
    }

    // 날짜 셀 생성
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement("td");
      cell.textContent = day;

      // 일요일, 토요일 스타일 추가
      if (dayOfWeek % 7 === 0) {
        cell.classList.add("weekend");
      } else if (dayOfWeek % 7 === 6) {
        cell.classList.add("saturday");
      }

      // 날짜 클릭 이벤트 등록
      cell.addEventListener("click", () => {
        handleDateClick(currentYear, currentMonth, day);
      });

      row.appendChild(cell);
      dayOfWeek++;

      // 주 단위로 행 추가
      if (dayOfWeek % 7 === 0) {
        calendarDays.appendChild(row);
        row = document.createElement("tr");
      }
    }

    // 마지막 행 추가
    if (row.children.length > 0) {
      calendarDays.appendChild(row);
    }
  }

  // 이전 달로 변경
  prevMonthButton.addEventListener("click", () => {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    renderCalendar(); // 달력 다시 렌더링
  });

  // 다음 달로 변경
  nextMonthButton.addEventListener("click", () => {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    renderCalendar(); // 달력 다시 렌더링
  });

  // 날짜 클릭 처리 함수
  async function handleDateClick(year, month, day) {
    const selectedYear = year; // 필요한 경우 추가적인 변수 생성
    const selectedMonth = month + 1; // 월을 표시할 때는 1월이 1이 되도록 조정
    const selectedDay = day;

    console.log(selectedYear);
    console.log(selectedMonth);
    console.log(selectedDay);

    // JSON 객체 생성
    const requestBody = {
      year: selectedYear,
      month: selectedMonth,
      day: selectedDay,
    };

    console.log(requestBody);

    // 모달을 표시하는 함수 (애니메이션 포함)
    function showModal() {
      modal.classList.remove("hidden"); // 모달을 표시 (display: block)
      modal.classList.add("fade-in"); // 부드러운 등장 애니메이션 추가
      modal.classList.remove("fade-out"); // 사라짐 애니메이션 제거
    }

    // 모달을 숨기는 함수 (애니메이션 포함)
    function hideModal() {
      modal.classList.add("fade-out"); // 부드러운 사라짐 애니메이션 추가
      modal.classList.remove("fade-in"); // 등장 애니메이션 제거
      // 애니메이션 종료 후 숨기기
      setTimeout(() => {
        modal.classList.add("hidden"); // display: none 설정
      }, 300); // CSS 애니메이션 지속 시간 (300ms)과 동일
    }

    async function fetchDayData(year, month, day) {
      try {
        // 데이터 서버에서 가져오기
        const response = await fetch("/calendar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            year: year,
            month: month + 1, // 월을 올바르게 처리
            day: day,
          }),
        });

        if (!response.ok) {
          throw new Error("데이터를 찾을 수 없습니다.");
        }

        const data = await response.json();
        console.log("서버에서 받은 데이터:", data);

        getAllIncident();

        // 응답 데이터를 사용하여 모달 데이터 설정
        modalDate.textContent = `${year}년 ${month + 1}월 ${day}일`;
        if (data != null) {
          modalData.textContent = `${data.length}의 데이터가 있습니다.`;
          console.log(data.detilas);
          showModal();
        } else {
          modalData.textContent = data.details || "데이터가 없습니다.";
          showModal();
        }
      } catch (error) {
        modalDate.textContent = `${year}년 ${month + 1}월 ${day}일`;
        modalData.textContent = error.message; // 오류 메시지 표시
        showModal();
      }
    }

    // 모달 닫기 이벤트 등록
    document.querySelector(".close-modal").addEventListener("click", () => {
      hideModal(); // 모달 숨기기
      lastClickedDate = null; // 마지막 클릭한 날짜 초기화
      clickCount = 0; // 클릭 횟수 초기화
    });

    if (lastClickedDate === `${year}-${month + 1}-${day}`) {
      // 같은 날짜를 클릭했을 때
      clickCount++;
      if (clickCount % 2 === 0) {
        hideModal(); // 짝수 번째 클릭 시 모달 닫기
        lastClickedDate = null; // 마지막 클릭한 날짜 초기화
      } else {
        fetchDayData(year, month, day); // 홀수 번째 클릭 시 데이터 갱신
      }
    } else {
      // 다른 날짜를 클릭했을 때
      lastClickedDate = `${year}-${month + 1}-${day}`;
      clickCount = 1; // 클릭 횟수 초기화
      fetchDayData(year, month, day); // 데이터 가져오기
    }

    function getAllIncident() {
      console.log("데이터 가져오기 시작");
      $.ajax({
        url: "/allinsident",
        type: "Post",
        success: printList,
        error: function () {
          alert("통신 실패");
        },
      });
    }

    // 데이터 출력 함수
    function printList(data) {
      var code = "";
      // code += "<h2> "+ `${year}-${month + 1}-${day}` + "</h2>";
      for (var i = 0; i < data.length; i++) {
        var date = data[i].year + "-" + data[i].month + "-" + data[i].day;
        console.log(date);
        if (date == `${year}-${month + 1}-${day}`) {
          // 영상 이름 처리
          var fullName = data[i].incidentName; // 예: "1733573900572_recorded-video.webm"
          var nameParts = fullName.split("_"); // "_"을 기준으로 나누기
          var newName = nameParts.length > 1 ? nameParts[1] : fullName; // 이름 변환
          newName = newName.replace(/^\d+_/, ""); // 숫자와 밑줄 제거
          newName = newName.replace("recorded-", ""); // 'recorded-' 제거

          var createdAt = new Date(data[i].createdAt);
          var formattedTime = createdAt.toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false, // 24시간 형식
          });

          code += "<tr style='background-color: #f9f9f9;'>";
          code += "<td>" + i + "</td>";
          code +=
            "<td class='video_name'  data-incident-idx='" +
            data[i].incidentIdx +
            "' style='cursor: pointer;'>" +
            data[i].year +
            data[i].month +
            data[i].day +
            "_" +
            newName +
            "</td>";
          code += "<td>" + data[i].cameraIdx + "</td>";
          code += "<td>" + formattedTime + "</td>";
          code += "</tr>";
        }
      }
      $("#list").html(code); // tbody에 새 코드 삽입

      // 클릭 이벤트 추가
      $(".video_name").on("click", function () {
        var incidentIdx = $(this).data("incident-idx"); // data-incident-idx 속성 값 가져오기
        console.log(incidentIdx); // 콘솔에 incidentIdx 출력
        fetchVideoPath(incidentIdx); // 비디오 경로를 가져오는 함수 호출
      });
    }

    // 비디오 경로를 서버에서 가져오는 함수
    function fetchVideoPath(incidentIdx) {
      $.ajax({
        url: "/getVideoPath",
        type: "POST",
        data: { incidentIdx: incidentIdx },
        success: function (response) {
          console.log("서버 응답:", response);
          console.log(response.videoPath);

          // 파일 경로에서 파일 이름만 추출 (예: '1733573900572_recorded-video.webm')
          const fileName = response.videoPath.split("\\").pop();
          const webPath = `/videos/${fileName}`; // 적절한 웹 경로 생성

          console.log("웹 경로:", webPath); // 디버그용 로그
          showVideoModal(webPath); // 웹 경로로 비디오 표시
        },
        error: function () {
          alert("비디오 경로를 가져오는 데 실패했습니다.");
        },
      });
    }

    function showVideoModal(incidentPath) {
      console.log(incidentPath); // 디버그용 로그

      // 비디오 컨텐츠 HTML 생성
      var modalContent = `
          <div class="video-container">
              <video id="video-player" controls width="600">
                  <source id="video-source" src="${incidentPath}" type="video/webm">
                  Your browser does not support the video tag.
              </video>
          </div>
      `;

      // 모달 컨텐츠 삽입
      $("#secondary-modal-video .modal-contents").html(modalContent);
      console.log($("#secondary-modal-video .modal-contents").html()); // 삽입된 내용 확인

      // 모달 표시
      $("#secondary-modal-video").removeClass("hidden").addClass("fade-in");
      console.log("모달 표시됨"); // 디버그용 로그
    }
  }
  // 외부 클릭 시 모달 닫기
  $(document).on("click", function (e) {
    if (!$(e.target).closest("#secondary-modal-video").length) {
      $("#secondary-modal-video").addClass("hidden").removeClass("fade-in");
      $("#video-player")[0].pause(); // 비디오 멈춤
      console.log("외부 클릭으로 모달 닫힘");
    }
  });

  document.addEventListener("keydown", async (event) => {
    if (
      event.key === "Escape" &&
      event.target.closest("#secondary-modal-video")
    ) {
      $("#secondary-modal-video").addClass("hidden").removeClass("fade-in");
      $("#video-player")[0].pause(); // 비디오 멈춤
      console.log("비디오가 종료되었습니다.");
    }
  });

  // 모달 닫기 버튼 클릭 시 닫기
  $(".close-secondary-modals").on("click", function () {
    $("#secondary-modal-video").addClass("hidden").removeClass("fade-in");
    $("#video-player")[0].pause(); // 비디오 멈춤
    console.log("모달 닫기 버튼 클릭됨");
  });

  // 초기 달력 렌더링
  renderCalendar();
});

/*
document.addEventListener("DOMContentLoaded", () => {
  const calendarDays = document.querySelector(".calendar-days");
  const modal = document.getElementById("secondary-modal");
  const closeModalButton = document.querySelector(".close-secondary-modal");
  const listContainer = document.getElementById("list");
  const modalTitle = document.getElementById("modal-title");
  const currentMonthElement = document.getElementById("current-month");
  const prevMonthButton = document.getElementById("prev-month");
  const nextMonthButton = document.getElementById("next-month");

  let currentYear = 2024;
  let currentMonth = 11;
  let lastClickedDate = null;
  let clickCount = 0;

  // 달력을 렌더링하는 함수
  function renderCalendar() {
    calendarDays.innerHTML = "";
    currentMonthElement.textContent = `${currentYear}년 ${currentMonth + 1}월`;

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let dayOfWeek = firstDayOfMonth;
    let row = document.createElement("tr");

    for (let i = 0; i < dayOfWeek; i++) {
      const emptyCell = document.createElement("td");
      row.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement("td");
      cell.textContent = day;
      if (dayOfWeek % 7 === 0) cell.classList.add("weekend");
      if (dayOfWeek % 7 === 6) cell.classList.add("saturday");

      cell.addEventListener("click", () =>
        handleDateClick(currentYear, currentMonth, day)
      );
      row.appendChild(cell);
      dayOfWeek++;

      if (dayOfWeek % 7 === 0) {
        calendarDays.appendChild(row);
        row = document.createElement("tr");
      }
    }

    if (row.children.length > 0) calendarDays.appendChild(row);
  }

  prevMonthButton.addEventListener("click", () => {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    renderCalendar();
  });

  nextMonthButton.addEventListener("click", () => {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    renderCalendar();
  });



  function hideModal() {
    modal.classList.add("hidden");
    modal.classList.remove("fade-in");
  }

  async function fetchIncidentData() {
    try {
      const response = await fetch("/allinsident", { method: "POST" });
      if (!response.ok) throw new Error("데이터 로드 실패");
      const data = await response.json();
      updateTable(data);
    } catch (error) {
      console.error("에러 발생:", error.message);
    }
  }

  function updateTable(data) {
    let tableRows = "";
    data.forEach((incident, index) => {
      const formattedDate = new Date(incident.createdAt).toLocaleString(
        "ko-KR",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }
      );

      tableRows += `
        <tr class="content">
          <td>${index + 1}</td>
          <td class="video_name" data-incident-idx="${
            incident.incidentIdx
          }" style="cursor: pointer;">
            ${incident.incidentName}
          </td>
          <td>${incident.cameraIdx}</td>
          <td>${formattedDate}</td>
        </tr>`;
    });
    listContainer.innerHTML = tableRows;

    document.querySelectorAll(".video_name").forEach((element) => {
      element.addEventListener("click", () => {
        const incidentIdx = element.dataset.incidentIdx;
        fetchVideoPath(incidentIdx);
      });
    });
  }

  async function fetchVideoPath(incidentIdx) {
    try {
      const response = await fetch("/getVideoPath", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incidentIdx }),
      });

      if (!response.ok) throw new Error("비디오 경로 로드 실패");
      const { videoPath } = await response.json();
      showVideoModal(videoPath);
    } catch (error) {
      console.error("비디오 경로 에러:", error.message);
    }
  }

  function showVideoModal(videoPath) {
    const modalContent = `
      <div class="video-container">
        <video id="video-player" controls width="600">
          <source src="${videoPath}" type="video/webm" />
          브라우저가 비디오 태그를 지원하지 않습니다.
        </video>
      </div>`;
    document.querySelector("#secondary-modal-video .modal-contents").innerHTML =
      modalContent;
    document.querySelector("#secondary-modal-video").classList.remove("hidden");
  }

  closeModalButton.addEventListener("click", hideModal);
  renderCalendar();
});
*/

// ===============================================================

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal"); // 기존 모달
  const secondaryModal = document.getElementById("secondary-modal"); // 두 번째 모달
  const closeSecondaryModalButton = document.querySelector(
    ".close-secondary-modal"
	
  ); // 두 번째 모달 닫기 버튼

  // 기존 모달을 클릭하면 두 번째 모달 열기
  modal.addEventListener("click", () => {
    if (!modal.classList.contains("hidden")) {
      secondaryModal.classList.remove("hidden");
    }
  });

  // 두 번째 모달 외부 클릭 시 닫기
  secondaryModal.addEventListener("click", (event) => {
    if (event.target === secondaryModal) {
      secondaryModal.classList.add("hidden");
    }
  });
});

// ===============================================================
// document.addEventListener("DOMContentLoaded", () => {
//   const calendarDays = document.querySelector(".calendar-days"); // 날짜를 표시할 tbody
//   const modal = document.getElementById("modal"); // 모달 창
//   const modalDate = document.getElementById("modal-date"); // 모달에 날짜를 표시할 요소
//   const modalData = document.getElementById("modal-data"); // 모달에 데이터를 표시할 요소
//   const currentMonthElement = document.getElementById("current-month"); // 현재 월 표시 요소
//   const prevMonthButton = document.getElementById("prev-month"); // 이전 달 버튼
//   const nextMonthButton = document.getElementById("next-month"); // 다음 달 버튼

//   let currentYear = 2024; // 초기 연도
//   let currentMonth = 11; // 초기 월 (0: 1월, 11: 12월)
//   let lastClickedDate = null; // 마지막으로 클릭한 날짜 저장
//   let clickCount = 0; // 클릭 횟수 저장

//   // 모달을 표시하는 함수 (애니메이션 포함)
//   function showModal() {
//     modal.classList.remove("hidden"); // 모달을 표시 (display: block)
//     modal.classList.add("fade-in"); // 부드러운 등장 애니메이션 추가
//     modal.classList.remove("fade-out"); // 사라짐 애니메이션 제거
//   }

//   // 모달을 숨기는 함수 (애니메이션 포함)
//   function hideModal() {
//     modal.classList.add("fade-out"); // 부드러운 사라짐 애니메이션 추가
//     modal.classList.remove("fade-in"); // 등장 애니메이션 제거
//     // 애니메이션 종료 후 숨기기
//     setTimeout(() => {
//       modal.classList.add("hidden"); // display: none 설정
//     }, 300); // CSS 애니메이션 지속 시간 (300ms)과 동일
//   }

//   // 날짜별 데이터를 서버에서 받아오는 함수 (백엔드 API 호출)
//   async function fetchDayData(year, month, day) {
//     try {
//       // 서버에 데이터 요청
//       const response = await fetch(`/api/calendar/${year}/${month + 1}/${day}`);
//       if (!response.ok) throw new Error("데이터를 찾을 수 없습니다.");

//       // 응답 데이터 가져오기
//       const data = await response.json();

//       // 모달에 데이터 표시
//       modalDate.textContent = `${year}년 ${month + 1}월 ${day}일`;
//       modalData.textContent = data.details || "데이터가 없습니다.";
//       showModal(); // 모달 표시
//     } catch (error) {
//       modalDate.textContent = `${year}년 ${month + 1}월 ${day}일`;
//       modalData.textContent = error.message; // 오류 메시지 표시
//       showModal(); // 모달 표시
//     }
//   }

//   // 모달 닫기 이벤트 등록
//   document.querySelector(".close-modal").addEventListener("click", () => {
//     hideModal(); // 모달 숨기기
//     lastClickedDate = null; // 마지막 클릭한 날짜 초기화
//     clickCount = 0; // 클릭 횟수 초기화
//   });

//   // 날짜 클릭 처리 함수
//   function handleDateClick(year, month, day) {
//     if (lastClickedDate === `${year}-${month + 1}-${day}`) {
//       // 같은 날짜를 클릭했을 때
//       clickCount++;
//       if (clickCount % 2 === 0) {
//         hideModal(); // 짝수 번째 클릭 시 모달 닫기
//         lastClickedDate = null; // 마지막 클릭한 날짜 초기화
//       } else {
//         fetchDayData(year, month, day); // 홀수 번째 클릭 시 데이터 갱신
//       }
//     } else {
//       // 다른 날짜를 클릭했을 때
//       lastClickedDate = `${year}-${month + 1}-${day}`;
//       clickCount = 1; // 클릭 횟수 초기화
//       fetchDayData(year, month, day); // 데이터 가져오기
//     }
//   }

//   // 달력을 동적으로 렌더링하는 함수
//   function renderCalendar() {
//     // 달력 클리어
//     calendarDays.innerHTML = "";

//     // 현재 월 및 연도 업데이트
//     currentMonthElement.textContent = `${currentYear}년 ${currentMonth + 1}월`;

//     // 현재 월의 첫 번째 날과 마지막 날 계산
//     const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//     let dayOfWeek = firstDayOfMonth; // 첫 번째 요일
//     let row = document.createElement("tr"); // 주 단위 행 생성

//     // 첫째 주 빈 칸 생성
//     for (let i = 0; i < dayOfWeek; i++) {
//       const emptyCell = document.createElement("td");
//       row.appendChild(emptyCell);
//     }

//     // 날짜 셀 생성
//     for (let day = 1; day <= daysInMonth; day++) {
//       const cell = document.createElement("td");
//       cell.textContent = day;

//       // 일요일, 토요일 스타일 추가
//       if (dayOfWeek % 7 === 0) {
//         cell.classList.add("weekend");
//       } else if (dayOfWeek % 7 === 6) {
//         cell.classList.add("saturday");
//       }

//       // 날짜 클릭 이벤트 등록
//       cell.addEventListener("click", () => {
//         handleDateClick(currentYear, currentMonth, day);
//       });

//       row.appendChild(cell);
//       dayOfWeek++;

//       // 주 단위로 행 추가
//       if (dayOfWeek % 7 === 0) {
//         calendarDays.appendChild(row);
//         row = document.createElement("tr");
//       }
//     }

//     // 마지막 행 추가
//     if (row.children.length > 0) {
//       calendarDays.appendChild(row);
//     }
//   }

//   // 이전 달로 변경
//   prevMonthButton.addEventListener("click", () => {
//     if (currentMonth === 0) {
//       currentMonth = 11;
//       currentYear--;
//     } else {
//       currentMonth--;
//     }
//     renderCalendar(); // 달력 다시 렌더링
//   });

//   // 다음 달로 변경
//   nextMonthButton.addEventListener("click", () => {
//     if (currentMonth === 11) {
//       currentMonth = 0;
//       currentYear++;
//     } else {
//       currentMonth++;
//     }
//     renderCalendar(); // 달력 다시 렌더링
//   });

//   // 초기 달력 렌더링
//   renderCalendar();
// });