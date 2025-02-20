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
    imageWeather.src = conditionCheck(responseJSON.conditions);
    return imageWeather;
  };

  const conditions = (responseJSON) => {
    const conditionBlock = document.createElement("div");
    conditionBlock.classList.add("conditions");

    const conditionName = document.createElement("h3");
    const temperature = document.createElement("h3");

    conditionName.textContent = responseJSON.conditions;
    temperature.textContent = `Temp: ${responseJSON.temp}`;

    conditionBlock.append(conditionName, temperature);

    return conditionBlock;
  };

  const description = (responseJSON) => {
    const desc = document.createElement("p");
    desc.classList.add("description");
    desc.textContent = responseJSON.description;

    return desc;
  };
  return { header, image, conditions, description };
})();

const render = (function () {
  const main = (data) => {
    mainBlock.append(
      renderDOM.image(data.currentConditions),
      renderDOM.header(data),
      renderDOM.conditions(data.currentConditions),
      renderDOM.description(data)
    );
  };
  const secondary = (data, dayCount) => {
    const sideBlock = document.querySelector(".side-block");
    sideBlock.innerHTML = "";
    for (let i = 1; i <= dayCount; i++) {
      const entryBlock = document.createElement("div");
      entryBlock.classList.add("secondary-entry");

      let image = renderDOM.image(data.days[i]);
      let condition = renderDOM.conditions(data.days[i]);

      entryBlock.append(image, condition);

      sideBlock.append(entryBlock);
    }
  };
  return { main, secondary };
})();

async function initialize() {
  const data = await callAPI("Kyiv", logWeather);
  render.main(data);
  render.secondary(data, 4);
}

initialize();

const submit = document.querySelector("#submit");

submit.addEventListener("click", (event) => {
  event.preventDefault();
  const search = document.querySelector("#search");
});
