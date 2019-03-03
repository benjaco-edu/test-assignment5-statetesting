const chai = require('chai');
chai.should();
const itParam = require('mocha-param');


const Account = require("../app/Account");
const ATM = require("../app/ATM");
const CreditCard = require("../app/CreditCard");
const Customer = require("../app/Customer");


describe('ATM', function () {
    describe("Print welcome message", function () {

        itParam("Prints hi, you have ${value[1]}", [
                [5, "5.00"],
                [10, "10.00"],
                [11.2, "11.20"],
                [11.55, "11.55"]
            ],
            function (value) {
                let customer = new Customer("Ben");
                let account = customer.newAccount(false, false, false);
                account.setBalance(value[0]);
                let creditCard = new CreditCard();
                creditCard.setPinCode("1234");
                creditCard.setAccount(account);
                let atm = new ATM();

                atm.insert(creditCard, "1234");
                let message = atm.getWelcomeMessage();

                message.should.be.equal(`Hi, you have ${value[1]}$ on your account`)
            })

    });
})