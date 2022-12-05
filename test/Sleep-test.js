const { expect } = require("chai");
const Sleep = require("../src/Sleep");

describe("Sleep", () => {
  let sleepEntry1;
  let sleepEntry2;
  let sleepEntry3;
  let sleepEntry4;
  let sleepEntry5;
  let sleepEntry6;

  beforeEach(() => {
    sleepEntry1 = {
      userID: 1,
      date: "2019/06/15",
      hoursSlept: 6.1,
      sleepQuality: 2.2
      }
    sleepEntry2 = {
      userID: 2,
      date: "2019/06/15",
      hoursSlept: 7,
      sleepQuality: 4.7
      }
    sleepEntry3 = {
      userID: 1,
      date: "2019/06/16",
      hoursSlept: 4.1,
      sleepQuality: 3.8
      }
    sleepEntry4 = {
      userID: 1,
      date: "2019/06/17",
      hoursSlept: 8,
      sleepQuality: 2.6
      }
    sleepEntry5 = {
      userID: 1,
      date: "2019/06/18",
      hoursSlept: 10.4,
      sleepQuality: 3.1
      }
    sleepEntry6 = {
      userID: 1,
      date: "2019/06/19",
      hoursSlept: 10.7,
      sleepQuality: 1.2
      }
  })
})