import "./styles.css";
import * as icon from "./img/images";

const API_KEY = "V95FANYRGWCKFGZNYXGJFVZJE";

const mainBlock = document.querySelector(".main-block");
const rainImg = document.createElement("img");
rainImg.src = icon.foggy;

mainBlock.append(rainImg);

async function callAPI(city, callback) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}`,
    { mode: `cors` }
  );

  const weatherData = await response.json();
  callback(weatherData);
  return weatherData;
}

function logWeather(data) {
  console.log(data);
}

// write a separate weather check

const renderDOM = (function () {
  const header = (responseJSON) => {
    const head = document.createElement("h1");
    head.textContent = responseJSON.resolvedAddress;

    mainBlock.append(head);
  };

  return { header };
})();

async function render() {
  const data = await callAPI("London", logWeather);
  renderDOM.header(data);
}

render(callAPI("London", logWeather));

const submit = document.querySelector("#submit");

submit.addEventListener("click", (event) => {
  event.preventDefault();
  
});
