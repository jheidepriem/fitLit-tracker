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
const userInfo = document.querySelector('.user-info')
const stepGoalDisplay = document.querySelector('.step-goal')
const todayWater = document.querySelector(".today-water")
const weeklyWaterContainer = document.querySelector(".weekly-water-container")
const sleepDataContainer = document.querySelector(".sleep-data-container")
const dailyInfoDisplay = document.querySelector(".daily-info")

//Global Variables
let allUserData = [];
let user 
let currentRepo 
let hydration
let hydrationData
let sleepData
let userData
let sleep

//EventListeners


//Functions

apiCalls.fetchAllData()
.then(data => {
  userData = data[0].userData;
  hydrationData = data[1].hydrationData;
  sleepData = data[2].sleepData;
  console.log(data)
  loadPageFunctions();
})

const loadPageFunctions = () => {
  makeUserInstances(userData);
  createNewRepo();
  getRandomUser();
  createUserCard();
  displaySleepData();
  displayAllTimeSleep(hydrationData);
  displayWaterData();
}

const makeUserInstances = (dataFile) => {
  dataFile.forEach((obj) => {
  let newUser = new User(obj)
  allUserData.push(newUser)
  })
}

const createNewRepo = () => currentRepo = new UserRepository(allUserData);

const getRandomIndex = array => Math.floor(Math.random() * array.length);

const getRandomUser = () => user = currentRepo.userData[getRandomIndex(currentRepo.userData)];

const createUserCard = () => {
  userInfo.innerHTML = ''
  userInfo.innerHTML += `
    <h3 class="info">Address: ${user.address}</h3>
    <h3 class="info">Email: ${user.email}</h3>
  `
  stepGoalDisplay.innerHTML = `
    <h3 class="step-info">Stride Length: ${user.strideLength}</h3>
    <h3 class="step-info">Daily Step Goal: ${user.dailyStepGoal}</h3>
    <h3 class="step-info">Average Step Goal: ${currentRepo.findAverageStepGoal()}</h3>
  `
  greeting.innerHTML = `Hi, ${user.findFirstName()}!`
}

const displayAllTimeSleep = (hydrationData) => {
  hydration = new Hydration(user.id, hydrationData)
  dailyInfoDisplay.innerHTML = `
  <h3>All-time Sleep Quality: ${sleep.calculateDailyQuality()}</h3>
  <h3>All-time Sleep Hours Average: ${sleep.calculateDailyAverage()}</h3>
  <h2>Today's Ounces: ${hydration.getDailyOunces()}</h2>
 `
}

const displayWaterData = () => {
  weeklyWaterContainer.innerHTML = `<canvas id="weekWater"></canvas>`
  const ctx = document.getElementById('weekWater').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      datasets: [{
        label: 'Ounces of Water',
        data: hydration.getWeeklyOunces(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
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

const displaySleepData = () => {
  sleep = new Sleep(user.id, sleepData)
  sleepDataContainer.innerHTML = `<canvas id="weekSleep"></canvas>`
  const ctx = document.getElementById('weekSleep').getContext('2d');
  new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Weekly Hours',
        data: sleep.totalWeeklyHours(),
        borderColor: 'rgb(77, 18, 238)',
        backgroundColor: 'rgb(248, 246, 246)',
      },
      {
        label: 'Weekly Quality',
        data: sleep.totalWeeklyQuality(),
        borderColor: 'rgb(63, 209, 203)',
        backgroundColor: 'rgb(248, 246, 246)',
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Sleep Data'
        }
      }
    }
  });
}