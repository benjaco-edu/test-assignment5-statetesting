const CreditCard = require("./CreditCard");

class ATM {


    constructor() {
        /**
         * @type {CreditCard}
         * @private
         */
        this._creditCard = null;

        this.insert = this.insert.bind(this);
        this.eject = this.eject.bind(this);
        this.deposit = this.deposit.bind(this);
        this.withdraw = this.withdraw.bind(this);
        this.getBalance = this.getBalance.bind(this);
    }

    /**
     * @param creditCard
     * @param pinCode
     * @returns {boolean} Successfully inserted
     */
    insert(creditCard, pinCode) {
        this._mustNotHaveCreditcard();
        if (!creditCard instanceof CreditCard) {
            throw new Error("Creditcard has to be of type creditcard")
        }
        if (creditCard.hasAccount() === false) {
            throw new Error("Creditcard must have a account")
        }
        if (typeof pinCode !== "string" || pinCode.length !== 4) {
            throw new Error("Pincode has to be a 4 char string")
        }

        if (creditCard.isBlocked()) {
            return false;
        }

        if (creditCard.getPinCode() !== pinCode) {
            creditCard.addWrongPinCodeAttempt();
            if (creditCard.getWrongPinCodeAttempts() >= 3) {
                creditCard.setBlocked(true);
            }
            return false;
        }

        creditCard.resetWrongPinCodeAttempt();
        this._creditCard = creditCard;
        return true;
    }

    eject() {
        this._mustNotHaveCreditcard();
        this._creditCard = null;
    }

    /**
     * @param {Number} amount
     */
    deposit(amount) {
        this._mustHaveActiveCreditcard();
        if (amount !== parseFloat(amount) || amount < 0) {
            throw new Error("Amount has to be a positive number")
        }
        this._creditCard.getAccount().deposit(amount);
    }

    /**
     * @param {Number} amount
     */
    withdraw(amount) {
        this._mustHaveActiveCreditcard();
        if (amount !== parseFloat(amount) || amount < 0) {
            throw new Error("Amount has to be a positive number")
        }
        this._creditCard.getAccount().withdraw(amount);
    }

    /**
     * @returns {Number}
     */
    getBalance() {
        this._mustHaveActiveCreditcard();
        return this._creditCard.getAccount().getBalance();
    }

    /**
     * @returns {string}
     */
    getWelcomeMessage(){
        this._mustHaveActiveCreditcard();
        return `Hi, you have ${this.getBalance().toFixed(2)}$ on your account`;
    }


    _mustHaveActiveCreditcard() {
        if (this._creditCard === null) {
            throw new Error("No creditcard inserted")
        }
        // might be deactivated while it is in the machine depending on the implementation
        if (this._creditCard.hasAccount() === false) {
            throw new Error("Creditcard must have a account")
        }
    }

    _mustNotHaveCreditcard() {
        if (this._creditCard !== null) {
            throw new Error("Creditcard already inserted")
        }
    }
}

module.exports = ATM;