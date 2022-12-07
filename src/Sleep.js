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

}

module.exports = Sleep;