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

  // 날짜별 데이터를 서버에서 받아오는 함수 (백엔드 API 호출)
  async function fetchDayData(year, month, day) {
    try {
      // 11월 30일 클릭 시 특정 메시지 처리
      if (year === 2024 && month === 11 && day === 6) {
        modalDate.textContent = `${year}년 ${month + 1}월 ${day}일`;
        modalData.textContent = "총 3건의 데이터가 조회 되었습니다.";
        showModal();
        return;
      }

      // 서버에 데이터 요청
      const response = await fetch(`/api/calendar/${year}/${month + 1}/${day}`);
      if (!response.ok) throw new Error("데이터를 찾을 수 없습니다.");

      // 응답 데이터 가져오기
      const data = await response.json();

      // 모달에 데이터 표시
      modalDate.textContent = `${year}년 ${month + 1}월 ${day}일`;
      modalData.textContent = data.details || "데이터가 없습니다.";
      showModal(); // 모달 표시
    } catch (error) {
      modalDate.textContent = `${year}년 ${month + 1}월 ${day}일`;
      modalData.textContent = error.message; // 오류 메시지 표시
      showModal(); // 모달 표시
    }
  }

  // 모달 닫기 이벤트 등록
  document.querySelector(".close-modal").addEventListener("click", () => {
    hideModal(); // 모달 숨기기
    lastClickedDate = null; // 마지막 클릭한 날짜 초기화
    clickCount = 0; // 클릭 횟수 초기화
  });

  // 날짜 클릭 처리 함수
  function handleDateClick(year, month, day) {
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
  }

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

  // 초기 달력 렌더링
  renderCalendar();
});

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
