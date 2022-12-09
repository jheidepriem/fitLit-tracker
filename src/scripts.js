// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


// An example of how you tell webpack to use a JS file

import UserRepository from './UserRepository';
import Hydration from '../src/Hydration';
// Sleep was unused
import User from './User';
import apiCalls from './apiCalls';
import { Chart } from 'chart.js/auto';

// Query Selectors
let userInfo = document.querySelector('.user-info');
let stepGoalDisplay = document.querySelector('.step-goal');
// Removed two unused lines here
let todayWater = document.querySelector(".today-water");
let weeklyWaterContainer = document.querySelector(".weekly-water-container");
// Do all of these need to be `let`s? Most people I know use `const` unless you're actually going to reassign the value of the variable


//Global Variables
let allUserData = [];
let user;
let currentRepo;
let hydration;
let hydrationData;
let sleep;
let userData;

//EventListeners


//Functions

apiCalls.fetchAllData()
  .then(data => {
    // What are these numbers??? What if the data isn't an array, or the array is empty?
    userData = data[0].userData;
    hydrationData = data[1].hydrationData;
    sleep = data[2].sleepData;
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

const getRandomIndex = array => Math.floor(Math.random() * array.length;

const getRandomUser = () => {
  // Why does this get assigned to a variable? Could it just `return` instead?
  user = currentRepo.userData[getRandomIndex(currentRepo.userData)];
}

const createUserCard = () => {
  userInfo.innerHTML = '';
  // Consider extracting these templates into their own files or even directory
  userInfo.innerHTML += `
    <h2>Hi, ${user.findFirstName()}</h2>
    <h3>Address:${user.address}</h3>
    <h3>Email:${user.email}</h3>
  `;
  stepGoalDisplay.innerHTML = `
    <h3>Stride Length: ${user.strideLength}</h3>
    <h3>Daily Step Goal: ${user.dailyStepGoal}</h3>
    <h3>Average Step Goal: ${currentRepo.findAverageStepGoal()}</h3>
  `;
}

const displayDailyOunces = (hydrationData) => {
  hydration = new Hydration(user.id, hydrationData)
  // extract template
  todayWater.innerHTML = `<h2>Today's Ounces: ${hydration.getDailyOunces()}</h2>`;
}

const displayWeeklyOunces = () => {
  weeklyWaterContainer.innerHTML = `<canvas id="weekWater"></canvas>`
  const ctx = document.getElementById('weekWater').getContext('2d');
  // Maybe there should be a chart variable? Or a Main class with a this.chart?
  // I would probably extract all of this to a "buildChart" or "initializeChart" function
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      datasets: [{
        label: 'Ounces of Water',
        data: hydration.getWeeklyOunces(),
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
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
