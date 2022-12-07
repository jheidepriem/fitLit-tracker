class Hydration {
    constructor(id) {
        this.id = id;
        this.userHistory = [];
    };

    filterUserHistory(hydrationData) {
        this.userHistory = hydrationData.filter((history) => {
            if(history.userID === this.id) {
                return history
            };
        });
    };

    getTotalOunces() {
        const sum = this.userHistory.reduce((total, day) => {
            return total += day.numOunces
        }, 0)
        return sum
    };

    getTotalAvg() {
        return this.getTotalOunces() / this.userHistory.length
    };

    getDailyOunces(day) {
        const dailyOunces = this.userHistory.find((entry) => {
            return entry.date === day
        })
        return dailyOunces.numOunces
    };

    getWeeklyOunces() {
        const weeklyHistory = this.userHistory.slice(-7)
        const weeklyOunces = weeklyHistory.map(day => day.numOunces)
        return weeklyOunces
    };
};

module.exports = Hydration;