class Sleep {
  constructor(userID, data) {
    this.id = userID
    this.allData = data
    this.sleepHistory = data.filter((sleepEntry) => {
      if(sleepEntry.userID === this.id)
      return sleepEntry
    });
  }

  calcDailyHrsAvg() {
    const sum = this.sleepHistory.reduce((total, day) => {
      return total += day.hoursSlept
    },0)
    const avg = sum/this.sleepHistory.length
    return Number(avg.toFixed(1))
  };

  calcDailyQualityAvg() {
    const sum = this.sleepHistory.reduce((total, day) => {
      return total += day.sleepQuality
    },0)
    const avg = sum/this.sleepHistory.length
    return Number(avg.toFixed(1))
  };

  giveDailyHrs(date) {
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
    let selectedWeek;
    if(pickedDay <= 6) {
      selectedWeek = this.sleepHistory.slice(0, pickedDay)
    } else {
      selectedWeek = this.sleepHistory.slice((pickedDay - 6), pickedDay)
    }
    const weeklyHours = selectedWeek.map(day => day.hoursSlept)
     return weeklyHours
  };


  totalWeeklyQuality(date) {
    const pickedDay = this.sleepHistory.findIndex(obj => {
      const dateIndex = obj.date === date 
      return Number(dateIndex)
    })
    let selectedWeek;
    if(pickedDay <= 6) {
      selectedWeek = this.sleepHistory.slice(0, pickedDay)
    } else {
      selectedWeek = this.sleepHistory.slice((pickedDay - 6), pickedDay)
    }
    const weeklyQuality = selectedWeek.map(day => day.sleepQuality)
    return weeklyQuality
  };

  averageAllUsersQuality() {
    const sum = this.allData.reduce((total, day) => {
      return total += day.sleepQuality
    },0)
    const avg = sum/this.allData.length
    return Number(avg.toFixed(1))
  };
}

module.exports = Sleep;