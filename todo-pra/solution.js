const pendingList = document.querySelector(".js-pendingList"),
    finishedList = document.querySelector(".js-finishedList"),
    form = document.querySelector(".js-toDoForm"),
    input = form.querySelector("input");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendingTasks, finishedTasks;

//submit 2
function getTaskObject(text) {
    return {
        id: String(Date.now()),
        text
    };
}

//finishe add 3
//delete end
function removeFormPending(taskId) {
    pendingTasks = pendingTasks.filter(function (task) {
        return task.id !== taskId;
    });
}

function removeFormFinished(taskId) {
    finishedTasks = finishedTasks.filter(function (task) {
        return task.id !== taskId;
    });
}

//delete 2
function deleteTask(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    removeFormFinished(li.id);
    removeFormPending(li.id);
    saveState();
}

//finishe back1
function handleBackClick(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    //선택한 task 찾기
    const task = findInFinished(li.id);

    //로컬 스토리지에서 삭제
    removeFormFinished(li.id);
    //pending 화면에 추가
    paintPendingTask(task);
    //pending 로컬 스토리지에 추가
    savePendingTask(task);
    //모두 저장
    saveState();
}

//finishe add 5
function paintFinishedTask(task) {
    const genericLi = buildGenericLi(task);
    const backBtn = document.createElement("button");

    backBtn.innerText = "⏪";
    backBtn.addEventListener("click", handleBackClick);
    genericLi.append(backBtn);
    finishedList.append(genericLi);
}

//finisne add 4
function addToFininshed(task) {
    finishedTasks.push(task);
}

function findInFinished(taskId) {
    return finishedTasks.find(function (task) {
        return task.id === taskId;
    });
}

//finishe add 2
function findInPending(taskId) {
    return pendingTasks.find(function (task) {
        return task.id === taskId;
    });
}

// finishe add 1
function handleFinishClick(e) {
    // 화면에서 삭제
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    // pending에서 선택된 것 찾아서 새 배열 만들기
    const task = findInPending(li.id);
    // pending배열에서 선택된 todo 배열 리턴
    //{id: ~, text: ~~}
    removeFormPending(li.id);
    //finishe 배열에 푸시
    addToFininshed(task);
    //finishe 화면에 그리기
    paintFinishedTask(task);
    //저장
    saveState(task);
}

//submit 5
function savePendingTask(task) {
    pendingTasks.push(task);
}

//submit 4
function buildGenericLi(task) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    span.innerText = task.text;
    deleteBtn.innerText = "❌";
    //delete 1
    deleteBtn.addEventListener("click", deleteTask);
    li.append(span, deleteBtn);

    li.id = task.id;

    return li;
}

//submit 6
function saveState() {
    localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
    localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}

//submit 3
function paintPendingTask(task) {
    const genericLi = buildGenericLi(task);
    const completBtn = document.createElement("button");
    completBtn.innerText = "✅";
    completBtn.addEventListener("click", handleFinishClick);
    genericLi.append(completBtn);
    pendingList.append(genericLi);
}

function restoreState() {
    pendingTasks.forEach(function (task) {
        paintPendingTask(task);
    });
    finishedTasks.forEach(function (task) {
        paintFinishedTask(task);
    })
}

function loadState() {
    pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
    finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

// submit 1
function handleFormSubmit(e) {
    e.preventDefault();
    const taskObj = getTaskObject(input.value);
    input.value = "";
    paintPendingTask(taskObj);
    savePendingTask(taskObj);
    saveState();

}

function init() {
    form.addEventListener("submit", handleFormSubmit);
    loadState();
    restoreState();
}

init();