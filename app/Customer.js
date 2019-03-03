const Account = require("./Account");


class Customer {

    /**
     * @param {String} name
     */
    constructor(name) {
        /**
         * @type {string}
         * @private
         */
        this._name = "";
        /**
         * @type {Account[]}
         * @private
         */
        this._accounts = [];
        /**
         * @type {Number}
         * @private
         */
        this._id = null;
        this.setName = this.setName.bind(this);
        this.getName = this.getName.bind(this);
        this.addAccount = this.addAccount.bind(this);
        this.getAllAccounts = this.getAllAccounts.bind(this);

        this.setName(name);
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
     * @param {String} name
     */
    setName(name) {
        if (typeof name !== "string") {
            throw new Error("Name has to be a string");
        }

        this._name = name;
    }

    /**
     * @returns {string}
     */
    getName() {
        return this._name;
    }

    /**
     * @param {Account} account
     */
    addAccount(account) {
        if (!account instanceof Account) {
            throw new Error("Account has to be an Account object")
        }
        this._accounts.push(account);
    }

    /**
     * @returns {Account[]}
     */
    getAllAccounts() {
        return this._accounts;
    }

    /**
     * @param {Boolean} newCustomer
     * @param {Boolean} loyaltyCard
     * @param {Boolean} coupon
     * @returns {Account}
     */
    newAccount(newCustomer, loyaltyCard, coupon) {
        if (typeof newCustomer !== "boolean" || typeof loyaltyCard !== "boolean" || typeof coupon !== "boolean") {
            throw new Error("All parameters has to be booleans")
        }

        let account = new Account();
        let discount = Customer.getDiscount(newCustomer, loyaltyCard, coupon);
        account.setDiscount(discount.discount, discount.until);

        this.addAccount(account);
        return account;
    }


    /**
     * @param {Boolean} newCustomer
     * @param {Boolean} loyaltyCard
     * @param {Boolean} coupon
     * @returns {{discount: Number, until: Date}}
     */
    static getDiscount(newCustomer, loyaltyCard, coupon) {
        if (typeof newCustomer !== "boolean" || typeof loyaltyCard !== "boolean" || typeof coupon !== "boolean") {
            throw new Error("All parameters has to be booleans")
        }
        if (newCustomer && loyaltyCard) {
            throw new Error("New customer cant have a loyalty card");
        }

        let untilTomorrow = Customer._tomorrow();
        let untilForever = new Date(9999, 0);

        if (loyaltyCard) {
            return {discount: .10, until: untilForever}
        }
        if (coupon) {
            return {discount: .20, until: untilTomorrow};
        }
        if (newCustomer) {
            return {discount: .15, until: untilTomorrow};
        }
        return {discount: .0, until: null}
    }

    /**
     * @returns {Date}
     * @private
     */
    static _tomorrow() {
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        date.setDate(date.getDate() + 1);
        return date;
    }

}

module.exports = Customer;