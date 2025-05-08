import { companyHolidays } from './holidays-data.js';

const daysContainer = document.querySelector(".days"),
nextBtn = document.querySelector(".next-btn"),
prevBtn = document.querySelector(".prev-btn"),
month = document.querySelector(".month");
const reasonBox = document.querySelector('.reason');
const dateElement = reasonBox.querySelector('.date'); 
const causeElement = reasonBox.querySelector('.cause'); 

const months = [
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

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const date = new Date();

let currentMonth = date.getMonth();

let currentYear = date.getFullYear();

function renderCalendar() {
    date.setDate(1);
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1;

    month.innerHTML = `${months[currentMonth]} ${currentYear}`; 

    let days = "";

    for (let x = firstDay.getDay(); x > 0; x--) {
        days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`; 
    }

    for (let i = 1; i <= lastDayDate; i++) {
        const currentDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        let dayClass = "day";

        if (
            i === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()
        ) {
            dayClass += " today"; 

            const holiday = companyHolidays.find(holiday => holiday.date === currentDate);
            if (holiday) {
                dateElement.textContent = currentDate; 
                causeElement.textContent = holiday.name; 
                reasonBox.style.display = 'block'; 
            } else { 
                dateElement.textContent = currentDate;
                causeElement.textContent = "~~No events declared~~";
                reasonBox.style.display = 'block'; 
            }
        }

        const holiday = companyHolidays.find(holiday => holiday.date === currentDate);
        if (holiday) {
            dayClass += ` ${holiday.type}`; 
        }

        days += `<div class="${dayClass}" data-date="${currentDate}">${i}</div>`; 
    }

    for(let j = 1; j <= nextDays; j++){
        days += `<div class="day next">${j}</div>`;
    }

    hideTodayBtn();
    daysContainer.innerHTML = days;

    const dayElements = document.querySelectorAll('.day'); 
    const closeButton = reasonBox.querySelector('.x-btn'); 

    dayElements.forEach(dayElement => {
        dayElement.addEventListener('click', () => {
            const clickedDate = dayElement.dataset.date;
            const holiday = companyHolidays.find(holiday => holiday.date === clickedDate);

            if (holiday) {
                dateElement.textContent = clickedDate; 
                causeElement.textContent = holiday.name; 
                reasonBox.style.display = 'block'; 
            } else {
                dateElement.textContent = clickedDate;
                causeElement.textContent = "~~No events declared~~";
                reasonBox.style.display = 'block'; 
            }
        });
    });

    closeButton.addEventListener('click', () => {
        reasonBox.style.display = 'none'; 
    });
}
    

renderCalendar();

nextBtn.addEventListener("click", () => {
    currentMonth++;
    if(currentMonth > 11){
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar();
});

prevBtn.addEventListener("click", () => {
    currentMonth--;
    if(currentMonth < 0){
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

document.querySelector(".today-btn").addEventListener("click", () => {
    date.setDate(new Date().getDate());
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    renderCalendar();
});

function hideTodayBtn() {
    if(
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear()
    ) {
        document.querySelector(".today-btn").style.display = "none";
    }else{
        document.querySelector(".today-btn").style.display = "flex";
    }
}

// Splash screen logic
window.addEventListener('load', function() {
    const skeletonLoader = document.querySelector('.skeleton-loader');
    const realContent = document.querySelectorAll('.calender > *:not(.skeleton-loader)');

    function hideSkeletonLoader() {
        skeletonLoader.style.display = 'none';
        realContent.forEach(element => {
            element.style.visibility = 'visible';
        });
    }

    // KEY CHANGE: Call setTimeout for hideSkeletonLoader WITHIN the splash screen timeout
    setTimeout(function() {
        renderCalendar(); // Render the calendar
        setTimeout(hideSkeletonLoader, 1000); // Delay of 2 seconds (2000 milliseconds) *after* rendering
    }, 5000); // This 5000ms matches the splash screen delay

  
    // ... (Rest of your JS code -  calendar navigation listeners, etc. - unchanged)...

  // ... existing code ...

// ... existing JavaScript code ...



// Assuming you have a close button with the ID 'close2024Container'
// ... (Existing code in script.js) ...

// ... (Existing code in script.js) ...

// ... (Existing code in script.js) ...

const link2024 = document.getElementById('link2024');
const link2023 = document.getElementById('link2023');
const calendar2024Container = document.getElementById('calendar2024Container');
const calendar2023Container = document.getElementById('calendar2023Container');
const close2024Container = document.getElementById('close2024Container'); 
const close2023Container = document.getElementById('close2023Container'); 
const navBar = document.querySelector('nav'); // Select the navigation bar

link2024.addEventListener('click', () => {
  navBar.style.display = 'none'; // Hide the navigation bar
  calendar2024Container.style.display = 'flex'; 
});

link2023.addEventListener('click', () => {
  navBar.style.display = 'none'; // Hide the navigation bar
  calendar2023Container.style.display = 'flex'; 
});

close2024Container.addEventListener('click', () => {
  calendar2024Container.style.display = 'none'; 
  navBar.style.display = 'flex'; // Show the navigation bar again
});

close2023Container.addEventListener('click', () => {
  calendar2023Container.style.display = 'none'; 
  navBar.style.display = 'flex'; // Show the navigation bar again
});

// ... (Rest of the code in script.js) ...
// ... (Rest of the code in script.js) ...



});


