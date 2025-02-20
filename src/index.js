import "./styles.css";
import * as icon from "./img/images";

const mainBlock = document.querySelector(".main-block");

const rainImg = document.createElement("img");
rainImg.src = icon.foggy;

mainBlock.append(rainImg);
