let inp = document.getElementById("inp");
let btnCreat = document.getElementById("creat");
let tasks = document.querySelector(".tasks");
let arrytask = [];
let storageAA = JSON.parse(localStorage.getItem("tasks"));
let cunterID = "";
if (localStorage.getItem("tasks")) {
  for (let i = 0; i < storageAA.length; i++) {
    creatTask(storageAA[i]);
    // console.log(storageAA[i]);
  }
}
btnCreat.onclick = function () {
  if (inp.value !== "") {
    creatTask(inp.value);
  }
  inp.value = "";
};
// for creat task element
function creatTask(name) {
  // set cunter
  cunterID++;
  let newTask = document.createElement("div");
  newTask.classList.add("task");
  let newHead = document.createElement("h3");
  newHead.innerHTML = name;
  let newDeletBTN = document.createElement("button");
  newDeletBTN.classList.add("delete");
  newDeletBTN.textContent = "Delete";
  newTask.appendChild(newHead);
  newTask.appendChild(newDeletBTN);
  //add new task to tasks
  // animation
  if (cunterID % 2 == 0) {
    newTask.style.cssText =
      "  animation: toRit 0.7s cubic-bezier(0.35, 0.61, 0.46, 0.89);";
  } else {
    newTask.style.cssText =
      "  animation: toLeft 0.7s cubic-bezier(0.35, 0.61, 0.46, 0.89);";
  }
  if (localStorage.getItem(newHead.textContent) === "end") {
    newHead.classList.add("end");
  }
  //   console.log(newTask);
  tasks.appendChild(newTask);
  // check is element
  newHead.addEventListener("click", function () {
    newHead.classList.toggle("end");
    if (localStorage.getItem(newHead.textContent)) {
      localStorage.removeItem(newHead.textContent);
    } else {
      localStorage.setItem(newHead.textContent, "end");
    }
  });
  //make arr
  arrytask.push(name);
  //   add new task to localStorage
  let converArr = JSON.stringify(arrytask);
  //   console.log(converArr);
  localStorage.setItem("tasks", converArr);
  // remov
  newDeletBTN.addEventListener("click", function () {
    newTask.style.cssText =
      "  animation: tobtn 0.7s cubic-bezier(0.35, 0.61, 0.46, 0.89);";
    setTimeout(function () {
      tasks.removeChild(newTask);
      if (arrytask.includes(name)) {
        arrytask = arrytask.filter((ele) => (ele !== name ? name : ""));
        //   console.log(arrytask);
        converArr = JSON.stringify(arrytask);
        localStorage.setItem("tasks", converArr);
        localStorage.removeItem(newHead.textContent);
      }
    }, 700);
  });
}
//
document.querySelector("#clear").addEventListener("click", function () {
  if (tasks.innerHTML !== "") {
    tasks.classList.add("clearALL");
    setTimeout(function () {
      localStorage.clear();
      tasks.innerHTML = "";
      inp.value = "";
      arrytask = [];
      tasks.classList.remove("clearALL");
    }, 700);
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key == "Enter" && inp.value !== "") {
    creatTask(inp.value);
    inp.value = "";
  }
});
//
function getDate() {
  let today = new Date();
  return today.toLocaleDateString("en-us", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
// add date of today in document
let dateToday = document.querySelector(".dateToday");
dateToday.innerHTML = getDate();
