// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


// An example of how you tell webpack to use a JS file

import UserRepository from './UserRepository';
import Hydration from '../src/Hydration';
import Sleep from '../src/Sleep';
import User from './User';
import apiCalls from './apiCalls';
import { Chart } from 'chart.js/auto';

// Query Selectors
let userInfo = document.querySelector('.user-info')
let stepGoalDisplay = document.querySelector('.step-goal')
let friendsListDisplay = document.querySelector('friends-list')
let hydroGraph = document.getElementById("weekWater")
let todayWater = document.querySelector(".today-water")
let weeklyWaterContainer = document.querySelector(".weekly-water-container")


//Global Variables
let allUserData = [];
let user 
let currentRepo 
let hydration
let hydrationData
let sleep
let userData

//EventListeners


//Functions

apiCalls.fetchAllData()
.then(data => {
  userData = data[0].userData;
  hydrationData = data[1].hydrationData;
  sleep = data[2].sleepData;
  console.log(data)
  loadPageFunctions();
})

const loadPageFunctions = () => {
  makeUserInstances(userData);
  createNewRepo();
  getRandomUser();
  createUserCard();
  displayDailyOunces(hydrationData);
  displayWeeklyOunces();
}

const makeUserInstances = (dataFile) => {
  dataFile.forEach((obj) => {
  let newUser = new User(obj)
  allUserData.push(newUser)
  })
}

const createNewRepo = () => {
  currentRepo = new UserRepository(allUserData);
}

const getRandomIndex = array => {
  return Math.floor(Math.random() * array.length);
}

const getRandomUser = () => {
  user = currentRepo.userData[getRandomIndex(currentRepo.userData)];
}

const createUserCard = () => {
  userInfo.innerHTML = ''
  userInfo.innerHTML += `
    <h2>Hi, ${user.findFirstName()}</h2>
    <h3>Address:${user.address}</h3>
    <h3>Email:${user.email}</h3>
  `
  stepGoalDisplay.innerHTML = `
    <h3>Stride Length: ${user.strideLength}</h3>
    <h3>Daily Step Goal: ${user.dailyStepGoal}</h3>
    <h3>Average Step Goal: ${currentRepo.findAverageStepGoal()}</h3>
  `
}

const displayDailyOunces = (hydrationData) => {
  hydration = new Hydration(user.id, hydrationData)
  todayWater.innerHTML = `
  <h2>Today's Ounces: ${hydration.getDailyOunces()}</h2>
  `
}

const displayWeeklyOunces = () => {
  weeklyWaterContainer.innerHTML = `<canvas id="weekWater"></canvas>`
  const ctx = document.getElementById('weekWater').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      datasets: [{
        label: 'Ounces of Water',
        data: hydration.getWeeklyOunces(),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}