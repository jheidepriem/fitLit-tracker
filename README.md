## Abstract

## Setup

1. Then, that person should fork this repo - on the top right corner of this page, click the **Fork** button.
2. 
3. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` to install project dependencies.
4. Run `npm start` in the terminal to see the HTML page. `Control + C` is the command to stop running the local server.  Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems. This command is not specific to Webpack; make note of it for future use.    
5. Do not run `npm audit fix --force`.  This will update to the latest version of packages.  We need to be using `webpack-dev-server@3.11.2` which is not the latest version.  If you start to run into Webpack errors, first check that all group members are using the correct version.  

## Contributors
* Josephine Heidepriem: https://github.com/jheidepriem
* Angie Wirth: https://github.com/awirth224
* Matt Rowan: https://github.com/MRowan121
* Reid Poole: https://github.com/rpoole444

## Technologies Used
* Mocha
* Chai
* NPM
* Webpack
* Javascript
* HTML
* CSS
* Github
* VScode

## Future Features

## GIF
![fitGif](https://user-images.githubusercontent.com/110955503/207127036-e1385276-5b43-4af0-84c3-173de74355b0.gif)


---------------------------------------------------------------------------
## Data Model

**Users**

```
[
  {
    "id": [number],
    "name": [string],
    "address": [string],
    "email": [string],
    "strideLength": [number - feet],
    "dailyStepGoal": [number - steps],
    "friends": [array - one-way connection to other user(s)]
  },
  ...more user data
]
```

**Activity**

```
[
  {
    "userID": [number],
    "date": [string YYYY/MM/DD],
    "numSteps": [number - steps],
    "minutesActive": [number - minutes],
    "flightsOfStairs": [number - flights]
  },
  ...more activity data
]
```

**Hydration**

```
[
  {
    "userID": [number],
    "date": [string YYYY/MM/DD],
    "numOunces": [number - ounces]
  },
  ...more hydration data
]
```

**Sleep**

```
[
  {
    "userID": [number],
    "date": [string YYYY/MM/DD],
    "hoursSlept": [number - hours],
    "sleepQuality": [number - unitless]
  },
  ...more sleep data
]
```
