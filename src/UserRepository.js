class UserRepository {
  constructor(data) {
    this.userData = data;
  }

  retrieveUserData(id) {
    return this.userData.find((user) => user.id === id);
  }

  findAverageStepGoal() {
    const sum = this.userData.reduce((total, user) => {
      total = total += user.dailyStepGoal
      return total
    }, 0);
    return sum / this.userData.length;
  }
}
export default UserRepository;
