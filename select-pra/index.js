const select = document.querySelector(".contrySelect");

const CONTRY = "contry";

function saveCurrent(text) {
    localStorage.setItem(CONTRY, text);
}

function handleSelect() {
    const currentVal = select.options[select.selectedIndex].value;
    // const test = select.options[select.selectedIndex];
    // test.setAttribute("selected", "");
    saveCurrent(currentVal);
}

function loadStore() {
    const myContry = localStorage.getItem(CONTRY);
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value == myContry) {
            console.log(select.options[i]);
            return select.options[i].setAttribute("selected", true);
        } else {
            console.log("error");
        }
    }
}

function init() {
    select.addEventListener("change", handleSelect);
    loadStore();
}

init();