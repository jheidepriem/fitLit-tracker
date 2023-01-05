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
            flightsOfStairs: 30
        };

        activityEntry9 = {
            userID: 1,
            date: "2019/06/22",
            numSteps: 10000,
            minutesActive: 60,
            flightsOfStairs: 20
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
        ];

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

    it("should have activity data for all users", () => {
        expect(activity.allData).to.deep.equal(activityData)
    })

    it("should be able to filter history based on passed in user id", () => {
        expect(activity.activityHistory).to.deep.equal([activityEntry1, activityEntry3, activityEntry4, activityEntry5, activityEntry6, activityEntry7, activityEntry8, activityEntry9]);
    });

    it("should be able to determine if step goal was reached", () => {
        expect(activity.stepGoalReached).to.equal(false);
    });

    it("should be able to return the number of steps for a user", () => {
            expect(activity.returnSteps("2019/06/21")).to.equal(2900)
            expect(activity.returnSteps()).to.equal(10000)
        })

    it("should be able to return the minutes a user is active", () => {
        expect(activity.returnMinutesActive("2019/06/21")).to.equal(50)
        expect(activity.returnMinutesActive()).to.equal(60)
    })

      it("should be able to return the stairs a user climbed", () => {
        expect(activity.returnStairs("2019/06/21")).to.equal(30)
        expect(activity.returnStairs()).to.equal(20)
    })

    it("should be able to return the miles a user has walked", () => {
        expect(activity.returnMilesWalked("2019/06/21")).to.equal(2.4)
        expect(activity.returnMilesWalked()).to.equal(8.1)
    })

    it("should be able to check if step goal was reached for a given day", () => {
        activity.checkStepGoal("2019/06/21")
        expect(activity.stepGoalReached).to.equal(false)
        activity.checkStepGoal("2019/06/22")
        expect(activity.stepGoalReached).to.equal(true)
        activity.checkStepGoal()
        expect(activity.stepGoalReached).to.equal(true)
    })

    it("should be able to find all days that reach step goal", () => {
        expect(activity.findReachedGoals()).to.deep.equal([activityEntry5, activityEntry7, activityEntry9])
    })

    it("should find users all time stairs record", () => {
        expect(activity.findAllTimeStairsRecord()).to.equal(35)
    })

    it("should find the average minutes active for any week", () => {
        expect(activity.findAvgMin("2019/06/21")).to.equal(22.1)
        expect(activity.findAvgMin("2019/06/22")).to.equal(27.9)
    })

    it("should find the average minutes active for all users for a specific date", () => {
        expect(activity.findAllUsersAvg("2019/06/15", "flightsOfStairs")).to.equal(15)
        expect(activity.findAllUsersAvg("2019/06/15", "minutesActive")).to.equal(25)
        expect(activity.findAllUsersAvg("2019/06/15", "numSteps")).to.equal(1050)
    })

      it('should have a method that returns the specified measurement each day over the course of a week', () => {
        expect(activity.getWeeklyData("2019/06/19", "flightsOfStairs")).to.deep.equal([10, 0, 15, 20, 35, 5, 30])
        expect(activity.getWeeklyData("2019/06/22", "flightsOfStairs")).to.deep.equal([0, 15, 20, 35, 5, 30, 20])

        expect(activity.getWeeklyData("2019/06/19", "minutesActive")).to.deep.equal([20, 10, 25, 15, 25, 10, 50])
        expect(activity.getWeeklyData("2019/06/22", "minutesActive")).to.deep.equal([10, 25, 15, 25, 10, 50, 60])
        
        expect(activity.getWeeklyData("2019/06/19", "numSteps")).to.deep.equal([1000, 9000, 8000, 10005, 8035, 10000, 2900])
        expect(activity.getWeeklyData("2019/06/22", "numSteps")).to.deep.equal([9000, 8000, 10005, 8035, 10000, 2900, 10000])
      });
      
});