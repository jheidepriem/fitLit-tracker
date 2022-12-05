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


//EventListeners

//Functions
