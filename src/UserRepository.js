class UserRepository {
  constructor(data) {
    this.userData = data;
  }

  retrieveUserData(id) {
    let singleUserData = this.userData.find((user) => user.id === id);
    return singleUserData;
  }

  findAverageStepGoal() {
    const sum = this.userData.reduce((total, user) => {
      total = total += user.dailyStepGoal;
      return total;
    }, 0);
    let average = sum / this.userData.length;
    return average;
  }
}

export default UserRepository;
