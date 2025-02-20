import "./styles.css";
import * as icon from "./img/images";

const API_KEY = "V95FANYRGWCKFGZNYXGJFVZJE";

const mainBlock = document.querySelector(".main-block");

async function callAPI(city, callback) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}`,
      { mode: `cors` }
    );

    const weatherData = await response.json();
    callback(weatherData);
    return weatherData;
  } catch (error) {
    const errorLog = document.createElement("p");
    errorLog.textContent = "City was not found, please try again.";
    mainBlock.append(errorLog);
  }
}

function logWeather(data) {
  console.log(data);
}

// write a separate weather check. Pass response.currentConditions.conditions
function conditionCheck(data) {
  const lowercase = data.toLowerCase();
  if (lowercase.includes("cloud") || lowercase.includes("overcast")) {
    return icon.cloud;
  } else if (lowercase.includes("rain")) {
    return icon.rainy;
  } else if (lowercase.includes("snow")) {
    return icon.snowy;
  } else if (lowercase.includes("clear")) {
    return icon.partly_cloudy;
  } else if (lowercase.includes("fog")) {
    return icon.foggy;
  } else {
    return icon.thunderstorm;
  }
}

const renderDOM = (function () {
  const header = (responseJSON) => {
    const head = document.createElement("h1");
    head.textContent = responseJSON.resolvedAddress;

    return head;
  };
  const image = (responseJSON) => {
    const imageWeather = document.createElement("img");
    imageWeather.src = conditionCheck(
      responseJSON.currentConditions.conditions
    );
    return imageWeather;
  };

  const conditions = (responseJSON) => {
    const conditionBlock = document.querySelector(".conditions");
  };
  return { header, image };
})();

async function render(cityName) {
  const data = await callAPI(cityName, logWeather);

  mainBlock.append(renderDOM.header(data), renderDOM.image(data));
}

render("kyiv");

const submit = document.querySelector("#submit");

submit.addEventListener("click", (event) => {
  event.preventDefault();
  const search = document.querySelector("#search");
});
