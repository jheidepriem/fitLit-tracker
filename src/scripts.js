import "./css/styles.css";
import UserRepository from "./UserRepository";
import Hydration from "./Hydration";
import Sleep from "./Sleep";
import User from "./User";
import apiCalls from "./apiCalls";
import Activity from "./Activity";
import { waterGraph, sleepGraph, weeklyActivityGraph } from "./graphs";
import * as dayjs from "dayjs";

const greeting = document.querySelector(".greeting");
const address = document.querySelector(".address");
const email = document.querySelector(".email");
const stride = document.querySelector(".stride");
const goal = document.querySelector(".goal");
const average = document.querySelector(".average");
const ounces = document.querySelector(".ounces");
const dailyHours = document.querySelector(".daily-hours");
const dailyQuality = document.querySelector(".daily-quality");
const qualityAvg = document.querySelector(".quality");
const hoursAvg = document.querySelector(".hours");
const userMinutes = document.getElementById("minutes");
const userDistance = document.getElementById("distance");
const userSteps = document.getElementById("steps");
const userStairs = document.getElementById("stairs");
const allMinutes = document.getElementById("allMinutes");
const allSteps = document.getElementById("allSteps");
const allStairs = document.getElementById("allStairs");
const addDataContainer = document.querySelector(".addDataButtons");
const addActivityBtn = document.querySelector(".addActivity");
const activityForm = document.querySelector(".activityInputs");
const addHydrationBtn = document.querySelector(".addHydration");
const hydrationForm = document.querySelector(".hydrationInputs");
const addSleepBtn = document.querySelector(".addSleep");
const sleepForm = document.querySelector(".sleepInputs");

let allUserData = [];
let user;
let currentRepo;
let hydration;
let hydrationData;
let sleepData;
let userData;
let sleep;
let activity;
let activityData;

apiCalls.fetchAllData().then((data) => {
  userData = data[0].userData;
  hydrationData = data[1].hydrationData;
  sleepData = data[2].sleepData;
  activityData = data[3].activityData;
  loadPageFunctions();
});

addActivityBtn.addEventListener("click", showActivity);
addHydrationBtn.addEventListener("click", showHydration);
addSleepBtn.addEventListener("click", showSleep);

const loadPageFunctions = () => {
  makeUserInstances(userData);
  newRepo();
  getRandomUser();
  newHydration();
  newSleep();
  newActivity();
  greetUser();
  showUserInfo();
  showStepInfo();
  showAllTimeInfo();
  showTodayWater();
  showTodaySleep();
  showAverageActivity();
  showUserActivity();
  waterGraph(hydration.getWeeklyOunces());
  sleepGraph(
    sleep.totalWeekly(
      sleep.sleepHistory[sleep.sleepHistory.length - 1].date,
      "hoursSlept"
    ),
    sleep.totalWeekly(
      sleep.sleepHistory[sleep.sleepHistory.length - 1].date,
      "sleepQuality"
    )
  );
  weeklyActivityGraph(
    activity.getWeeklyData(
      activity.activityHistory[activity.activityHistory.length - 1].date,
      "numSteps"
    ),
    activity.getWeeklyData(
      activity.activityHistory[activity.activityHistory.length - 1].date,
      "minutesActive"
    ),
    activity.getWeeklyData(
      activity.activityHistory[activity.activityHistory.length - 1].date,
      "flightsOfStairs"
    )
  );
};
const makeUserInstances = (dataFile) => {
  dataFile.forEach((obj) => {
    let newUser = new User(obj);
    allUserData.push(newUser);
  });
};

const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

const getRandomUser = () =>
  (user = currentRepo.userData[getRandomIndex(currentRepo.userData)]);

const newRepo = () => (currentRepo = new UserRepository(allUserData));

const newHydration = () => (hydration = new Hydration(user.id, hydrationData));

const newSleep = () => (sleep = new Sleep(user.id, sleepData));

const newActivity = () => (activity = new Activity(activityData, user));

const greetUser = () => (greeting.innerHTML = `Hi, ${user.findFirstName()}!`);

const showUserInfo = () => {
  address.innerText = `${user.address}`;
  email.innerText = `${user.email}`;
};

const showUserActivity = () => {
  userMinutes.innerText = `${activity.returnActivity("minutesActive")}`;
  userDistance.innerText = `${activity.returnMilesWalked()}`;
  userSteps.innerText = `${activity.returnActivity("numSteps")}`;
  userStairs.innerText = `${activity.returnActivity("flightsOfStairs")}`;
};

const showAverageActivity = () => {
  allMinutes.innerText = `${activity.findAllUsersAvg("minutesActive")}`;
  allSteps.innerText = `${activity.findAllUsersAvg("numSteps")}`;
  allStairs.innerText = `${activity.findAllUsersAvg("flightsOfStairs")}`;
};

const showStepInfo = () => {
  stride.innerText = `${user.strideLength}`;
  goal.innerText = `${user.dailyStepGoal}`;
  average.innerText = `${currentRepo.findAverageStepGoal()}`;
};

const showTodayWater = () =>
  (ounces.innerText = `${hydration.getDailyOunces()}`);

const showTodaySleep = () => {
  const lastIndex = sleep.sleepHistory.length - 1;
  dailyHours.innerText = `${sleep.giveDaily(
    sleep.sleepHistory[lastIndex].date,
    "hoursSlept"
  )}`;
  dailyQuality.innerText = `${sleep.giveDaily(
    sleep.sleepHistory[lastIndex].date,
    "sleepQuality"
  )}`;
};

const showAllTimeInfo = () => {
  hoursAvg.innerText = `${sleep.calcDailyHrsAvg()}`;
  qualityAvg.innerText = `${sleep.calcDailyQualityAvg()}`;
};

function showActivity() {
  addDataContainer.classList.toggle("hidden");
  activityForm.classList.toggle("hidden");
}

function showHydration() {
  addDataContainer.classList.toggle("hidden");
  hydrationForm.classList.toggle("hidden");
}

function showSleep() {
  addDataContainer.classList.toggle("hidden");
  sleepForm.classList.toggle("hidden");
}

const fetchApiUrl = (path) => {
  return fetch(`http://localhost:3001/api/v1/${path}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(`${path} error`, error));
};

function addNewHydrationData(newDataEntry) {
  fetch("http://localhost:3001/api/v1/hydration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDataEntry),
  })
    .then((res) => res.json())
    .then((data) => data)
    .then(() =>
      fetchApiUrl("hydration")
        .then((hydro) => (hydrationData = hydro.hydrationData))
        .then(() => {
          newHydration();
          showHydration();
          showTodayWater();
          waterGraph(hydration.getWeeklyOunces());
        })
    )
    .catch((err) => console.log("Error!", err));
}

hydrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newDataEntry = {
    userID: Number(`${user.id}`),
    date: dayjs(formData.get("date")).format("YYYY/MM/DD"),
    numOunces: Number(formData.get("numOunces")),
  };
  addNewHydrationData(newDataEntry);
  e.target.reset();
});

function addNewSleepData(newDataEntry) {
  fetch("http://localhost:3001/api/v1/sleep", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDataEntry),
  })
    .then((res) => res.json())
    .then((data) => data)
    .then(() =>
      fetchApiUrl("sleep")
        .then((sleep) => (sleepData = sleep.sleepData))
        .then(() => {
          newSleep();
          showSleep();
          showTodaySleep();
          sleepGraph(
            sleep.totalWeekly(
              sleep.sleepHistory[sleep.sleepHistory.length - 1].date,
              "hoursSlept"
            ),
            sleep.totalWeekly(
              sleep.sleepHistory[sleep.sleepHistory.length - 1].date,
              "sleepQuality"
            )
          );
        })
    )
    .catch((err) => console.log("Error!", err));
}

sleepForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newDataEntry = {
    userID: Number(`${user.id}`),
    date: dayjs(formData.get("date")).format("YYYY/MM/DD"),
    hoursSlept: Number(formData.get("hoursSlept")),
    sleepQuality: Number(formData.get("sleepQuality")),
  };
  console.log("NEW ACTIVITY:", newDataEntry);
  addNewSleepData(newDataEntry);
  e.target.reset();
});

function addNewActivityData(newDataEntry) {
  fetch("http://localhost:3001/api/v1/activity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDataEntry),
  })
    .then((res) => res.json())
    .then((data) => data)
    .then(() =>
      fetchApiUrl("activity")
        .then((activity) => (activityData = activity.activityData))
        .then(() => {
          newActivity();
          showActivity();
          showUserActivity();
          showAverageActivity();
          weeklyActivityGraph(
            activity.getWeeklyData(
              activity.activityHistory[activity.activityHistory.length - 1]
                .date,
              "numSteps"
            ),
            activity.getWeeklyData(
              activity.activityHistory[activity.activityHistory.length - 1]
                .date,
              "minutesActive"
            ),
            activity.getWeeklyData(
              activity.activityHistory[activity.activityHistory.length - 1]
                .date,
              "flightsOfStairs"
            )
          );
        })
    )
    .catch((err) => console.log("Error!", err));
}
activityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newDataEntry = {
    userID: Number(`${user.id}`),
    date: dayjs(formData.get("date")).format("YYYY/MM/DD"),
    numSteps: Number(formData.get("numSteps")),
    minutesActive: Number(formData.get("minutesActive")),
    flightsOfStairs: Number(formData.get("flightsOfStairs")),
  };
  addNewActivityData(newDataEntry);
  e.target.reset();
});
