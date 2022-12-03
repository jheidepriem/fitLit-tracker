import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import User from '../src/User'

describe('User Repository', () => {
  let user1
  let user2
  let data
  let userRepo1
  beforeEach(() => {
    user1 = new User (
      {
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [
        16,
        4,
        8
      ]
    }
    )
    user2 = (
      {
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [
        9,
        18,
        24,
        19
      ]
    }
    )
    data = [user1, user2]
    repo1 = new UserRepository(data)
  })

  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });
  
  it('should be a new instance of UserRepository', function () {
    expect(userRepository1).to.be.an.instanceof(UserRepository);
  });
  
  it('should have a parameter of data', function () {
    expect(data).to.deep.equal([user1, user2]);
  });
  
  it('should have user data', function () {
    expect(repo1.userData).to.deep.equal(data);
  });
});
