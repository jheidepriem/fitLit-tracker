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
});