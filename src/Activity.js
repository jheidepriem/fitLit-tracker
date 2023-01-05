class Activity {
    constructor(data, user) {
        this.currentUser = user
        this.allData = data
        this.activityHistory = data.filter((activityEntry) => activityEntry.userID === this.currentUser.id)
        this.stepGoalReached = false
    };

    returnSteps(date) {
            const providedDate = this.activityHistory.find(entry => entry.date === date)
            if(providedDate) {
                return providedDate.numSteps
            } else {
                const latestDate = this.activityHistory.slice(-1)
                return latestDate[0].numSteps
            }
        }

    returnMinutesActive(date) {
        const providedDate = this.activityHistory.find(entry => entry.date === date)
        if(providedDate) {
            return providedDate.minutesActive
        } else {
            const latestDate = this.activityHistory.slice(-1)
            return latestDate[0].minutesActive
        }
    }

    returnMilesWalked(date) {
        const providedDate = this.activityHistory.find(entry => entry.date === date)
        if(providedDate) {
            const miles = (providedDate.numSteps * this.currentUser.strideLength)/5280
            return Number(miles.toFixed(1))
        } else {
            const latestDate = this.activityHistory.slice(-1)
            const miles = (latestDate[0].numSteps * this.currentUser.strideLength)/5280
            return Number(miles.toFixed(1))
        }
    }

    checkStepGoal(date) {
        let providedDate = this.activityHistory.find(entry => entry.date === date)
        if(!providedDate) {
            providedDate = this.activityHistory.slice(-1)[0].date
        }
        if(providedDate.numSteps >= this.currentUser.dailyStepGoal) {
            this.stepGoalReached = true
        }
    }

    findReachedGoals(){
      const filteredData = this.activityHistory.filter(entry => entry.numSteps >= this.currentUser.dailyStepGoal)
      return filteredData
    }

    findAllTimeStairsRecord() {
      const sortedData = this.activityHistory.map(entry => entry).sort((a, b) => b.flightsOfStairs - a.flightsOfStairs)
      return sortedData[0].flightsOfStairs
    }

    findAvgMin(date){
        const pickedDay = this.activityHistory.findIndex(obj => {
            const dateIndex = obj.date === date 
            return Number(dateIndex)
        })
        let selectedWeek;
        if(pickedDay <= 6) {
            selectedWeek = this.activityHistory.slice(0, pickedDay + 1)
        } else {
            selectedWeek = this.activityHistory.slice((pickedDay - 6), pickedDay + 1)
        }
        const weeklyMeasure = selectedWeek.map(day => day.minutesActive)
        const avgMin = weeklyMeasure.reduce((acc, sum) => {
            acc += sum
            return acc
        }, 0)/weeklyMeasure.length
        return Number(avgMin.toFixed(1))
    }

    findAllUsersAvg(date, measure) {
        const filteredData = this.allData.filter(entry => entry.date === date)
        const avgData = filteredData.reduce((acc, entry) => {
            acc += entry[measure]
            return acc
        }, 0)/filteredData.length
        return Number(avgData.toFixed(1))
    }

    getWeeklyData(date, measure) {
        const pickedDay = this.activityHistory.findIndex(obj => {
          const dateIndex = obj.date === date 
          return Number(dateIndex)
        })
        let selectedWeek;
        if(pickedDay <= 6) {
          selectedWeek = this.activityHistory.slice(0, 7)
        } else {
          selectedWeek = this.activityHistory.slice((pickedDay - 6), pickedDay + 1)
        }
        const weeklyMeasure = selectedWeek.map(day => day[measure])
         return weeklyMeasure
      };
};



module.exports = Activity;