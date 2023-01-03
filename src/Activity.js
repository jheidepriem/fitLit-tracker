class Activity {
    constructor(userID, data) {
        this.id = userID
        this.activityHistory = data.filter((activityEntry) => activityEntry.userID === this.id)
        this.stepGoalReached = false
    };

    returnMinutesActive(date) {
        const providedDate = this.activityHistory.find(entry => entry.date === date)
        console.log('PROVIDED:', providedDate)
        if(providedDate) {
            return providedDate.minutesActive
        } else {
            const latestDate = this.activityHistory.slice(-1)
            return latestDate[0].minutesActive
        }
    }
};

module.exports = Activity;