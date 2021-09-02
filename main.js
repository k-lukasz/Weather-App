// Select elements
const form = document.querySelector('form');
const input = document.querySelector("input[type=text]");
const submitBtn = document.querySelector('.submit-btn');
const errorMsg = document.querySelector('.error-msg');
// SELECT ELEMENTS
const notificationElement = document.querySelector('.notification');
const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');

form.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('click', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    fetchWeather();
}

// App Constants and vars
const KELVIN = 273;
// API Key
const key = "f9e92bec5ea7bcfa1a50eb97f99a8dab";

// Get weather from API provider
async function getWeatherData(location) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`, {
            mode: 'cors',
        }
    );
    if (response.status === 400) {
        errorMsg.style.display = 'block';
    } else {
        errorMsg.style.display = 'none';
        const weatherData = await response.json();
        const newData = processData(weatherData);
        displayData(newData);
        reset();
    }
}

function processData(weatherData) {
    // grab all the data i want to display on the page
    const myData = {
        temperature: {
            value: Math.floor(weatherData.main.temp - KELVIN),
            unit: "celsius"
        },
        description: weatherData.weather[0].description,
        iconId: weatherData.weather[0].icon,
        city: weatherData.name,
        country: weatherData.sys.country
    }
    return myData;
}

function displayData(newData) {
    iconElement.innerHTML = `<img src="icons/${newData.iconId}.png"/>`;
    tempElement.innerHTML = `${newData.temperature.value}°<span>C</span>`;
    descElement.innerHTML = newData.description;
    locationElement.innerHTML = `${newData.city}, ${newData.country}`;
}


function reset() {
    form.reset();
}

// get location from user's input
function fetchWeather() {
    const input = document.querySelector("input[type=text]");
    const userLocation = input.value;
    getWeatherData(userLocation);
}