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

// Query Selectors
let userGreeting = document.querySelector('.user-greeting')
let address = document.querySelector('.address')
let email = document.querySelector('.email')
let stepGoalDisplay = document.querySelector('.step-goal')
let strideLengthDisplay = document.querySelector('.stride-length')
let friendsListDisplay = document.querySelector('friends-list')


//Global Variables
let currentUser 
let currentRepo 

//EventListeners

//Functions


const createUserCard = () => {
 querySelector.innerHTML = ''
 querySelector.innerHTML += `
  <h2>Hi, ${userName}</h2>
  <h3>Address:</h3>
  <p>${user.address}</p>
  <h3>Email:</h3>
  <p>${user.email}</p>
  <h3>Stride Length</h3>
  <p>${user.strideLength}</p>
  <h3>Daily Step Goal</h3>
  <p>${user.dailyStepGoal}</p>
  //user friends goes here
  `
}

//create a function in our user class to compare user steps with the average
//and display it here
