// Add your API key from the following App
// ********************************************************************************************************

const API_KEY = `03710a788f15ce2cd7157c0937739f91`;

// ********************************************************************************************************



const searchBtn = document.querySelector('#submitBtn');
const input = document.querySelector('#cityNameInput');
const cityName = document.querySelector('#cityName');
const temp = document.querySelector('#temp');
const temp_status = document.querySelector('.temp_status');
const dataHide = document.querySelector('.middle_Layer');
let day = document.querySelector('#day');
let today_date = document.querySelector('#today_date');
const getCurrentDay = () =>{
    let weekDay = new Array(7);
    weekDay[0] = "Sunday";
    weekDay[1] = "Monday";
    weekDay[2] = "Tuesday";
    weekDay[3] = "Wednesday";
    weekDay[4] = "Thursday";
    weekDay[5] = "Friday";
    weekDay[6] = "Saturday";

    let currentDay = new Date().getDay();
    day.innerText = weekDay[currentDay];
}

const getCurrentMonth = () =>{
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let currentMonth = new Date().getMonth();
    let monthName = month[currentMonth];
    let currentDate = new Date().getDate();
    today_date.innerText = `${currentDate}  ${monthName}`;
}

const getInfo = async (event)=>{
    event.preventDefault();
    let cityVal = input.value;
    if(cityVal === ""){
        cityName.innerText = `Please write the city name before search`;
        dataHide.classList.add('data_Hide');
    }else{
        try {
            let url= `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            cityName.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;
            if(tempMood == "Clear"){
                temp_status.innerHTML = `<i class="fas fa-sun" style="color:#eccc68;"></i>`;
            }
            else if(tempMood == "Clouds"){
                temp_status.innerHTML = `<i class="fas fa-cloud" style="color:#f1f2f6;"></i>`;
            }
            else if(tempMood == "Rain"){
                temp_status.innerHTML = `<i class="fas fa-cloud-rain" style="color:#a4b0be;"></i>`;
            }
            else{
                temp_status.innerHTML = `<i class="fas fa-cloud" style="color:#f1f2f6;"></i>`;
            }

            dataHide.classList.remove('data_Hide');

            console.log(arrData);
        } catch{
            cityName.innerText = `Please enter the city name properly`;
            dataHide.classList.add('data_Hide');
        }
    }
};

getCurrentDay();
getCurrentMonth();
searchBtn.addEventListener('click',getInfo);