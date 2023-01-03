class Sleep {
  constructor(userID, data) {
    this.id = userID
    this.allData = data
    this.sleepHistory = data.filter((sleepEntry) => sleepEntry.userID === this.id);
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

  giveDaily(date, measure) {
    const pickedDay = this.sleepHistory.find(day => day.date === date)
    if(!pickedDay) {
      return undefined
    } else {
      return pickedDay[measure]
    }
  };

  totalWeekly(date, measure) {
    const pickedDay = this.sleepHistory.findIndex(obj => {
      const dateIndex = obj.date === date 
      return Number(dateIndex)
    })
    let selectedWeek;
    if(pickedDay <= 6) {
      selectedWeek = this.sleepHistory.slice(0, pickedDay + 1)
    } else {
      selectedWeek = this.sleepHistory.slice((pickedDay - 6), pickedDay + 1)
    }
    const weeklyMeasure = selectedWeek.map(day => day[measure])
     return weeklyMeasure
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