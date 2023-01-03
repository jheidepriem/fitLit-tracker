const { expect } = require("chai");
const Activity = require("../src/Activity");
const User = require("../src/User");

describe("activity", () => {
    let activityEntry1;
    let activityEntry2;
    let activityEntry3;
    let activityEntry4;
    let activityEntry5;
    let activityEntry6;
    let activityEntry7;
    let activityEntry8;
    let activityEntry9;
    let activityData;
    let activity;
    let user1
    beforeEach(() => {
        activityEntry1 = {
            userID: 1,
            date: "2019/06/15",
            numSteps: 1000,
            minutesActive: 20,
            flightsOfStairs: 10
        };

        activityEntry2 = {
            userID: 2,
            date: "2019/06/15",
            numSteps: 1100,
            minutesActive: 30,
            flightsOfStairs: 20
        };

        activityEntry3 = {
            userID: 1,
            date: "2019/06/16",
            numSteps: 9000,
            minutesActive: 10,
            flightsOfStairs: 0
        };

        activityEntry4 = {
            userID: 1,
            date: "2019/06/17",
            numSteps: 8000,
            minutesActive: 25,
            flightsOfStairs: 15
        };

        activityEntry5 = {
            userID: 1,
            date: "2019/06/18",
            numSteps: 10005,
            minutesActive: 15,
            flightsOfStairs: 20
        };

        activityEntry6 = {
            userID: 1,
            date: "2019/06/19",
            numSteps: 8035,
            minutesActive: 25,
            flightsOfStairs: 35
        };

        activityEntry7 = {
            userID: 1,
            date: "2019/06/20",
            numSteps: 10000,
            minutesActive: 10,
            flightsOfStairs: 5
        };

        activityEntry8 = {
            userID: 1,
            date: "2019/06/21",
            numSteps: 2900,
            minutesActive: 50,
            flightsOfStairs: 0
        };

        activityEntry9 = {
            userID: 1,
            date: "2019/06/22",
            numSteps: 10000,
            minutesActive: 60,
            flightsOfStairs: 0
        };

        activityData = [
            activityEntry1,
            activityEntry2,
            activityEntry3,
            activityEntry4,
            activityEntry5,
            activityEntry6,
            activityEntry7,
            activityEntry8,
            activityEntry9
        ]

        user1Data = {
            id: 1,
            name: "Luisa Hane",
            address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
            email: "Diana.Hayes1@hotmail.com",
            strideLength: 4.3,
            dailyStepGoal: 10000,
            friends: [16, 4, 8],
          };
        
        user1 = new User(user1Data)

        activity = new Activity(activityData, user1);
    });

    it("should be a function", () => {
        expect(Activity).to.be.a("function");
    });

    it("should be an instance of activity", () => {
        expect(activity).to.be.an.instanceOf(Activity);
    });

    it("should have a current user", () => {
        expect(activity.currentUser).to.equal(user1);
    });

    it("should be able to filter history based on passed in user id", () => {
        expect(activity.activityHistory).to.deep.equal([activityEntry1, activityEntry3, activityEntry4, activityEntry5, activityEntry6, activityEntry7, activityEntry8, activityEntry9]);
    });

    it("should be able to determine if step goal was reached", () => {
        expect(activity.stepGoalReached).to.equal(false);
    });

    it("should be able to return the minutes a user is active", () => {
        expect(activity.returnMinutesActive("2019/06/21")).to.equal(50)
        expect(activity.returnMinutesActive()).to.equal(60)
    })

    it("should be able to return the miles a user has walked", () => {
        expect(activity.returnMilesWalked("2019/06/21")).to.equal(2.4)
        expect(activity.returnMilesWalked()).to.equal(8.1)
    })

    it("should be able to check if step goal was reached for a given day" , () => {
        activity.checkStepGoal("2019/06/21")
        expect(activity.stepGoalReached).to.equal(false)
        activity.checkStepGoal("2019/06/22")
        expect(activity.stepGoalReached).to.equal(true)
    })
});