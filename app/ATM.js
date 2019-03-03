const CreditCard = require("./CreditCard");
const DataMapper = require("./DataMapper");

class ATM {


    constructor() {
        /**
         * @type {CreditCard}
         * @private
         */
        this._creditCard = null;
        /**
         * @type {DataMapper}
         * @private
         */
        this._dataMapper = null;

        this.insert = this.insert.bind(this);
        this.eject = this.eject.bind(this);
        this.deposit = this.deposit.bind(this);
        this.withdraw = this.withdraw.bind(this);
        this.getBalance = this.getBalance.bind(this);
    }

    setDataMapper(dataMapper){
        if (!dataMapper instanceof DataMapper) {
            throw new Error("Daatamapper has to be of type DataMapper")
        }
        this._dataMapper = dataMapper;
    }

    /**
     * @param creditCard
     * @param pinCode
     * @returns {boolean} Successfully inserted
     */
    async insert(creditCard, pinCode) {
        this._mustHaveDataMapper();
        this._mustNotHaveCreditcard();
        if (!creditCard instanceof CreditCard) {
            throw new Error("Creditcard has to be of type creditcard")
        }
        if (creditCard.getId() === null || await this._dataMapper.getCreditcard(creditCard.getId()) === null) {
            throw new Error("Creditcard not found in database")
        }

        if (creditCard.hasAccount() === false) {
            throw new Error("Creditcard must have a account")
        }

        if (await this._dataMapper.getAccount(creditCard.getAccount().getId()) === null) {
            throw new Error("No account found for creditcard found in database")
        }

        if (typeof pinCode !== "string" || pinCode.length !== 4) {
            throw new Error("Pincode has to be a 4 char string");
        }

        if (creditCard.isBlocked()) {
            return false;
        }
        this._creditCard = creditCard;

        if (this._creditCard.getPinCode() !== pinCode) {
            this._creditCard.addWrongPinCodeAttempt();
            if (this._creditCard.getWrongPinCodeAttempts() >= 3) {
                this._creditCard.setBlocked(true);
            }
            await this.eject();
            return false;
        }

        this._creditCard.resetWrongPinCodeAttempt();
        this._creditCard.setLastUsed(new Date());
        return true;
    }

    async eject() {
        this._mustHaveDataMapper();
        this._mustHaveCreditcard();

        await this._dataMapper.setAccount(this._creditCard.getAccount());
        await this._dataMapper.setCreditcard(this._creditCard);

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
        this._mustHaveCreditcard();
        // might be deactivated while it is in the machine depending on the implementation
        if (this._creditCard.hasAccount() === false) {
            throw new Error("Creditcard must have a account")
        }
    }

    _mustHaveCreditcard() {
        if (this._creditCard === null) {
            throw new Error("No creditcard inserted")
        }
    }

    _mustNotHaveCreditcard() {
        if (this._creditCard !== null) {
            throw new Error("Creditcard already inserted")
        }
    }
    _mustHaveDataMapper() {
        if (this._dataMapper === null) {
            throw new Error("No datamapper")
        }
    }
}

module.exports = ATM;