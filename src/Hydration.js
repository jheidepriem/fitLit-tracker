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
};

module.exports = Hydration;