const DataMapper = require("../app/DataMapper");
const HashMapDB = require("../app/HashMapDB");
const ATM = require("../app/ATM");



(async () => {

    let dataSource = new HashMapDB(__dirname + "/../database.txt");
    await dataSource.init();

    let dataMapper = new DataMapper();
    dataMapper.setDataSource(dataSource);

    let atm = new ATM();
    atm.setDataMapper(dataMapper);

    let creditCard = await dataMapper.getCreditcard(2);

    let inserted = await atm.insert(creditCard, "1234");
    if (!inserted) {
        console.error("Card ejected");
        return;
    }

    console.log(atm.getWelcomeMessage());

    console.log(`Old balance: ${atm.getBalance()}`);
    atm.deposit(500);
    console.log(`New balance: ${atm.getBalance()}`);

    await atm.eject();

})();
