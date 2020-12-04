// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const input = document.querySelector(".js-input");
const rangeValue = document.querySelector(".rangeValue");
const playBtn = document.querySelector(".playBtn");
const myNumber = document.querySelector(".myNumber");
const resultDiv = document.querySelector(".div-result"),
    resultSpan = resultDiv.querySelector(".result-span"),
    result = resultDiv.querySelector(".result");

function makeRandomNumber() {
    //나의 범위까지 랜덤 숫자 생성
    return Math.floor(Math.random() * parseInt(rangeValue.innerHTML) + 1);
}

function handleClick() {
    resultDiv.style.display = "block";
    //랜덤 숫자 = = 기계숫자
    const randomNumber = makeRandomNumber();
    //내가 입력한 숫자
    const number = parseInt(myNumber.value);

    resultSpan.innerHTML = `You chose: ${number} machine chose: ${randomNumber}`;

    if (number === randomNumber) {
        result.innerHTML = "You Win!!";
    } else {
        result.innerHTML = "You lost!!";
    }
}

function handleChange(e) {
    rangeValue.innerHTML = e.target.value;
}

function init() {
    input.addEventListener("change", handleChange);
    playBtn.addEventListener("click", handleClick);
}

init();