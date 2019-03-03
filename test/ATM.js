const chai = require('chai');
chai.should();
const itParam = require('mocha-param');
var sinon = require('sinon');

const Account = require("../app/Account");
const ATM = require("../app/ATM");
const CreditCard = require("../app/CreditCard");
const Customer = require("../app/Customer");
const DataMapper = require("../app/DataMapper");


describe('ATM', function () {

    // use a spice to se if the atm machine reads and writes to the datamap

    it("check it the card is inserted when eject", async function () {
        let atm = new ATM();
        let dataMapper = new DataMapper();
        dataMapper.setDataSource({
            get: () => {
            }, set: () => {
            }
        });
        atm.setDataMapper(dataMapper);

        let spy = sinon.spy(atm, '_mustHaveCreditcard');
        let spydatamapper = sinon.spy(atm, '_mustHaveDataMapper');

        try {
            await atm.eject();
        } catch (e) {
        }

        spy.callCount.should.be.equal(1);
        spydatamapper.callCount.should.be.equal(1);
    });
    it("check it the card is inserted when deposit", function () {
        let atm = new ATM();
        let spy = sinon.spy(atm, '_mustHaveActiveCreditcard');

        try {
            atm.deposit();
        } catch (e) {
        }

        spy.callCount.should.be.equal(1);
    });
    it("check it the card is inserted when withdraw", function () {
        let atm = new ATM();
        let spy = sinon.spy(atm, '_mustHaveActiveCreditcard');

        try {
            atm.withdraw();
        } catch (e) {
        }

        spy.callCount.should.be.equal(1);
    });
    it("check it the card is inserted when getBalance", function () {
        let atm = new ATM();
        let spy = sinon.spy(atm, '_mustHaveActiveCreditcard');

        try {
            atm.getBalance();
        } catch (e) {
        }

        spy.callCount.should.be.equal(1);
    });
    it("check it the card is inserted when getWelcomeMessage", function () {
        let atm = new ATM();
        let spy = sinon.spy(atm, '_mustHaveActiveCreditcard');

        try {
            atm.getWelcomeMessage();
        } catch (e) {
        }

        spy.callCount.should.be.equal(1);
    });


    // use a stub to test it
    // test the amt message with a stub
    it("returns the right message", function () {
        let atm = new ATM();
        sinon.stub(atm, '_mustHaveActiveCreditcard');
        sinon.stub(atm, 'getBalance').callsFake(() => 5);

        atm.getWelcomeMessage().should.be.equal("Hi, you have 5.00$ on your account");
    });

    // use a mock to test it - check
    // test states - check
    describe("interactions", function () {
        it("have funds -> no funds -> have funds -> eject", async function () {
            let dataMapper = new DataMapper();
            dataMapper.setDataSource({
                get: () => {
                }, set: () => {
                }
            });

            let dataMapperMock = sinon.mock(dataMapper);
            dataMapperMock.expects("getCreditcard").withArgs(1).returns(new CreditCard());
            dataMapperMock.expects("getAccount").withArgs(1).returns(new Account());
            dataMapperMock.expects("setCreditcard").withArgs(sinon.match.object);


            let customer = new Customer("");
            let account = customer.newAccount(false, false, false);
            account.setBalance(500);
            account.setId(1);
            let creditCard = new CreditCard();
            creditCard.setId(1);
            creditCard.setPinCode("1234");
            creditCard.setAccount(account);

            let atm = new ATM();

            atm.setDataMapper(dataMapper);
            await atm.insert(creditCard, "1234");


            atm.getBalance().should.be.equal(500);
            atm.withdraw(500);
            atm.getBalance().should.be.equal(0);
            atm.deposit(700);
            atm.getBalance().should.be.equal(700);
            await atm.eject();

            dataMapperMock.restore();
            dataMapperMock.verify()
        });
        it("no funds -> have funds -> no funds -> eject", async function () {
            let dataMapper = new DataMapper();
            dataMapper.setDataSource({
                get: () => {
                }, set: () => {
                }
            });

            let dataMapperMock = sinon.mock(dataMapper);
            dataMapperMock.expects("getCreditcard").withArgs(1).returns(new CreditCard());
            dataMapperMock.expects("getAccount").withArgs(1).returns(new Account());
            dataMapperMock.expects("setCreditcard").withArgs(sinon.match.object);


            let customer = new Customer("");
            let account = customer.newAccount(false, false, false);
            account.setBalance(0);
            account.setId(1);
            let creditCard = new CreditCard();
            creditCard.setId(1);
            creditCard.setPinCode("1234");
            creditCard.setAccount(account);

            let atm = new ATM();
            atm.setDataMapper(dataMapper);
            await atm.insert(creditCard, "1234");


            atm.getBalance().should.be.equal(0);
            atm.deposit(700);
            atm.getBalance().should.be.equal(700);
            atm.withdraw(700);
            atm.getBalance().should.be.equal(0);
            await atm.eject();

            dataMapperMock.restore();
            dataMapperMock.verify()
        });
    })
});