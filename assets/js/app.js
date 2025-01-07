const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");
const convertor = document.querySelector(".convert-shamsi-miladi");
const dayItems = document.querySelectorAll(".days-item");

const miladiMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const shamsiMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const shamsiWeekDays = ["ج", "پ", "چ", "س", "د", "ی", "ش"];
const miladiWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let isShamsi = false;

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();


// Function to format the date to Persian (Shamsi) format
const getPersianDate = (date) => {
  let newDate = moment(date);
  let year = newDate.jYear();
  let month = shamsiMonths[newDate.jMonth()];
  let day = newDate.jDate();

  return `${day} ${month} ${year}`;
};

function renderCalendar() {
  let start, endDate, endDatePrev;
  let headerText = "";

  if (isShamsi) {
    const shamsiDate = getPersianDate(date); // Use getPersianDate to get formatted Persian date

    // Extract Shamsi year, month, and day
    const shamsiDateParts = shamsiDate.split(" ");
    const shamsiDay = Number(shamsiDateParts[0]);
    const shamsiMonth = shamsiMonths.indexOf(shamsiDateParts[1]);
    const shamsiYear = Number(shamsiDateParts[2]);

    start = new Date(year, month, 1).getDay();
    endDate = new Date(year, month + 1, 0).getDate();
    endDatePrev = new Date(year, month, 0).getDate();
    headerText = `${shamsiMonths[shamsiMonth]} ${shamsiYear}`;

    // Update the week days to Persian for Shamsi calendar
    dayItems.forEach((item, index) => {
      item.textContent = shamsiWeekDays[index];
    });
  } else {
    start = new Date(year, month, 1).getDay();
    endDate = new Date(year, month + 1, 0).getDate();
    endDatePrev = new Date(year, month, 0).getDate();
    headerText = `${miladiMonths[month]} ${year}`;

    // Update the week days to Latin for Gregorian calendar
    dayItems.forEach((item, index) => {
      item.textContent = miladiWeekDays[index];
    });
  }

  header.textContent = headerText;

  let datesHtml = "";

  // Render the previous month's inactive days
  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  // Render the current month's days
  for (let i = 1; i <= endDate; i++) {
    let className =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? ' class="today"'
        : "";
    datesHtml += `<li${className}>${i}</li>`;
  }

  // Render the next month's inactive days
  const remainingDays = 6 - ((start + endDate) % 7);
  for (let i = 1; i <= remainingDays; i++) {
    datesHtml += `<li class="inactive">${i}</li>`;
  }

  dates.innerHTML = datesHtml;
}

// Switch between Shamsi and Miladi
convertor.addEventListener("click", () => {
  isShamsi = !isShamsi;
  renderCalendar();
});

// Navigation between months
navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
  });
});

// Initialize the calendar
renderCalendar();
