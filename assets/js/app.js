const convertorDiv = document.querySelector(".convertor-container");
const monthYearElement = document.getElementById('month-year');
const daysElement = document.getElementById('days');
const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');
const weekDayDiv = document.querySelector(".weekday");
const weekDayContainer = document.querySelector(".days-of-week");

const miladiWeekDays = ["Sat","Sun","Mon","Tue","Wed","Thu","Fri"];

const shamsiWeekDays = ["ش","ی","د","س","چ","پ","ج"];

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
    "December"
  ];
  
const mod = (n, m) => ((n % m) + m) % m;

let dynamicDay = moment().locale('fa');

let today = moment().locale('fa');

let isShamsi = true;

// defualt values
monthYearElement.textContent = dynamicDay.format('jMMMM jYYYY');    

let weekdaysHtml = "";
convertorDiv.innerText = "تبدیل به میلادی";
shamsiWeekDays.map((item,index)=> {
    weekdaysHtml += `<div class="weekday">${item}</div>`;
})
weekDayContainer.innerHTML = weekdaysHtml;

let monthIndex;
let prevMiladiMonth;
let currentMiladiMonth;
let miladiYear;

// **************************************************************************

function renderCalendar() {
    let emptyDays;

    let todaySplitted = today.format("jDD jMM jYYYY").split(" ");

    monthIndex = (moment(`${dynamicDay.format('jYYYY')}-${dynamicDay.format('jMM')}-01`, "jYYYY-jMM-jDD")).format("MM");
    prevMiladiMonth = miladiMonths[mod(Number(monthIndex)-1,12)];
    currentMiladiMonth= miladiMonths[mod(Number(monthIndex),12)];
    miladiYear = (moment(`${dynamicDay.format('jYYYY')}-${dynamicDay.format('jMM')}-01`, "jYYYY-jMM-jDD")).format("YYYY");   

    if(isShamsi){
        monthYearElement.textContent = dynamicDay.format('jMMMM jYYYY');    
    }else{
        monthYearElement.textContent = `${prevMiladiMonth.slice(0,3)}-${currentMiladiMonth.slice(0,3)} ${miladiYear}`;
    }
    
    const firstDayOfMonth = dynamicDay.startOf('jMonth');
    const lastDayOfMonth = dynamicDay.endOf('jMonth');    
    const numberOfDays = lastDayOfMonth.date();

    if(dynamicDay.format('jMM') < 7 ){
        emptyDays = mod(firstDayOfMonth.day() - 1,7);

    }else{
        if(numberOfDays == 29){
            emptyDays = mod(firstDayOfMonth.day() + 1,7);

        }else{
            emptyDays = mod(firstDayOfMonth.day(),7);

        }
    }

    let daysHTML = '';

    for (let i = 0; i < emptyDays; i++) {
        daysHTML += '<div class="day no-color"></div>';
    }

    for (let day = 1; day <= numberOfDays; day++) {
        let thisDay = moment(`${dynamicDay.format('jYYYY')}-${dynamicDay.format('jMM')}-${day}`, "jYYYY-jMM-jDD");
        let miladiDay = thisDay.format("DD");
        
        let thidDaySplitted = `${day}-${thisDay.format('jMM')}-${thisDay.format('jYYYY')}`.split("-");

        

        if( (thidDaySplitted[0] == todaySplitted[0]) && (thidDaySplitted[1] == todaySplitted[1]) && (thidDaySplitted[2] == todaySplitted[2])){
            
            if(isShamsi){
                daysHTML += `<div class="day today">${+day}</div>`;
            }else{
                daysHTML += `<div class="day today">${+miladiDay}</div>`;
            }
    
        }else{

            if(isShamsi){
                if(mod(emptyDays+day-1,7) === 6){
                    daysHTML += `<div class="day off-day">${+day}</div>`
                }else{
                    daysHTML += `<div class="day">${+day}</div>`;
                }
            }else{
                if(mod(emptyDays+day-1,7) === 6){
                    daysHTML += `<div class="day off-day">${+miladiDay}</div>`
                }else{
                    daysHTML += `<div class="day">${+miladiDay}</div>`;
                }
            }        
        }
    }

    daysElement.innerHTML = daysHTML;
}

prevBtn.addEventListener('click', function() {
    dynamicDay.subtract(1, 'jMonth');
    renderCalendar();
});

nextBtn.addEventListener('click', function() {
    dynamicDay.add(1, 'jMonth');
    renderCalendar();
});

convertorDiv.addEventListener('click', function() {
    isShamsi = !isShamsi;
    let weekdaysHtml = "";
    if(isShamsi){
        convertorDiv.innerText = "تبدیل به میلادی";

        shamsiWeekDays.map((item,index)=> {
            weekdaysHtml += `<div class="weekday">${item}</div>`;
        })
        weekDayContainer.innerHTML = weekdaysHtml;

        monthYearElement.textContent = dynamicDay.format('jMMMM jYYYY');
            
    }else{
        convertorDiv.innerText = "تبدیل به شمسی";

        miladiWeekDays.map((item,index)=> {
            weekdaysHtml += `<div class="weekday">${item}</div>`;
        })
        weekDayContainer.innerHTML = weekdaysHtml;

        monthYearElement.textContent = `${prevMiladiMonth.slice(0,3)}-${currentMiladiMonth.slice(0,3)} ${miladiYear}`;
    }

    renderCalendar();
});

renderCalendar();

