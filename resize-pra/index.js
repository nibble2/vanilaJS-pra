const body = document.body;
const title = document.querySelector("#title");

const BIG_SCREEN = "bigScreen";
const MEDIUM_SCREEN = "mediumScreen";
const SMALL_SCREEN = "smallScreen";

function handleResize() {
    const width = window.innerWidth;
    if (width > 1000) {
        body.classList.remove(MEDIUM_SCREEN);
        body.classList.add(BIG_SCREEN);
        title.innerHTML = "BIG SIZE SCREEN!"
    } else if (width < 1100 && width >= 700) {
        body.classList.remove(BIG_SCREEN, SMALL_SCREEN);
        body.classList.add(MEDIUM_SCREEN);
        title.innerHTML = "MEDIUM SIZE SCREEN!"
    } else {
        body.classList.remove(MEDIUM_SCREEN);
        body.classList.add(SMALL_SCREEN);
        title.innerHTML = "SMAL SIZE SCREEN!"
    }
    console.log(width);
}


function init() {
    window.addEventListener('resize', handleResize);
}

init();