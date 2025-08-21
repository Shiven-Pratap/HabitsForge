let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = localStorage.getItem("currentUser");

if (!currentUser || !users[currentUser]) {
  window.location.href = "login.html"; 
}



if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}


function logout(){
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}



function clearAll() {
    if (confirm("Are you sure you want to clear all habits?")) {
        users[currentUser].habits = [];
        localStorage.setItem("users", JSON.stringify(users));
        renderHabits();
    }
}

let habitList = document.getElementById("habitList");
let habitForm = document.getElementById("habitForm");
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];


if(!currentUser){
    window.location.href = "login.html";
}

function addHabit(){
    console.log("Hi")
    let users = JSON.parse(localStorage.getItem("users")) || {};
    let currentUser = localStorage.getItem("currentUser");


    let days = { Mon:false, Tue:false, Wed:false, Thu:false, Fri:false, Sat:false, Sun:false };

    let habitName=document.getElementById("habitName").value
    let habitCategory=document.getElementById("habitCategory").value
    let habitColor=document.getElementById("habitColor").value

    let newHabit = {
        name: habitName,
        category: habitCategory,
        color: habitColor,
        days: days
  };

  users[currentUser].habits.push(newHabit)
  localStorage.setItem("users", JSON.stringify(users));

  renderHabits()
}

function renderHabits(){
    habitList.innerHTML = "";
    let habits = users[currentUser].habits;

    habits.forEach((habit,index) => {
        let card=document.createElement("div")
        card.className="habit-card";
        
        card.innerHTML = `
            <div class="habit-header">
                <h3>${habit.name}</h3>
                <span>${habit.category}</span>
            </div>
            <div class="habit-details"></div>
        `;
        
        let details = card.querySelector(".habit-details");
        details.innerHTML = Object.keys(habit.days).map(day => {
            return `<button class="day-btn ${habit.days[day] ? "done" : ""}" data-day="${day}" data-index="${index}">${day}</button>`;
        }).join("");

        card.addEventListener("click", (e) => {
    if (!e.target.classList.contains("day-btn")) {
        details.style.display = details.style.display === "block" ? "none" : "block";
    }
});

        details.querySelectorAll(".day-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation(); 
                let day = btn.dataset.day;
                let i = btn.dataset.index;

                habits[i].days[day] = !habits[i].days[day];
                btn.classList.toggle("done");

                users[currentUser].habits = habits;
                localStorage.setItem("users", JSON.stringify(users));
            });
        });

        habitList.appendChild(card)
    });
}
renderHabits()



