const select = document.getElementById("country-select");

const COUNTRY = "country";

function saveCountry(text) {
    console.log(text);
    localStorage.setItem(COUNTRY, text);
}

function getCountry() {
    const currentVal = select.options[select.selectedIndex].value;
    saveCountry(currentVal);
}

function init() {
    select.addEventListener("change", getCountry);
}

init();