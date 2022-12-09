class Hydration {
    constructor(id, data) {
        this.id = id;
        this.userHistory = data.filter((obj) => {
            if(obj.userID === this.id) {
                return obj
            }
        })
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

    getDailyOunces() {
        const dailyOunces = this.userHistory.slice(-1)
        return dailyOunces[0].numOunces
    };

    getWeeklyOunces() {
        const weeklyHistory = this.userHistory.slice(-7)
        const weeklyOunces = weeklyHistory.map(day => day.numOunces)
        return weeklyOunces
    };
};

module.exports = Hydration;