class Account {


    constructor(balance = 0) {
        /**
         * @type {Number}
         * @private
         */
        this._id = null;
        /**
         * @type {number}
         * @private
         */
        this._balance = 0;
        /**
         * @type {number}
         * @private
         */
        this._discount = 0;
        /**
         * @type {Date}
         * @private
         */
        this._discountDay = null;

        this.setId = this.setId.bind(this);
        this.getId = this.getId.bind(this);
        this.setBalance = this.setBalance.bind(this);
        this.getBalance = this.getBalance.bind(this);
        this.deposit = this.deposit.bind(this);
        this.withdraw = this.withdraw.bind(this);
        this.getMonthlyInterestRate = this.getMonthlyInterestRate.bind(this);
        this.setDiscount = this.setDiscount.bind(this);

        this.setBalance(balance);
    }

    /**
     * @param {Number} id
     */
    setId(id) {
        if (id !== parseInt(id)) {
            throw new Error("Id has to be a whole number")
        }
        this._id = id;
    }

    /**
     * @returns {Number}
     */
    getId() {
        return this._id;
    }

    /**
     * @param {Number} balance
     */
    setBalance(balance) {
        if (balance !== parseFloat(balance) || balance < 0) {
            throw new Error("Balance has to be a positive number")
        }
        this._balance = balance;

    }

    /**
     * @returns {number}
     */
    getBalance() {
        return this._balance;
    }

    /**
     * @param {Number} amount
     */
    deposit(amount) {
        if (amount !== parseFloat(amount) || amount < 0) {
            throw new Error("Amount has to be a positive number")
        }

        this.setBalance(this._balance + amount);
    }

    /**
     * @param {Number} amount
     */
    withdraw(amount) {
        if (amount !== parseFloat(amount) || amount < 0) {
            throw new Error("Amount has to be a positive number")
        }

        this.setBalance(this._balance - amount);
    }

    /**
     * @returns {number}
     */
    getMonthlyInterestRate() {
        if (this._balance < 0) {
            return 0
        }
        if (this._balance <= 100) {
            return .03;
        }
        if (this._balance <= 1000) {
            return .05;
        }
        return .07;
    }

    /**
     * @param {Number} discount
     * @param {Date} untilDate
     */
    setDiscount(discount, untilDate) {
        if (discount !== parseFloat(discount) || discount < 0 || discount > 1) {
            throw new Error("Discount has to be between 0 and 1");
        }
        if (untilDate !== null || !untilDate instanceof Date) {
            throw new Error("UntilDate has to be null or a Date object")
        }
        this._discount = discount;
        this._discountDay = untilDate;
    }
}

module.exports = Account;