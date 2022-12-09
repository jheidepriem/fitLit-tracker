class Sleep {
  constructor(userID, sleepData) {
    this.id = userID
    this.sleepHistory = []
    this.sleepData = sleepData; // this wasn't being set before, so I imagine `filterSleepData` would have broken
  }

  filterSleepData(data) {
    this.sleepHistory = data.filter(sleepEntry => sleepEntry.userID === this.id);
  };
}

module.exports = Sleep;
