const { expect } = require("chai");
const Sleep = require("../src/Sleep");

describe("Sleep", () => {
  let sleepEntry1;
  let sleepEntry2;
  let sleepEntry3;
  let sleepEntry4;
  let sleepEntry5;
  let sleepEntry6;
  let data;
  let sleep1;

  beforeEach(() => {
    sleepEntry1 = {
      userID: 1,
      date: "2019/06/15",
      hoursSlept: 6.1,
      sleepQuality: 2.2
    };
    sleepEntry2 = {
      userID: 2,
      date: "2019/06/15",
      hoursSlept: 7,
      sleepQuality: 4.7
    };
    sleepEntry3 = {
      userID: 1,
      date: "2019/06/16",
      hoursSlept: 4.1,
      sleepQuality: 3.8
    };
    sleepEntry4 = {
      userID: 1,
      date: "2019/06/17",
      hoursSlept: 8,
      sleepQuality: 2.6
    };
    sleepEntry5 = {
      userID: 1,
      date: "2019/06/18",
      hoursSlept: 10.4,
      sleepQuality: 3.1
    };
    sleepEntry6 = {
      userID: 1,
      date: "2019/06/19",
      hoursSlept: 10.7,
      sleepQuality: 1.2
    };
    data = [sleepEntry1, sleepEntry2, sleepEntry3, sleepEntry4, sleepEntry5, sleepEntry6];
    sleep1 = new Sleep(1);
  });

  it('should be a function', () => {
    expect(Sleep).to.be.a("function");
  });

  it("should be an instance of sleep", () => {
    expect(sleep1).to.be.an.instanceOf(Sleep);
  });

  it("should have a user id", () => {
    expect(sleep1.id).to.equal(1);
  });

  it("should have an array of sleep data", () => {
    expect(sleep1.sleepHistory).to.deep.equal([]);
  });

  it("should have a method that filters the sleep data by user id", () => {
    sleep1.filterSleepData(data);
    expect(sleep1.sleepHistory).to.deep.equal([sleepEntry1, sleepEntry3, sleepEntry4, sleepEntry5, sleepEntry6]);
  });
});

// Test sad paths: when the data is broken or empty
