import "./style.css";
import { init } from "./ts/games/reaction_game";
import { check, setup } from "./ts/setup";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div class="setup">
        <h1>GAME CONFIG</h1>
        <form class="formWrapper">
        <!-- <div> -->
        <label>Ball speed (seconds)</label>
        <input class="ballSpeed" type="number" step="0.1" min="0"></input>
        <!-- </div> -->
        <!-- <div> -->
        <label>Ball number</label>
        <input class="ballNumber" type="number" step="1" ></input>
        <!-- </div> -->
        <button class="setupButton"> Play </button>
        </form>
    </div>
    <div class="wrapper">
    <canvas id="myCanvas"></canvas>
    <button class="gameButton"> Play </button>
    <div class="result"></div>
    <!-- <button class="backButton"> Back </button> -->
    <div>
`;
// document.addEventListener("DOMContentLoaded", init);
document.addEventListener("DOMContentLoaded", setup);
