import { expect } from "chai";
const User = require("../src/User");

describe("User", () => {
  let user;
  let userData;
  beforeEach(() => {
    userData = {
      id: 1,
      name: "Luisa Hane",
      address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      email: "Diana.Hayes1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [16, 4, 8],
    };
    user = new User(userData);
  });

  it("should be a function", () => {
    expect(User).to.be.a("function");
  });

  it("should be an instance of user", () => {
    expect(user).to.be.an.instanceOf(User);
  });

  it("should have an id", () => {
    expect(user.id).to.equal(1);
  });

  it("should have a name", () => {
    expect(user.name).to.equal("Luisa Hane");
  });

  it("should have an address", () => {
    expect(user.address).to.equal(
      "15195 Nakia Tunnel, Erdmanport VA 19901-1697"
    );
  });

  it("should have an email", () => {
    expect(user.email).to.equal("Diana.Hayes1@hotmail.com");
  });

  it("should have an stride length", () => {
    expect(user.strideLength).to.equal(4.3);
  });

  it("should have an daily step goal", () => {
    expect(user.dailyStepGoal).to.equal(10000);
  });

  it("should have an friends which is an array of nums", () => {
    expect(user.friends).to.deep.equal([16, 4, 8]);
  });

  it("should be able to return the users first name", () => {
    expect(user.findFirstName()).to.equal("Luisa");
  });
});
