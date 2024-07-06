import { init } from "./games/reaction_game";
let buttonListener:(e:Event)=>void
function setup() {
    const BUTTON = document.querySelector(".setupButton");
    buttonListener = (e: Event) => {
        e.preventDefault();
        let validInputs = false;
        const ballSpeedInput =
            document.querySelector<HTMLInputElement>(".ballSpeed").value;
        const ballNumberInput =
            document.querySelector<HTMLInputElement>(".ballNumber").value;
        if (ballSpeedInput != "" && ballNumberInput != "") {
            validInputs = true;
        }
        console.log(validInputs);
        if (validInputs) {
            config();
            init(parseInt(ballSpeedInput * 1000), parseInt(ballNumberInput));
        }
    };
    BUTTON?.addEventListener("click", buttonListener, true);
}
function hideConfig() {
    let setup = document.querySelector<HTMLDivElement>(".setup");
    setup.style.display = "none";
}
function showGame() {
    let wrapper = document.querySelector<HTMLDivElement>(".wrapper");
    wrapper.style.display = "flex";
}
function config() {
    const ballSpeedInput = parseInt(
        document.querySelector<HTMLInputElement>(".ballSpeed").value,
    );
    const ballNumberInput = parseInt(
        document.querySelector<HTMLInputElement>(".ballNumber").value,
    );
    hideConfig();
    showGame();
}
export { setup };
