const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h2");

const dday = new Date("December 25, 2020").getTime();

function getTime() {
    const now = new Date();

    let distance = dday - now;

    let day = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let second = Math.floor((distance % (1000 * 60)) / 1000);

    clockTitle.innerText = `${day < 10 ? `0${day}` : day}d ${hour < 10 ? `0${hour}` : hour}h ${minute < 10 ? `0${minute}` : minute}m ${second < 10 ? `0${second}` : second}s`;

}



function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();