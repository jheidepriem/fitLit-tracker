import { expect } from "chai";
const User = require('../src/User');

describe('User', () => {
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
            friends: [16, 4, 8]
        };
        user = new User(userData);
    });

    it.skip('should be a function', () => {
        expect(User).to.be.a('function');
    });

    it.skip('should be an instance of user', () => {
        expect(user).to.be.an.instanceOf(User);
    });

    it.skip('should have an id', ()=> {
        expect(user.id).to.equal(1);
    });

    it.skip('should have a name', () => {
        expect(user.name).to.equal('Luisa Hane');
    });

    it.skip('should have an address', () => {
        expect(user.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
    });

    it.skip('should have an email', () => {
        expect(user.email).to.equal('Diana.Hayes1@hotmail.com');
    });

    it.skip('should have an stride length', () => {
        expect(user.strideLength).to.equal(4.3);
    });

    it.skip('should have an daily step goal', () => {
        expect(user.dailyStepGoal).to.equal(10000);
    });
    
    it.skip('should have an friends which is an array of nums', () => {
        expect(user.friends).to.equal([16, 4, 8]);
    });
});