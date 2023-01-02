import "./css/styles.css";
import UserRepository from "./UserRepository";
import Hydration from "../src/Hydration";
import Sleep from "../src/Sleep";
import User from "./User";
import apiCalls from "./apiCalls";
import { Chart } from "chart.js/auto";

// Query Selectors

const weeklyWaterContainer = document.querySelector(".weekly-water-container");
const sleepDataContainer = document.querySelector(".sleep-data-container");
const greeting = document.querySelector(".greeting");
const address = document.querySelector(".address")
const email = document.querySelector(".email")
const stride = document.querySelector(".stride")
const goal = document.querySelector(".goal")
const average = document.querySelector(".average")
const ounces = document.querySelector(".ounces");
const dailyHours = document.querySelector(".daily-hours")
const dailyQuality = document.querySelector(".daily-quality")
const qualityAvg = document.querySelector(".quality")
const hoursAvg = document.querySelector(".hours")

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
  newRepo();
  getRandomUser();
  newHydration();
  newSleep();
  greetUser();
  showUserInfo();
  showStepInfo();
  showAllTimeInfo();
  showTodayWater();
  showTodaySleep();
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

const newRepo = () => currentRepo = new UserRepository(allUserData);

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

const showTodayWater = () => ounces.innerText += `${hydration.getDailyOunces()}`;

const showTodaySleep = () => {
  const lastIndex = sleep.sleepHistory.length - 1;
  dailyHours.innerText = `${sleep.giveDaily(sleep.sleepHistory[lastIndex].date, "hoursSlept")}`
  dailyQuality.innerText = `${sleep.giveDaily(sleep.sleepHistory[lastIndex].date, "sleepQuality")}`
};

const showAllTimeInfo = () => {
  hoursAvg.innerText = `${sleep.calcDailyHrsAvg()}`
  qualityAvg.innerText = `${sleep.calcDailyQualityAvg()}`
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
            "rgba(113, 223, 255, 0.2)",
            "rgba(171, 217, 255, 0.2)",
            "rgba(113, 223, 231, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(113, 223, 255, 0.2)",
            "rgba(171, 217, 255, 0.2)",
          ],
          borderColor: [
            "rgb(113, 223, 255)",
            "rgb(171, 217, 255)",
            "rgb(113, 223, 231)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(113, 223, 255)",
            "rgb(171, 217, 2255)",
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
