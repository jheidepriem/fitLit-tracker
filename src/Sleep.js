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
  };

  totalWeeklyHours(date) {
    const pickedDay = this.sleepHistory.findIndex(obj => {
      const dateIndex = obj.date === date 
      return Number(dateIndex)
    })
    console.log('PICKED DAY', pickedDay)
    const selectedWeek = this.sleepHistory.slice(pickedDay, -7)
    const weeklyHours = selectedWeek.map(day => day.hoursSlept)
     return weeklyHours
  };


  totalWeeklyQuality(date) {
    const pickedDay = this.sleepHistory.indexOf(date)
    const selectedWeek = pickedDay.slice(-7)
    const weeklyHours = selectedWeek.map(day => day.sleepQuality)
    return weeklyHours
  };

  averageAllUsersQuality() {

  };
}

module.exports = Sleep;