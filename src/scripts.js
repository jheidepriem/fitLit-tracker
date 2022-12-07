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
  currentUser = new User(userData[getRandomIndex(userData)])
  // console.log('current user',currentUser)
  currentRepo = new UserRepository(userData)
  userInfo.innerHTML = ''
  userInfo.innerHTML += `
    <h2>Hi, ${currentUser.findFirstName()}</h2>
    <h3>Address:${curerntUser.address}</h3>
    <h3>Email:${currentUser.email}</h3>
  `
  stepGoalDisplay.innerHTML = `
    <h3>Stride Length: ${currentUser.strideLength}</h3>
    <h3>Daily Step Goal: ${currentUser.dailyStepGoal}</h3>
    <h3>Average Step Goal: ${currentRepo.findAverageStepGoal()}</h3>
  `
}






const pageLoad = (createUserCard())  
window.addEventListener('load',pageLoad)