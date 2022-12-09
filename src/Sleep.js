class Sleep {
  constructor(userID, sleepData) {
    this.id = userID
    this.sleepHistory = []
  }

  filterSleepData(data) {
    this.sleepHistory = data.filter((sleepEntry) => {
      if(sleepEntry.userID === this.id)
      return sleepEntry
    });
  };

  calculateDailyAverage() {

  };

  calculateDailyQuality() {

  };

  totalHours() {

  };

  totalQuality() {

  }

  totalWeeklyHours() {

  };

  totalWeeklyQuality() {

  };

  averageAllUsersQuality() {

  };
}

module.exports = Sleep;