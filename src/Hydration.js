class Hydration {
    constructor(id, data) {
        this.id = id;
        this.userHistory = data.filter(obj => obj.userID === this.id);
    };

    getTotalOunces() {
        return this.userHistory.reduce((total, day) => {
            return total += day.numOunces;
        }, 0);
    };

    getTotalAvg() {
        return this.getTotalOunces() / this.userHistory.length;
    };

    getDailyOunces() {
        const dailyOunces = this.userHistory.slice(-1);
        if (dailyOunces.length > 0) { // What if it's empty?
            const data = dailyOunces[0] || {}; // what if it returned something that isn't an object? `dailyOunces[0].numOunces` would break.
            return data.numOunces;
        }
    };

    getWeeklyOunces() {
        const MAGIC_NUMBER = -7; // what does this represent?
        const weeklyHistory = this.userHistory.slice(MAGIC_NUMBER);
        return weeklyHistory.map(day => day.numOunces);
    };
};

module.exports = Hydration;
