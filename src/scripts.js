// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


// An example of how you tell webpack to use a JS file

import userData from './data/users';

import UserRepository from './UserRepository';

import Hydration from '../src/Hydration';
import Sleep from '../src/Sleep';
import User from './User';

// Query Selectors
let userInfo = document.querySelector('.user-info')
let stepGoalDisplay = document.querySelector('.step-goal')
let friendsListDisplay = document.querySelector('friends-list')


//Global Variables
let currentUser 
let currentRepo 

//EventListeners

//Functions
const getRandomIndex = array => {
  return Math.floor(Math.random() * array.length);
}

const createUserCard = () => {
  let user = new User(userData[getRandomIndex(userData)])
  userInfo.innerHTML = ''
  userInfo.innerHTML += `
    <h2>Hi, ${user.findFirstName()}</h2>
    <h3>Address:${user.address}</h3>
    <h3>Email:${user.email}</h3>
    <h3>Stride Length: ${user.strideLength}</h3>
    <h3>Daily Step Goal: ${user.dailyStepGoal}</h3>
  `
}

const displayUserAvgSteps = () => {
  currentRepo = new UserRepository(userData)
  currentUser = new User(userData)
  stepGoalDisplay.innerText = `
  Your Step Goal: ${currentUser.dailyStepGoal}
  Average Step Goal: ${currentRepo.findAverageStepGoal()}
  `
}

// if userData includes(friends) then return friends.name