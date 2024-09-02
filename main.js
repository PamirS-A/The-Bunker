document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("gameInProgress")) {
        stena.style.display = "none";
    } else {
        stena.style.display = "block"; 
    }
});

let nameInput = document.getElementById("namePerson");
let ul = document.querySelector(".ul");
let btn = document.getElementById("add");
let elements = [];
let winers = [];
let stena = document.getElementById("stena");
let audioBegin = new Audio("./15731_1460484637.mp3");
let beginBtn = document.querySelector(".beginGame")

window.onload = function() {
    if (localStorage.getItem("Names")) {
        elements = JSON.parse(localStorage.getItem("Names"));
        elements.forEach(name => {
            ul.innerHTML += name;
        });
        winers = JSON.parse(localStorage.getItem("Winers"));
        deleteName();
    }

    btn.addEventListener("click", addPerson);
};


const arrays = {
    RABOTA: ["Доктор Травматолог", "Таксист", "Бизнесмен", "Актер", "Повар", "Охранник"],
    FAKT: ["Клаустрофобия", "Гурман", "Алкоголик", "Слабый иммунитет", "Раньше был кмс по карате", "Знахарь"],
    VOZRAST: ["20 лет", "30 лет", "45 лет", "63 лет", "18 лет", "37 лет"],
    HOBBI: ["Готовить", "Плавать", "Чайные церемонии", "Паркур", "Медитация", "Танцы"],
    ZDOROVIE: ["Не обследовался 3 года", "Полностью здоров", "Туберкулез", "Грипп", "Рак 2 стадии", "Диабет"],
    BAGAJ: ["Телефон", "Катана", "1 кг меди", "набор парикмахера", "коробка тушенки", "100 сом"]
};

const used = {
    RABOTA: [],
    FAKT: [],
    VOZRAST: [],
    HOBBI: [],
    ZDOROVIE: [],
    BAGAJ: []
};

function addPerson() {
    let namePerson = nameInput.value;
    if (namePerson.length < 2 || namePerson.length > 11) {
        alert("Неправильное имя");
        return;
    }

    if (elements.length >= 5) {
        alert("Максимальное количество игроков!");
        nameInput.value = "";
        return;
    }

    let randomRabota = randomTittle("RABOTA");
    let randomFakt = randomTittle("FAKT");
    let randomVozrast = randomTittle("VOZRAST");
    let randomHobbi = randomTittle("HOBBI");
    let randomZdorovie = randomTittle("ZDOROVIE");
    let randomBagaj = randomTittle("BAGAJ");

    let newName = `
    <div class="all">
        <div class="names">${namePerson}</div>
            <div class="show remove">
                <div class="items">
                    <h6 class="title" style="color:gray;">Профессия</h6>
                    <p class="content p">${randomRabota}</p>
                </div>
                <div class="items" style="margin-top:20px;">
                    <h6 class="title" style="color:purple;">Факт</h6>
                    <p class="content f">${randomFakt}</p>
                </div>
                <div class="items" style="margin-top:20px;">
                    <h6 class="title" style="color:green;">Возраст</h6>
                    <p class="content v">${randomVozrast}</p>
                </div>
                <div class="items" style="margin-top:20px;">
                    <h6 class="title" style="color:gold">Хобби</h6>
                    <p class="content h">${randomHobbi}</p>
                </div>
                <div class="items" style="margin-top:20px;">
                    <h6 class="title" style="color:darkred;">Здоровье</h6>
                    <p class="content z">${randomZdorovie}</p>
                </div>
                <div class="items" style="margin-top:20px;">
                    <h6 class="title" style="color:orangered;">Багаж</h6>
                    <p class="content b">${randomBagaj}</p>
                </div>
            </div>
        <button class="minus-btn">--</button>
    </div>`;
    elements.push(newName);
    winers.push(namePerson)
    ul.innerHTML += newName;

    localStorage.setItem("Names", JSON.stringify(elements));
    localStorage.setItem("Winers", JSON.stringify(winers));

    deleteName();

    nameInput.value = "";
    console.log(namePerson + " Професия: " + randomRabota + "," + "Факт:" + randomFakt + "," + "Возраст:" + randomVozrast + "," + "Хобби:" + randomHobbi + "," + "Здоровие:" + randomZdorovie + "," + "Багаж:" + randomBagaj)
}

function randomTittle(arrayName) {
    let array = arrays[arrayName];
    let usedArray = used[arrayName];
    let index = Math.floor(Math.random() * array.length);
    let value = array.splice(index, 1)[0];
    usedArray.push(value);
    return value;
}

function deleteName() {
    ul.querySelectorAll(".minus-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            let item = event.target.parentElement;
            let removedName = item.querySelector(".names").textContent;
            elements.splice(elements.indexOf(removedName), 1);
            winers.splice(winers.indexOf(removedName), 1);
            item.remove();
            localStorage.setItem("Names", JSON.stringify(elements));
            localStorage.setItem("Winers", JSON.stringify(winers));     

            let showElement = item.querySelector(".show");
            let infoElement = document.querySelector(".info");
            infoElement.innerHTML +=removedName + showElement.innerHTML;
            setTimeout(() => {
                infoElement.innerHTML=""
            }, 10000)
            let allMin = document.querySelectorAll(".minus-btn")
            for(let i of allMin) {
                i.style.display = "none"
            }
            setTimeout(() => {
                let allMin = document.querySelectorAll(".minus-btn")
                for(let i of allMin) {
                    i.style.display = "flex"
                }
            }, 13000)
            // ПОБЕДА
            if (elements.length<3){
                setTimeout(() =>{
                    alert("Входят в бункер "+winers[0]+" и "+winers[1])
                    ul.innerHTML=""
                    elements=[]
                    localStorage.setItem("Names", JSON.stringify(elements));
                    winers=[]
                    localStorage.setItem("Winers", JSON.stringify(winers));
                    beginBtn.disabled=false;
                    stena.style.display = "block";
                    localStorage.removeItem("gameInProgress");
                },13000)
            }
        });
    });
}
{
let mayak = 0;

beginBtn.addEventListener("click", () => {
    mayak++;
    beginBtn.classList.toggle("beginGame");
    beginBtn.classList.toggle("stopGame");

    if (mayak % 2 === 1) {
        beginBtn.textContent = "stop";
    } else {
        beginBtn.textContent = "begin";
    }

    if (mayak % 2 === 0) {
        stopGame();
    } else {
        startGame();
    }
});

function startGame() {
    if (elements.length < 5) {
        alert("Недостаточно игроков для игры. Минимум нужно 5 игроков");
    } else {
        audioBegin.play();
        stena.style.opacity = "0";
        stena.style.display = "none";
        stena.style.transition = "4s";
        alert("Игра началась");
        localStorage.setItem("gameInProgress", true);
        setTimeout(() => {
            audioBegin.currentTime=0
            audioBegin.pause();
        }, 6000);
    }
}

function stopGame() {
    stena.style.display = "block";
    stena.style.opacity = "0.7"
    localStorage.removeItem("gameInProgress");
    audioBegin.pause();
    audioBegin.currentTime=0
}

document.querySelector(".stopGame").addEventListener("click", () => {
    mayak++;
    beginBtn.classList.toggle("beginGame");
    beginBtn.classList.toggle("stopGame");
    stopGame();
});
}