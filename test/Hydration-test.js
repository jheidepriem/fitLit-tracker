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
    let hydrationData;
    let hydration;
    beforeEach(() => {
        hydrationEntry1 = {
            userID: 1,
            date: "2019/06/15",
            numOunces: 30
        };

        hydrationEntry2 = {
            userID: 1,
            date: "2019/06/16",
            numOunces: 40
        };

        hydrationEntry3 = {
            userID: 1,
            date: "2019/06/17",
            numOunces: 50
        };

        hydrationEntry4 = {
            userID: 1,
            date: "2019/06/18",
            numOunces: 60
        };

        hydrationEntry5 = {
            userID: 1,
            date: "2019/06/19",
            numOunces: 50
        };

        hydrationEntry6 = {
            userID: 1,
            date: "2019/06/20",
            numOunces: 40
        };

        hydrationEntry7 = {
            userID: 1,
            date: "2019/06/21",
            numOunces: 30
        };

        hydrationEntry8 = {
            userID: 2,
            date: "2019/06/15",
            numOunces: 100
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
        ]

        hydration = new Hydration(1, hydrationData);
      });

      it.skip("should be a function", () => {
        expect(Hydration).to.be.a("function");
      });

      it.skip("should be an instance of hydration", () => {
        expect(hydration).to.be.an.instanceOf(Hydration);
      });
});