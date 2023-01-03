class Activity {
    constructor(userID, data) {
        this.id = userID
        this.activityHistory = data.filter((activityEntry) => activityEntry.userID === this.id)
    };
};

module.exports = Activity;