const { expect } = require("chai");
const Hydration = require("../src/Hydration");

describe("Hydration", () => {
    let hydration;
    let hydrationData;
    beforeEach(() => {
        hydrationData = {
            userID: 1,
            date: "2019/06/15",
            numOunces: 37
        };
        hydration = new Hydration(hydrationData);
      });

      it.skip("should be a function", () => {
        expect(Hydration).to.be.a("function");
      });

      it.skip("should be an instance of hydration", () => {
        expect(hydration).to.be.an.instanceOf(Hydration);
      });
});