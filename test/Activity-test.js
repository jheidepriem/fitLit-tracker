const { expect } = require("chai");
const Activity = require("../src/Activity");

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
    beforeEach(() => {
        activityEntry1 = {
            userID: 1,
            date: "2019/06/15",
            numSteps: 100,
            minutesActive: 20,
            flightsOfStairs: 10
        };

        activityEntry2 = {
            userID: 2,
            date: "2019/06/15",
            numSteps: 110,
            minutesActive: 30,
            flightsOfStairs: 20
        };

        activityEntry3 = {
            userID: 1,
            date: "2019/06/16",
            numSteps: 90,
            minutesActive: 10,
            flightsOfStairs: 0
        };

        activityEntry4 = {
            userID: 1,
            date: "2019/06/17",
            numSteps: 80,
            minutesActive: 25,
            flightsOfStairs: 15
        };

        activityEntry5 = {
            userID: 1,
            date: "2019/06/18",
            numSteps: 105,
            minutesActive: 15,
            flightsOfStairs: 20
        };

        activityEntry6 = {
            userID: 1,
            date: "2019/06/19",
            numSteps: 135,
            minutesActive: 25,
            flightsOfStairs: 35
        };

        activityEntry7 = {
            userID: 1,
            date: "2019/06/20",
            numSteps: 160,
            minutesActive: 10,
            flightsOfStairs: 5
        };

        activityEntry8 = {
            userID: 1,
            date: "2019/06/21",
            numSteps: 200,
            minutesActive: 10,
            flightsOfStairs: 0
        };

        activityEntry9 = {
            userID: 1,
            date: "2019/06/22",
            numSteps: 10,
            minutesActive: 0,
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

        activity = new Activity(1, activityData);
    });

    it("should be a function", () => {
        expect(Activity).to.be.a("function");
    });

    it("should be an instance of activity", () => {
        expect(activity).to.be.an.instanceOf(Activity);
    });

    it("should have a user id", () => {
        expect(activity.id).to.equal(1);
    });

   it("should have an array of user history data", () => {
        expect(activity.activityHistory).to.be.an('array');
    });

    it("should be able to filter history based on passed in user id", () => {
        expect(activity.activityHistory).to.deep.equal([activityEntry1, activityEntry3, activityEntry4, activityEntry5, activityEntry6, activityEntry7, activityEntry8, activityEntry9]);
    });
});