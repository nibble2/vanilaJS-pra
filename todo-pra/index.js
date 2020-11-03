const pendingList = document.querySelector(".js-pendingList"),
    finishedList = document.querySelector(".js-finishedList"),
    form = document.querySelector(".js-toDoForm"),
    input = form.querySelector("input");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendingTasks = [];
let finishedTasks = [];

function getTaskObject(text) {
    return {
        id: String(Date.now()),
        text
    };
}

function saveState() {
    localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
    localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}

function removeFormFinished(taskId) {
    finishedTasks = finishedTasks.filter(function (toDo) {
        return toDo.id !== taskId;
    });
}

function removeFormPending(taskId) {
    pendingTasks = pendingTasks.filter(function (toDo) {
        return toDo.id !== taskId;
    });
}

function deleteTask(e) {
    // 내가 선택한 li.id와 q배열 안에 있는 toDo.id가 일치하지 않은 것만 보내기
    const li = e.target.parentNode;

    li.parentNode.removeChild(li);

    removeFormPending(li.id);
    removeFormFinished(li.id);

    saveState();
}

function buildGenericLi(task) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    span.innerText = task.text;
    deleteBtn.innerText = "❌";
    deleteBtn.addEventListener("click", deleteTask);
    li.append(span, deleteBtn);

    li.id = task.id;

    return li;
}

function removeFormPending(taskId) {
    pendingTasks = pendingTasks.filter(function (toDo) {
        return taskId !== toDo.id;
    });
}

function findInPendig(taskId) {
    return pendingTasks.find(function (toDo) {
        return taskId === toDo.id;
    });
}

function findInFinished(taskId) {
    return finishedTasks.find(function (toDo) {
        return taskId === toDo.id;
    });
}

function addToFininshed(task) {
    finishedTasks.push(task);
}

function handleFinishClick(e) {
    const li = e.target.parentNode;

    // pending화면에서 지우기
    li.parentNode.removeChild(li);

    //pending 로컬 스토리지 삭제
    // const task = pendig 배열에서 아이디 일치하는 {id, text}를 가져온다 => findInPendig
    const task = findInPendig(li.id);
    // 내가 선택한 li.id와 task.id가 일치하면 삭제 => removeFormPending
    removeFormPending(li.id);

    //finished 배열에 푸쉬
    savePendingTask(task);

    //finished 화면에 출력 => paintFinishedTask
    paintFinishedTask(task);

    // 상태 저장
    saveState();
}

function handleBackClick(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);

    const task = findInFinished(li.id);
    console.log(task);

    removeFormFinished(task.id);

    paintPendingTask(task)

    savePendingTask(task);

    saveState();
    //pending배열에 추가
    //pending 로컬스토리지에 추가
}

function paintFinishedTask(task) {
    const genericLi = buildGenericLi(task);
    const backBtn = document.createElement("button");
    backBtn.innerText = "⏪";
    backBtn.addEventListener("click", handleBackClick);

    genericLi.append(backBtn);
    finishedList.append(genericLi);
}

function savePendingTask(task) {
    pendingTasks.push(task);
}

function paintPendingTask(task) {
    const genericLi = buildGenericLi(task);
    const completBtn = document.createElement("button");
    completBtn.innerText = "✅";

    completBtn.addEventListener("click", handleFinishClick);
    genericLi.append(completBtn);

    //화면에 그림
    pendingList.append(genericLi);
    //로딩할 때 같은 것을 두번 저장하지 않기 위해 
    //push부분을 따로 함수로 만들어 주었다.
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

function handleSubmit(e) {
    e.preventDefault();
    const taskObj = getTaskObject(input.value);
    input.value = "";
    paintPendingTask(taskObj);
    savePendingTask(taskObj);
    saveState();
}


function init() {
    form.addEventListener("submit", handleSubmit);
    loadState();
    restoreState();
}

init();