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
  console.log(weatherData);
  return weatherData;
}

callAPI("London");
