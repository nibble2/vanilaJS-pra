const jsToDoForm = document.querySelector(".js-toDoForm"),
    jsToDoInput = jsToDoForm.querySelector("input");
const jsPendingList = document.querySelector(".js-pendingList");
const jsFinishedList = document.querySelector(".js-finishedList");

const PENDING_LS = "pending";

const FINISH_LS = 'finished';

let toDos = [];
let finToDos = [];

// find li
function findParentNode(event) {
    const btn = event.target;
    const li = btn.parentNode;

    return li;
}

function backToDo(event) {
    const li = findParentNode(event);

    const backText = li.childNodes[0].innerText;

    paintToDo(backText);
    deleteFinToDo(event);
}

function saveFinToDos() {
    localStorage.setItem(FINISH_LS, JSON.stringify(finToDos));
}


// finished 버튼 클릭 
function finishToDo(event) {
    const li = findParentNode(event);

    const finText = li.childNodes[0].innerText;

    paintFinToDo(finText);
    deleteToDo(event);
}

function deleteFinToDo(event) {
    const li = findParentNode(event);

    jsFinishedList.removeChild(li);

    const cleanToDos = finToDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });

    finToDos = cleanToDos;

    saveFinToDos();
}

function deleteToDo(event) {
    const li = findParentNode(event);

    jsPendingList.removeChild(li);

    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });

    toDos = cleanToDos;

    saveToDos();
}

function saveToDos() {
    localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
}

function paintFinToDo(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const backBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const newId = finToDos.length + 1;


    backBtn.innerText = "↩️";
    backBtn.addEventListener("click", backToDo);
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteFinToDo);
    span.innerText = text;
    li.id = newId;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(backBtn);
    jsFinishedList.appendChild(li);

    const toDoObj = {
        id: newId,
        text: text
    }

    finToDos.push(toDoObj);

    saveFinToDos();
}

function paintToDo(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const finBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1;

    finBtn.innerText = "✅";
    finBtn.addEventListener("click", finishToDo);
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.id = newId;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    jsPendingList.appendChild(li);

    const toDoObj = {
        id: newId,
        text: text
    }

    toDos.push(toDoObj);

    saveToDos();
}

function inputSubmit(event) {
    event.preventDefault();
    const currentValue = jsToDoInput.value;
    jsToDoInput.value = "";
    paintToDo(currentValue);
}

function loadToDos() {
    const loadedPending = localStorage.getItem(PENDING_LS);
    const loadedFinish = localStorage.getItem(FINISH_LS);

    if (loadedPending !== null || loadedFinish !== null) {
        const parsedPending = JSON.parse(loadedPending);
        const parsedFinish = JSON.parse(loadedFinish)
        parsedPending.forEach(function (toDo) {
            paintToDo(toDo.text);
        });

        parsedFinish.forEach(function (toDo) {
            paintFinToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    jsToDoForm.addEventListener("submit", inputSubmit);
}

init();