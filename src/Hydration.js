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
            return total += day.numOunces;
        }, 0);
        return sum;
    };

    getTotalAvg() {
        return this.getTotalOunces() / this.userHistory.length;
    };
};

module.exports = Hydration;