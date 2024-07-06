import { getRelativeCoords, randomInteger } from "../utils";
import { Circle, Point } from "./reaction_game_types.ts";
import { pointInCircle } from "./reaction_game_utils.ts";
//this should be global but somehow doesn't work
// const CANVAS = document?.querySelector<HTMLCanvasElement>("#myCanvas");
const CIRCLE_POSITIONS: Circle[] = [];
const HEIGHT = 500;
const WIDTH = 500;
// const BALLNUMBER = 10;
// const BALLLIFE = 600;
// const SLEEPFORGAMEOVER = BALLLIFE * BALLNUMBER + 1000;
let correctClicks = 0;
// const resultDiv = document.querySelector(".result")

function cleanCanvas(canvas: HTMLCanvasElement) {
    let context = canvas.getContext("2d");
    context?.clearRect(0, 0, canvas.width, canvas.height);
}
function setCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
    if (canvas) {
        canvas.width = width;
        canvas.height = height;
    }
}
function setCirclePositions(width: number, height: number) {
    let size = width;
    for (let y = 0; y < size / 100; y += 1) {
        for (let x = 0; x < size / 100; x += 1) {
            let newCircle: Circle = {
                posX: x * 100 + 100 / 2,
                posY: y * 100 + 100 / 2,
                r: 100 / 2,
                sAngle: 0,
                endAngle: 2 * Math.PI,
            };
            CIRCLE_POSITIONS.push(newCircle);
        }
    }
}
let listener: (e: event) => void;
function removeEventListener(canvas: HTMLCanvasElement) {
    if (listener) {
        canvas.removeEventListener("click", listener, true);
    }
}
function getClickListener(e: Event, selectedCircle: Circle) {
    let mouseX = getRelativeCoords(e).x;
    let mouseY = getRelativeCoords(e).y;
    let point: Point = { x: mouseX, y: mouseY };
    if (pointInCircle(point, selectedCircle)) {
        correctClicks++;
    }
}
function assignEventListener(
    canvas: HTMLCanvasElement,
    selectedCircle: Circle,
) {
    listener = (e: Event) => {
        getClickListener(e, selectedCircle);
    };
    canvas.addEventListener("click", listener, true);
}

function drawRandomCircle(canvas: HTMLCanvasElement, selectedCircle: Circle) {
    if (canvas) {
        let context = canvas.getContext("2d");
        context.beginPath();
        context.arc(
            selectedCircle.posX,
            selectedCircle.posY,
            selectedCircle.r,
            selectedCircle.sAngle,
            selectedCircle.endAngle,
        );
        context.fillStyle = "red";
        context.fill();
        context.stroke();
    }
}
function getCircle(): Circle {
    let min = 0;
    let max = CIRCLE_POSITIONS.length - 1;
    let randomIndex = randomInteger(min, max);
    let selectedCircle = CIRCLE_POSITIONS[randomIndex];
    return selectedCircle;
}
function resetVariables() {
    console.log("helloaaaaa");
    correctClicks = 0;
    let resultDiv = document.querySelector<HTMLDivElement>(".result");
    if (resultDiv) {
        resultDiv.style.display = "none";
    }
}
function finishSetup(): void {
    let resultDiv = document.querySelector<HTMLDivElement>(".result");
    if (resultDiv) {
        resultDiv.style.display = "flex";
        resultDiv.innerHTML = `finish Result  = ${correctClicks} `;
    }
}
function isFinish(ballNumber: number) {
    return ballNumber == 1;
}
async function startGame(
    canvas: HTMLCanvasElement,
    ballSpeed: number,
    ballNumber: number,
) {
    let init = setInterval(async () => {
        if (isFinish(ballNumber)) {
            clearInterval(init);
        }
        cleanCanvas(canvas);
        removeEventListener(canvas);
        let selectedCircle = getCircle();
        assignEventListener(canvas, selectedCircle);
        drawRandomCircle(canvas, selectedCircle);
        ballNumber--;
    }, ballSpeed);
}
async function controlGame(
    canvas: HTMLCanvasElement,
    ballSpeed: number,
    ballNumber: number,
) {
    await startGame(canvas, ballSpeed, ballNumber);
    await new Promise((r) => setTimeout(r, ballSpeed * ballNumber + 1000));
    finishSetup();
}
async function getButtonListener(
    canvas: HTMLCanvasElement,
    ballSpeed: number,
    ballNumber: number,
) {
    console.log("llego aca??");
    resetVariables();
    await controlGame(canvas, ballSpeed, ballNumber);
}
// This funciton is created because if later we want to delete
// the listener we would need it
let buttonListener: () => void;
function setButton(
    button: HTMLButtonElement,
    canvas: HTMLCanvasElement,
    ballSpeed: number,
    ballNumber: number,
) {
    console.log("hola");
    buttonListener = async () => {
        getButtonListener(canvas, ballSpeed, ballNumber);
    };
    button.addEventListener("click", buttonListener);
}

// function hideGame() {
//     let setup = document.querySelector<HTMLDivElement>(".setup");
//     setup.style.display = "flex";
// }
// function showSetup() {
//     let wrapper = document.querySelector<HTMLDivElement>(".wrapper");
//     wrapper.style.display = "none";
// }
// function backToSetup(e: Event) {
//     e.preventDefault();
//     hideGame();
//     showSetup();
// }
// function setBackButton(backButton: HTMLButtonElement) {
//     backButton.addEventListener("click", backToSetup);
// }
function init(ballSpeed: number, ballNumber: number) {
    const CANVAS = document?.querySelector<HTMLCanvasElement>("#myCanvas");
    const BUTTON = document?.querySelector<HTMLButtonElement>(".gameButton");
    // const BACKBUTTON = document?.querySelector<HTMLButtonElement>(".backButton");
    console.log(BUTTON);
    if (BUTTON && CANVAS) {
        setCirclePositions(WIDTH, HEIGHT);
        setCanvas(CANVAS, WIDTH, HEIGHT);
        //button start the game
        // setBackButton(BACKBUTTON);
        setButton(BUTTON, CANVAS, ballSpeed, ballNumber);
    }
}
export { init };
