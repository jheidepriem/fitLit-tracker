class Sleep {
  constructor(userID, data) {
    this.id = userID
    this.sleepHistory = data.filter((sleepEntry) => {
      if(sleepEntry.userID === this.id)
      return sleepEntry
    });
  }

  calculateDailyAverage() {
    const sum = this.sleepHistory.reduce((total, day) => {
      return total += day.hoursSlept
    },0)
    const avg = sum/this.sleepHistory.length
    return Number(avg.toFixed(1))
  };

  calculateDailyQuality() {
    const sum = this.sleepHistory.reduce((total, day) => {
      return total += day.sleepQuality
    },0)
    const avg = sum/this.sleepHistory.length
    return Number(avg.toFixed(1))
  };

  totalDailyHours(date) {
    const pickedDay = this.sleepHistory.find(day => day.date === date)
    return pickedDay.hoursSlept
  };

  totalDailyQuality(date) {
    const pickedDay = this.sleepHistory.find(day => day.date === date)
    return pickedDay.sleepQuality
  }

  totalWeeklyHours() {
    
  };

  totalWeeklyQuality() {

  };

  averageAllUsersQuality() {

  };
}

module.exports = Sleep;