class Hydration {
    constructor(id, hydrationData) {
        this.id = id;
        this.userHistory = hydrationData.filter((history) => {
            if(history.userID === this.id) {
                return history;
            };
        });
    };
};

module.exports = Hydration;