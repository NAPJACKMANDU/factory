document.addEventListener("DOMContentLoaded", () => {
  // 초기화 코드와 이벤트 리스너들을 한 곳에 넣기
  const calendarDays = document.querySelector(".calendar-days");
  const modal = document.getElementById("modal");
  const modalDate = document.getElementById("modal-date");
  const modalData = document.getElementById("modal-data");
  const currentMonthElement = document.getElementById("current-month");
  const prevMonthButton = document.getElementById("prev-month");
  const nextMonthButton = document.getElementById("next-month");

  let currentYear = 2024;
  let currentMonth = 11;
  let lastClickedDate = null;
  let clickCount = 0;

  function showModal() {
    modal.classList.remove("hidden");
    modal.classList.add("fade-in");
    modal.classList.remove("fade-out");
  }

  function hideModal() {
    modal.classList.add("fade-out");
    modal.classList.remove("fade-in");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  }

  async function fetchDayData(year, month, day) {
    try {
      if (year === 2024 && month === 11 && day === 6) {
        modalDate.textContent = `${year}년 ${month + 1}월 ${day}일`;
        modalData.textContent = "총 3건의 데이터가 조회 되었습니다.";
        showModal();
        return;
      }

      const requestBody = {
        year: year,
        month: month + 1,
        day: day
      };

      const response = await fetch("/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) throw new Error("데이터를 찾을 수 없습니다.");

      const data = await response.json();
      modalDate.textContent = `${year}년 ${month + 1}월 ${day}일`;
      modalData.textContent = data.details || "데이터가 없습니다.";
      showModal();
    } catch (error) {
      modalDate.textContent = `${year}년 ${month + 1}월 ${day}일`;
      modalData.textContent = error.message;
      showModal();
    }
  }

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

      if (dayOfWeek % 7 === 0) {
        cell.classList.add("weekend");
      } else if (dayOfWeek % 7 === 6) {
        cell.classList.add("saturday");
      }

      cell.addEventListener("click", () => {
        handleDateClick(currentYear, currentMonth, day);
      });

      row.appendChild(cell);
      dayOfWeek++;

      if (dayOfWeek % 7 === 0) {
        calendarDays.appendChild(row);
        row = document.createElement("tr");
      }
    }

    if (row.children.length > 0) {
      calendarDays.appendChild(row);
    }
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

  renderCalendar();
});
