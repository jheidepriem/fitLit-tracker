class Activity {
    constructor(data, user) {
        this.currentUser = user
        this.activityHistory = data.filter((activityEntry) => activityEntry.userID === this.currentUser.id)
        this.stepGoalReached = false
    };

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
};

module.exports = Activity;