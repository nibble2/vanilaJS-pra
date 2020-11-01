const pendingList = document.querySelector(".js-pendingList"),
    finishedList = document.querySelector(".js-finishedList"),
    form = document.querySelector(".js-toDoForm"),
    input = form.querySelector("input");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendingTasks = [];
let finishedTasks = [];

function saveState() {
    localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
    localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}

function buildGenericLi(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    span.innerText = text;
    deleteBtn.innerText = "❌";

    li.append(span, deleteBtn);

    return li;

}

function handleFinishClick(e) {
    const li = e.target.parentNode;

    // pending화면에서 지우기
    li.parentNode.removeChild(li);


    //pending 로컬 스토리지 삭제
    // const task = pendig 배열에서 아이디 일치하는 {id, text}를 가져온다 => findInPendig
    // 내가 선택한 li.id와 task.id가 일치하면 삭제 => removeFormPending

    //finished 화면에 출력
    const genericLi = buildGenericLi(text);
    const backBtn = document.createElement("button");
    backBtn.innerText = "⏪";

    genericLi.append(backBtn);
    finishedList.append(li);
    //finished 로컬 스토리지 추가
    //새로운 task = {id, text}를 가져다가 그대로 넣음

    // 상태 저장
    //saveState();
}

function paintPendingTask(task) {
    const li = buildGenericLi(task.text);
    const completBtn = document.createElement("button");
    const newId = pendingTasks.length + 1;

    completBtn.addEventListener("click", handleFinishClick);

    completBtn.innerText = "✅";
    li.append(completBtn);
    //화면에 그림
    pendingList.append(li);

    const toDoObj = {
        id: newId,
        text: text
    }

    pendingTasks.push(toDoObj);

    saveState();

}

function getTaskObject(text) {
    return {
        id: String(Date.now()),
        text
    },
}

function handleSubmit(e) {
    e.preventDefault();
    const taskObj = getTaskObject(input.value);
    paintPendingTask(taskObj);
    input.value = "";
}

function loadState() {
    pendingList = JSON.parse(localStorage.getItem(PENDING)) || [];
    findInFinished = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

function init() {
    form.addEventListener("submit", handleSubmit);
}

init();