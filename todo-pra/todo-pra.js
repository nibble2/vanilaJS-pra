const form = document.querySelector(".js-toDoForm"),
    input = form.querySelector("input"),
    pendingList = document.querySelector(".js-pendingList"),
    finishedList = document.querySelector(".js-finishedList");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendingTasks, finishedTasks;

function getTaskObject(text) {
    return {
        id: String(Date.now()),
        text
    };
}

function deleteTask(e) {
    //화면에서 삭제
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);

    removeFormPending(li.id);
    removeFormFinished(li.id);
    saveState();
    //pendingTasks 배열에서 삭제

    //finishedTasks 배열에서 삭제
    //로컬스토리지 상태 저장하기
}

function addToFininshed(task) {
    console.log(task);
    finishedTasks.push(task);
}

function removeFormFinished(taskId) {
    finishedTasks = finishedTasks.filter(function (task) {
        return task.id !== taskId;
    });
}

function removeFormPending(taskId) {
    pendingTasks = pendingTasks.filter(function (task) {
        return task.id !== taskId;
    });
}

function findInFinished(taskId) {
    return finishedTasks.find(function (task) {
        return task.id === taskId;
    });
}

function handleBackClick(e) {
    // finished 화면에서 삭제
    li = e.target.parentNode;
    li.parentNode.removeChild(li);
    //finished 배열에서 일치하는 것 찾아서 task
    const task = findInFinished(li.id);

    //finished 배열에서 삭제
    removeFormFinished(li.id);
    // pending화면에 추가
    paintPendingTask(task);
    //pending 배열에 추가
    addToPendingTask(task);
    //상태 저장
    saveState();
}

function paintFinishedTask(task) {
    const li = buildGenericLi(task);
    const backBtn = document.createElement("button");

    backBtn.innerText = "⏪";
    backBtn.addEventListener("click", handleBackClick);
    li.append(backBtn);

    finishedList.append(li);
}

function findInPending(taskId) {
    return pendingTasks.find(function (task) {
        return taskId === task.id;
    });
}

function handleFinishedClick(e) {
    //peidngList 화면에 삭제하기
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    // peidngList에 있는 배열 안에서 가져와야한다..
    const task = findInPending(li.id);

    //FinishedList 화면에 보여주기
    paintFinishedTask(task); //task가 필요함
    //const pendingTasks에 배열이 있나 찾기

    // pendingTasks 배열에서 삭제하기(클릭한 것의 아이디가 일치)
    // 만약 클릭한 것의 li id와 pendingTasks의 id가 같으면 배열 리턴해주고 
    removeFormPending(li.id);

    // finishedTasks 배열에 저장하기
    addToFininshed(task);
    // finishedTasks.push(task);

    saveState();
}

function saveState() {
    localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
    localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}

function addToPendingTask(task) {
    pendingTasks.push(task);
}

function buildGenericLi(task) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    li.id = task.id;
    span.innerText = task.text;
    deleteBtn.innerText = "❌"
    deleteBtn.addEventListener("click", deleteTask);
    li.append(span, deleteBtn)
    return li;
}

function paintPendingTask(task) {
    const li = buildGenericLi(task);
    const completBtn = document.createElement("button");

    completBtn.innerText = "✅";
    completBtn.addEventListener("click", handleFinishedClick);

    li.append(completBtn);

    pendingList.append(li);
}

function handleSubmit(e) {
    e.preventDefault();
    const taskObj = getTaskObject(input.value);
    //화면에 그리기
    input.value = "";
    paintPendingTask(taskObj);
    //배열에 추가하기
    addToPendingTask(taskObj);
    //배열에 저장하기
    saveState();
}

function restoreState() {
    pendingTasks.forEach(function (task) {
        paintPendingTask(task);
    });
    finishedTasks.forEach(function (task) {
        paintFinishedTask(task);
    });
}

function loadState() {
    pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
    finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

function init() {
    form.addEventListener("submit", handleSubmit);
    loadState();
    restoreState();
}

init();