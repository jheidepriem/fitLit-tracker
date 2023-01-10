class Activity {
  constructor(data, user) {
    this.currentUser = user;
    this.allData = data;
    this.activityHistory = data.filter(
      (activityEntry) => activityEntry.userID === this.currentUser.id
    );
    this.stepGoalReached = false;
  }

  returnActivity(measure, date) {
    const providedDate = this.activityHistory.find(
      (entry) => entry.date === date
    );
    if (providedDate) {
      return providedDate[measure];
    } else {
      const latestDate = this.activityHistory.slice(-1);
      return latestDate[0][measure];
    }
  }

  returnMilesWalked(date) {
    const providedDate = this.activityHistory.find(
      (entry) => entry.date === date
    );
    if (providedDate) {
      const miles =
        (providedDate.numSteps * this.currentUser.strideLength) / 5280;
      return Number(miles.toFixed(1));
    } else {
      const latestDate = this.activityHistory.slice(-1);
      const miles =
        (latestDate[0].numSteps * this.currentUser.strideLength) / 5280;
      return Number(miles.toFixed(1));
    }
  }

  checkStepGoal(date) {
    let providedDate = this.activityHistory.find(
      (entry) => entry.date === date
    );
    if (!providedDate) {
      providedDate = this.activityHistory.slice(-1)[0].date;
    }
    if (providedDate.numSteps >= this.currentUser.dailyStepGoal) {
      this.stepGoalReached = true;
    }
  }

  findReachedGoals() {
    const filteredData = this.activityHistory.filter(
      (entry) => entry.numSteps >= this.currentUser.dailyStepGoal
    );
    return filteredData;
  }

  findAllTimeStairsRecord() {
    const sortedData = this.activityHistory
      .map((entry) => entry)
      .sort((a, b) => b.flightsOfStairs - a.flightsOfStairs);
    return sortedData[0].flightsOfStairs;
  }

  findAvgMin(date) {
    const pickedDay = this.activityHistory.findIndex((obj) => {
      const dateIndex = obj.date === date;
      return Number(dateIndex);
    });
    let selectedWeek;
    if (pickedDay <= 6) {
      selectedWeek = this.activityHistory.slice(0, pickedDay + 1);
    } else {
      selectedWeek = this.activityHistory.slice(pickedDay - 6, pickedDay + 1);
    }
    const weeklyMeasure = selectedWeek.map((day) => day.minutesActive);
    const avgMin =
      weeklyMeasure.reduce((acc, sum) => {
        acc += sum;
        return acc;
      }, 0) / weeklyMeasure.length;
    return Number(avgMin.toFixed(1));
  }

  findAllUsersAvg(measure, date) {
    const latestDate = this.allData.slice(-1)[0].date;
    const filteredData = this.allData.filter((entry) => entry.date === date);
    const noDate = this.allData.filter((entry) => entry.date === latestDate);
    if (arguments.length === 2) {
      const avgData =
        filteredData.reduce((acc, entry) => {
          acc += entry[measure];
          return acc;
        }, 0) / filteredData.length;
      return Number(avgData.toFixed(1));
    } else {
      const avgNoDateData = noDate.reduce((acc, entry) => {
        acc += entry[measure];
        return acc;
      }, 0);
      const findAvg = avgNoDateData / noDate.length;
      return Number(findAvg.toFixed(1));
    }
  }

  getWeeklyData(date, measure) {
    const pickedDay = this.activityHistory.findIndex((obj) => {
      const dateIndex = obj.date === date;
      return Number(dateIndex);
    });
    let selectedWeek;
    if (pickedDay <= 6) {
      selectedWeek = this.activityHistory.slice(0, 7);
    } else {
      selectedWeek = this.activityHistory.slice(pickedDay - 6, pickedDay + 1);
    }
    const weeklyMeasure = selectedWeek.map((day) => day[measure]);
    return weeklyMeasure;
  }
}

module.exports = Activity;
