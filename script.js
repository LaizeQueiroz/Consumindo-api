const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const weatherInfoSection= document.querySelector(".weather-info");
const notFoundSection= document.querySelector(".not-found");
const countryTxt= document.querySelector(".country-txt");
const cityTxt= document.querySelector(".city-txt");
const tempTxt= document.querySelector(".temp-txt");
const conditionTxt= document.querySelector(".condition-txt");
const humidityValueTxt= document.querySelector(".humidity-value-txt");
const windValueTxt= document.querySelector(".wind-value-txt");
const weatherSummaryImg = document.querySelector(".weather-summary-img");
const currentDateTxt = document.querySelector(".current-date-txt");

const searchCitySection= document.querySelector(".search-city");

const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';


const getWeatherData = async (city) => {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
   
    if(response.status == 404){
        notFoundSection.style.display = "block"; 
        weatherInfoSection.style.display = "none";
    }
    
    else{
        return(data);
    }
    
}

const showWeatherData = async (city) =>{
    const data = await getWeatherData(city);

       countryTxt.textContent = data.name + ',';
       cityTxt.textContent = data.sys.country;
       tempTxt.textContent = parseInt(data.main.temp) + '°C';
       conditionTxt.textContent = data.weather[0].description;
       humidityValueTxt.textContent = data.main.humidity + ' %';
       windValueTxt.textContent = data.wind.speed + ' km/h';
       currentDateTxt.textContent = getCurrentDate();

       weatherSummaryImg.setAttribute( "src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png` );
       
       weatherInfoSection.style.display = "block"; 
       notFoundSection.style.display = "none"; 
}

function getCurrentDate(){
    const currentDate = new Date();
    const options = {
        weekday:'long',
        day:'2-digit',
        month: 'long'
    }
    return currentDate.toLocaleDateString('pt-GB', options);
}



searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    showWeatherData(cityInput.value);

});
