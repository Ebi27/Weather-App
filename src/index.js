/* declaring the variables  to display the current date and time */
/******* Declaring current Day and date *******/
let today = new Date();
let day = today.getDay();
let daylist = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday ",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[today.getMonth()];
let actualDate = document.querySelector(".date");
actualDate.innerHTML = `${daylist[day]}, ${today.getDate()} ${month}`;

/******** declaring current time Variables *******/
let hour = today.getHours();
let minutes = today.getMinutes();
let actualTime = document.querySelector(".time");
if (minutes < 10) {
  actualTime.innerHTML = `${hour}:0${minutes}`;
} else {
  actualTime.innerHTML = `${hour}:${minutes}`;
}

/* Search Engine */
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inlineFormInput");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}
function searchCity(city) {
  //when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
  let apiKey = "d487935bcc828b8e96ad212476090dba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d487935bcc828b8e96ad212476090dba&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let input = document.querySelector("#search-form");
input.addEventListener("submit", search);

searchCity("krakow");

/* Converting  Celsius to Fahrenheit */
function displayFahreneitTemperature(event) {
  event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsius.classList.remove("active"); //removing active class to the celcius link
  let fahreneitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahreneitTemperature);
}
let celsiusTemperature=null;

function showCelsius() {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML= Math.round(celsiusTemperature);
  fahreneit.classList.remove("active"); //removing active class to the celsius link
}
let celsius = document.querySelector("#celsius");
let fahreneit = document.querySelector("#fahreneit");
fahreneit.addEventListener("click", displayFahreneitTemperature);
celsius.addEventListener("click", showCelsius);

// Geo-location
function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude; // created long and Lat variables, to create a cleaner apiURL
  let apikey = "d487935bcc828b8e96ad212476090dba"; // APi key from openweatherapp.com
  let units = "metric"; // So we have our temperature in metric, which is currently what we are familiar with.
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather"; // creating an endpoint for the URl
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=${units}`;
  console.log(apiUrl); //apiURL with which the details with be fetchd with.
  axios.get(apiUrl).then(showTemperature); //Calling the function with Axios
}
function formatDay(timestamp) { //To receive timestamp
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; //Day arrays to get value from
  return days[day];
}
//To display our forecast
function displayForecast(response) {
  let forecast= response.data.daily;
  let forecastElement = document.querySelector("#forecast"); //Selecting our element usinf document.querySelector
  let forecastHTML = `<div class="row">`; // Creating a loop and concatenating the string to the existing string
  forecast.forEach(function (forecastDay, index) { //To loop through the Array
     if (index < 6) { //So we get 6days 
    //Modifying the content of the forecast variable and adding the block of html code below
    forecastHTML =
      forecastHTML +
      `
                 <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="72"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
          }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  //Defining the function for coordinates
  console.log(coordinates); // To send the coordinates to the function, which gets the coordinates response from the api and gives us back the coordinate of the city
  let apikey = "d487935bcc828b8e96ad212476090dba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
} 
function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp); //Performing math operators to ound up the numbers gotten from temperature in the Arrays object.
  let temperatureElement = document.querySelector("#temperature"); //
  let description = document.querySelector(".text-secondary"); //Where the description will be displayed.
  let HumidityElement = document.querySelector("#Humidity"); //Where thecurrent weather humidity will be displayed
  let windElement = document.querySelector("#wind"); //Where the weather speed will be displayed
  let iconElement = document.querySelector(".icon");

  celsiusTemperature = response.data.main.temp; //declaring celsius which is a global variable.

  temperatureElement.innerHTML = `${temperature}`; //Where the temperature of the requested city will be displayed.
  description.innerHTML = response.data.weather[0].description; //To get the current waeather description i.e snow showers, rainfall, broken-clouds.
  HumidityElement.innerHTML = response.data.main.humidity; //Getting the weather humidity that will be displayed
  windElement.innerHTML = Math.round(response.data.wind.speed); //Getting the weather speed that will be displayed and using a math operator to round it up.
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);// Adding icons that match the weather
    iconElement.setAttribute("alt",response.data.weather[0].description);

  getForecast(response.data.coord); //To pull the coordinates
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#button2");
currentButton.addEventListener("click", getPosition);
