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

// Query Selectors
let userInfo = document.querySelector('.user-info')
let stepGoalDisplay = document.querySelector('.step-goal')
let friendsListDisplay = document.querySelector('friends-list')
let hydroGraph = document.getElementById("weekWater")
let todayWater = document.getElementById(".today-water")


//Global Variables
let allUserData = [];
let user 
let currentRepo 
let hydration
let sleep
let userData

//EventListeners


//Functions

apiCalls.fetchAllData()
.then(data => {
  userData = data[0].userData;
  hydration = data[1].hydrationData;
  sleep = data[2].sleepData;
  console.log(data)
  loadPageFunctions();
  // console.log(data)
})

const loadPageFunctions = () => {
  makeUserInstances(userData);
  createNewRepo();
  getRandomUser();
  createUserCard();
}

const makeUserInstances = (dataFile) => {
  dataFile.forEach((obj) => {
  let newUser = new User(obj)
  allUserData.push(newUser)
  })
}

const createNewRepo = () => {
  currentRepo = new UserRepository(allUserData);
  console.log(currentRepo)
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

const displayDailyOunces = () => {
  hydration = new Hydration(user.id)
  hydration.filterUserHistory()
  console.log(hydration)
  todayWater.innerHTML = `
  <h2>Today's Ounces: ${hydration.getDailyOunces()}</h2>
  `
}