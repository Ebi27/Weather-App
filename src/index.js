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
function showF() {
  let valueF = document.querySelector(".temperature");
  valueF.innerHTML = "-3°F";
}
function showC() {
  let valueC = document.querySelector(".temperature");
  valueC.innerHTML = "-3°C";
}
let celsius = document.querySelector("#celsius");
let fahreneit = document.querySelector("#fahreneit");
fahreneit.addEventListener("click", showF);
celsius.addEventListener("click", showC);

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

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp); //Performing math operators to ound up the numbers gotten from temperature in the Arrays object.
  let temperatureElement = document.querySelector("#temperature"); //
  let description = document.querySelector(".text-secondary"); //Where the description will be displayed.
  let HumidityElement = document.querySelector("#Humidity"); //Where thecurrent weather humidity will be displayed
  let windElement = document.querySelector("#wind"); //Where the weather speed will be displayed
  temperatureElement.innerHTML = `${temperature}°C`; //Where the temperature of the requested city will be displayed.
  description.innerHTML = response.data.weather[0].description; //To get the current waeather description i.e snow showers, rainfall, broken-clouds.
  HumidityElement.innerHTML = response.data.main.humidity; //Getting the weather humidity that will be displayed
  windElement.innerHTML = Math.round(response.data.wind.speed); //Getting the weather speed that will be displayed and using a math operator to round it up.
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#button2");
currentButton.addEventListener("click", getPosition);
