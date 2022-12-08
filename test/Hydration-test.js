const { expect } = require("chai");
const Hydration = require("../src/Hydration");

describe("Hydration", () => {
    let hydrationEntry1;
    let hydrationEntry2;
    let hydrationEntry3;
    let hydrationEntry4;
    let hydrationEntry5;
    let hydrationEntry6;
    let hydrationEntry7;
    let hydrationEntry8;
    let hydrationEntry9;
    let hydrationData;
    let hydration;
    beforeEach(() => {
        hydrationEntry1 = {
            userID: 1,
            date: "2019/06/15",
            numOunces: 45
        };

        hydrationEntry2 = {
            userID: 1,
            date: "2019/06/16",
            numOunces: 55
        };

        hydrationEntry3 = {
            userID: 1,
            date: "2019/06/17",
            numOunces: 40
        };

        hydrationEntry4 = {
            userID: 1,
            date: "2019/06/18",
            numOunces: 60
        };

        hydrationEntry5 = {
            userID: 1,
            date: "2019/06/19",
            numOunces: 35
        };

        hydrationEntry6 = {
            userID: 1,
            date: "2019/06/20",
            numOunces: 65
        };

        hydrationEntry7 = {
            userID: 1,
            date: "2019/06/21",
            numOunces: 50
        };

        hydrationEntry8 = {
            userID: 2,
            date: "2019/06/15",
            numOunces: 100
        };

        hydrationEntry9 = {
            userID: 1,
            date: "2019/06/22",
            numOunces: 50
        };

        hydrationData = [
            hydrationEntry1,
            hydrationEntry2,
            hydrationEntry3,
            hydrationEntry4,
            hydrationEntry5,
            hydrationEntry6,
            hydrationEntry7,
            hydrationEntry8,
            hydrationEntry9
        ]

        hydration = new Hydration(1, hydrationData);
    });

    it("should be a function", () => {
    expect(Hydration).to.be.a("function");
    });

    it("should be an instance of hydration", () => {
    expect(hydration).to.be.an.instanceOf(Hydration);
    });

    it("should have a user id", () => {
        expect(hydration.id).to.equal(1);
    });

    it("should have an array of user history data", () => {
        expect(hydration.userHistory).to.be.an('array');
    });

    it("should be able to filter history based on passed in user id", () => {
        expect(hydration.userHistory).to.deep.equal([hydrationEntry1, hydrationEntry2, hydrationEntry3, hydrationEntry4, hydrationEntry5, hydrationEntry6, hydrationEntry7,
        hydrationEntry9]);
    });

    it("should be able to sum total ounces for all entries", () => {
        expect(hydration.getTotalOunces()).to.equal(400);
    });

    it("should be able to calc avg ounces drank for all entries", () => {
        expect(hydration.getTotalAvg()).to.equal(50);
    });

    it("should be able to return num ounces for the last entry date", () => {
        expect(hydration.getDailyOunces()).to.deep.equal([50]);
    });

    it("should return last 7 entries of ounces drank by user", () => {
        expect(hydration.getWeeklyOunces()).to.deep.equal([55, 40, 60, 35, 65, 50, 50]);
    });
});