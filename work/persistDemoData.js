const CreditCard = require("../app/CreditCard");
const Account = require("../app/Account");
const DataMapper = require("../app/DataMapper");
const HashMapDB = require("../app/HashMapDB");



(async () => {

    let dataSource = new HashMapDB(__dirname + "/../database.txt");
    await dataSource.init();

    let dataMapper = new DataMapper();
    dataMapper.setDataSource(dataSource);

    let account1 = new Account(56);
    let creditCard1 = new CreditCard();
    creditCard1.setAccount(account1);
    creditCard1.setPinCode("8759");
    creditCard1.setLastUsed(new Date());
    await dataMapper.setAccount(account1);
    await dataMapper.setCreditcard(creditCard1);

    let account2 = new Account(12);
    let creditCard2 = new CreditCard();
    creditCard2.setAccount(account2);
    creditCard2.setPinCode("1234");
    creditCard2.setLastUsed(new Date());
    await dataMapper.setAccount(account2);
    await dataMapper.setCreditcard(creditCard2);

    let account3 = new Account(0.12);
    let creditCard3 = new CreditCard();
    creditCard3.setAccount(account3);
    creditCard3.setPinCode("9999");
    creditCard3.setLastUsed(new Date());
    creditCard3.setWrongPinCodeAttempts(3);
    creditCard3.setBlocked(true);
    await dataMapper.setAccount(account3);
    await dataMapper.setCreditcard(creditCard3);


})();
