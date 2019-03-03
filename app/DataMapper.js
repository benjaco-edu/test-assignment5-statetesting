const CreditCard = require("./CreditCard");
const Account = require("./Account");


class DataMapper {


    constructor() {
        /**
         * @type {(HashMapDB|{get: function, set: function})}
         * @private
         */
        this._dataSource = null;


        this.setDataSource = this.setDataSource.bind(this);
        this.setCreditcard = this.setCreditcard.bind(this);
        this.getCreditcard = this.getCreditcard.bind(this);
        this.setAccount = this.setAccount.bind(this);
        this.getAccount = this.getAccount.bind(this);
        this._hasDataSource = this._hasDataSource.bind(this);
    }


    setDataSource(value) {
        if (typeof value.get !== "function" || typeof value.set !== "function") {
            throw new Error("Datasource have to have a set and get method")
        }
        this._dataSource = value;
    }

    /**
     * @param {CreditCard} creditCard
     */
    async setCreditcard(creditCard) {
        this._hasDataSource();
        if (!creditCard instanceof CreditCard) {
            throw new Error("Creditcard has to be of type Creditcard")
        }

        if(creditCard.getId() === null){
            let nextId = await this._dataSource.get("cc-id");
            if (nextId === null) {
                nextId = 1;
            }
            nextId = parseInt(nextId);

            creditCard.setId(nextId);

            await this._dataSource.set("cc-id", ++nextId);
        }

        await this._dataSource.set("cc-" + creditCard.getId(), JSON.stringify({
            id: creditCard.getId(),
            account_id: creditCard.getAccount().getId(),
            last_used: creditCard.getLastUsed(),
            pin_code: creditCard.getPinCode(),
            wrong_pin_code_attempts: creditCard.getWrongPinCodeAttempts(),
            blocked: creditCard.isBlocked()
        }));

        return creditCard;
    }

    /**
     * @param {Number} id
     * @return {CreditCard}
     */
    async getCreditcard(id) {
        this._hasDataSource();
        if (id !== parseInt(id)) {
            throw new Error("Id has to be a whole number")
        }

        let rawData =  await this._dataSource.get("cc-" + id);
        if (rawData === null) {
            return null;
        }
        rawData = JSON.parse(rawData);

        let creditCard = new CreditCard();
        creditCard.setId(rawData.id);
        creditCard.setAccount(await this.getAccount(rawData.account_id));
        creditCard.setLastUsed(new Date(rawData.last_used));
        creditCard.setPinCode(rawData.pin_code);
        creditCard.setWrongPinCodeAttempts(rawData.wrong_pin_code_attempts);
        creditCard.setBlocked(rawData.blocked);

        return creditCard;
    }

    /**
     * @param {Account} account
     */
    async setAccount(account) {
        this._hasDataSource();
        if (!account instanceof Account) {
            throw new Error("Account has to be of type Account")
        }

        if(account.getId() === null){
            let nextId = await this._dataSource.get("ac-id");
            if (nextId === null) {
                nextId = 1;
            }
            nextId = parseInt(nextId);

            account.setId(nextId);

            await this._dataSource.set("ac-id", ++nextId);
        }

        await this._dataSource.set("ac-"+account.getId(), JSON.stringify({
            id: account.getId(),
            balance: account.getBalance()
        }))

    }

    /**
     * @param id
     * @return {Account}
     */
    async getAccount(id) {
        this._hasDataSource();
        if (id !== parseInt(id)) {
            throw new Error("Id has to be a whole number")
        }

        let rawData =  await this._dataSource.get("ac-" + id);
        if (rawData === null) {
            return null;
        }
        rawData = JSON.parse(rawData);

        let account = new Account(rawData.balance);
        account.setId(rawData.id);
        return account;
    }

    _hasDataSource() {
        debugger
        if (this._dataSource === null) {
            throw new Error("No datasource")
        }
    }
}

module.exports = DataMapper;