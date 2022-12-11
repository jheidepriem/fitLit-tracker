import "./css/styles.css";
import UserRepository from "./UserRepository";
import Hydration from "../src/Hydration";
import Sleep from "../src/Sleep";
import User from "./User";
import apiCalls from "./apiCalls";
import { Chart } from "chart.js/auto";

// Query Selectors
const userInfo = document.querySelector(".user-info");
const stepGoalDisplay = document.querySelector(".step-goal");
const weeklyWaterContainer = document.querySelector(".weekly-water-container");
const sleepDataContainer = document.querySelector(".sleep-data-container");
const dailyInfoDisplay = document.querySelector(".daily-info");
const greeting = document.querySelector(".greeting");
const address = document.querySelector(".address")
const email = document.querySelector(".email")
const stride = document.querySelector(".stride")
const goal = document.querySelector(".goal")
const average = document.querySelector(".average")
const waterContainer = document.querySelector(".water-container");
const dailyHours = document.querySelector('.daily-hours')
const dailyQuality = document.querySelector('.daily-quality')

//Global Variables
let allUserData = [];
let user;
let currentRepo;
let hydration;
let hydrationData;
let sleepData;
let userData;
let sleep;

//Functions

apiCalls.fetchAllData().then((data) => {
  userData = data[0].userData;
  hydrationData = data[1].hydrationData;
  sleepData = data[2].sleepData;
  loadPageFunctions();
});

const loadPageFunctions = () => {
  makeUserInstances(userData);
  createNewRepo();
  getRandomUser();
  newHydration();
  newSleep();
  greetUser();
  showUserInfo();
  showStepInfo();
  showTodayWater();
  showTodaySleep();
  allTimeSleep();
  waterGraph();
  sleepGraph();
};

const makeUserInstances = (dataFile) => {
  dataFile.forEach((obj) => {
    let newUser = new User(obj);
    allUserData.push(newUser);
  });
};

const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

const getRandomUser = () => user = currentRepo.userData[getRandomIndex(currentRepo.userData)];

const createNewRepo = () => currentRepo = new UserRepository(allUserData);

const newHydration = () => hydration = new Hydration(user.id, hydrationData);

const newSleep = () => sleep = new Sleep(user.id, sleepData);

const greetUser = () => greeting.innerHTML = `Hi, ${user.findFirstName()}!`;

const showUserInfo = () => {
  address.innerText = `${user.address}`
  email.innerText = `${user.email}`
};

const showStepInfo = () => {
  stride.innerText = `${user.strideLength}`
  goal.innerText = `${user.dailyStepGoal}`
  average.innerText = `${currentRepo.findAverageStepGoal()}`
};

const showTodayWater = () => {
  waterContainer.innerHTML += `
  <div class="emoji">
    <img src="./images/water.jpg" alt="steps">
  </div>
  <h3 class="today-title">Today's Ounces:</h3>
  <p class="today-title">${hydration.getDailyOunces()}</p>`
};

const showTodaySleep = () => {
  const lastIndex = sleep.sleepHistory.length - 1;
  dailyHours.innerText = `${sleep.giveDailyHrs(sleep.sleepHistory[lastIndex].date)}`
  dailyQuality.innerText = `${sleep.giveDailyQuality(sleep.sleepHistory[lastIndex].date)}`
};

const allTimeSleep = () => {
  dailyInfoDisplay.innerHTML = "";
  dailyInfoDisplay.innerHTML += `
  <h3 class="all-time">All-time Sleep Quality:</h3>
  <p class="all-time"> ${sleep.calcDailyQualityAvg()}</p>
  <h3 class="all-time">All-time Sleep Hours Average:</h3>
  <p class="all-time">${sleep.calcDailyHrsAvg()}</p>
 `
};

const waterGraph = () => {
  weeklyWaterContainer.innerHTML = `<canvas id="weekWater"></canvas>`;
  const ctx = document.getElementById("weekWater").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [
        {
          label: "Ounces of Water",
          data: hydration.getWeeklyOunces(),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const sleepGraph = () => {
  sleepDataContainer.innerHTML = `<canvas id="weekSleep"></canvas>`;
  const ctx = document.getElementById("weekSleep").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [
        {
          label: "Weekly Hours",
          data: sleep.totalWeeklyHours(),
          borderColor: "rgb(77, 18, 238)",
          backgroundColor: "rgb(248, 246, 246)",
        },
        {
          label: "Weekly Quality",
          data: sleep.totalWeeklyQuality(),
          borderColor: "rgb(63, 209, 203)",
          backgroundColor: "rgb(248, 246, 246)",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Weekly Sleep Data",
        },
      },
    },
  });
};
