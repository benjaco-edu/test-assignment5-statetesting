# Test assignment 5 - more bank system

https://github.com/datsoftlyngby/soft2019spring-test/blob/master/Assignments/05%20Dependencies%20Assignment.pdf

![Assignment definition](https://raw.githubusercontent.com/benjaco-edu/test-assignment5-statetesting/master/assignment_p1.png)

![Assignment definition](https://raw.githubusercontent.com/benjaco-edu/test-assignment5-statetesting/master/assignment_p2.png)

![Assignment definition](https://raw.githubusercontent.com/benjaco-edu/test-assignment5-statetesting/master/assignment_p3.png)

#### 1

All the code for the banking system has been implemented and can be found in the src/ folder.

#### 2

I have used the hashmap file store we created in the first database assignment so the reviewer easier could get the code up and running, it didnt feel like it was import to use a relational database for this assignment. It might be a little stupid, but it is not going to be production code.

#### 3

The script work/persistDemoData.js creates some test data

#### 4

The script app/DataMapper.js uses the hash map database to store and retrieve account and credit cards, it converts to and from json when a item is stored and restored

#### 5

The script app/ATM.js has been modified to read and write to the database through the data mapper class.

#### 6

Tha ATM has been used in work/useATM.js.

call `node work/persistDemoData.js` then `node work/useATM.js`

##### 7

Mock, stubs and spies has been used.

Spies has been used to ensure that all the relevant methods testes if there is a creditcard in the atm before it do the action.

Stubs has been used to simply return a balance to test the welcome message.

Mocks has been used to test the data mapper in the interaction test.


## Result of the test

```
npm test

> test-bank-system@1.0.0 test /home/benjamin/Desktop/test-assignment5-statetesting
> mocha



(node:13170) ExperimentalWarning: queueMicrotask() is experimental.
  ATM
    ✓ check it the card is inserted when eject
    ✓ check it the card is inserted when deposit
    ✓ check it the card is inserted when withdraw
    ✓ check it the card is inserted when getBalance
    ✓ check it the card is inserted when getWelcomeMessage
    ✓ returns the right message
    interactions
      ✓ have funds -> no funds -> have funds -> eject
      ✓ no funds -> have funds -> no funds -> eject

  Account
    Get monthly interest
      equivalence partitioning testing
        ✓ Works with 35
        ✓ Works with 864
        ✓ Works with 1598
      Boundary values
        ✓ -1 throws
        ✓ Works with 0
        ✓ Works with 1
        ✓ Works with 99.9
        ✓ Works with 100
        ✓ Works with 101
        ✓ Works with 999d.9
        ✓ Works with 1000
        ✓ Works with 1001

  Customer
    Get discount
      ✓ Run #0 - New customer cant have a loyalty card and coupon
      ✓ Run #0 - New customer cant have a loyalty card
      ✓ Run #1 - New customer cant have a loyalty card and coupon
      ✓ Run #1 - New customer cant have a loyalty card
      ✓ Run #2 - New customer cant have a loyalty card and coupon
      ✓ Run #2 - New customer cant have a loyalty card
      ✓ simple loop - Customer.getDiscount(true, false, true) should be {"discount":0.2,"until":"2019-03-04T23:00:00.000Z"} (time in utc)
      ✓ simple loop - Customer.getDiscount(true, false, false) should be {"discount":0.15,"until":"2019-03-04T23:00:00.000Z"} (time in utc)
      ✓ simple loop - Customer.getDiscount(false, true, true) should be {"discount":0.1,"until":"9998-12-31T23:00:00.000Z"} (time in utc)
      ✓ simple loop - Customer.getDiscount(false, true, false) should be {"discount":0.1,"until":"9998-12-31T23:00:00.000Z"} (time in utc)
      ✓ simple loop - Customer.getDiscount(false, false, true) should be {"discount":0.2,"until":"2019-03-04T23:00:00.000Z"} (time in utc)
      ✓ simple loop - Customer.getDiscount(false, false, false) should be {"discount":0,"until":null} (time in utc)
      ✓ from function - Customer.getDiscount(true, false, true) should be {"discount":0.2,"until":"2019-03-04T23:00:00.000Z"} (time in utc)
      ✓ from function - Customer.getDiscount(true, false, false) should be {"discount":0.15,"until":"2019-03-04T23:00:00.000Z"} (time in utc)
      ✓ from function - Customer.getDiscount(false, true, true) should be {"discount":0.1,"until":"9998-12-31T23:00:00.000Z"} (time in utc)
      ✓ from function - Customer.getDiscount(false, true, false) should be {"discount":0.1,"until":"9998-12-31T23:00:00.000Z"} (time in utc)
      ✓ from function - Customer.getDiscount(false, false, true) should be {"discount":0.2,"until":"2019-03-04T23:00:00.000Z"} (time in utc)
      ✓ from function - Customer.getDiscount(false, false, false) should be {"discount":0,"until":null} (time in utc)
      ✓ Params test - Customer.getDiscount(true, false, true) should be {"discount":0.2,"until":"2019-03-04T23:00:00.000Z"} (time in utc)
      ✓ Params test - Customer.getDiscount(true, false, false) should be {"discount":0.15,"until":"2019-03-04T23:00:00.000Z"} (time in utc)
      ✓ Params test - Customer.getDiscount(false, true, true) should be {"discount":0.1,"until":"9998-12-31T23:00:00.000Z"} (time in utc)
      ✓ Params test - Customer.getDiscount(false, true, false) should be {"discount":0.1,"until":"9998-12-31T23:00:00.000Z"} (time in utc)
      ✓ Params test - Customer.getDiscount(false, false, true) should be {"discount":0.2,"until":"2019-03-04T23:00:00.000Z"} (time in utc)
      ✓ Params test - Customer.getDiscount(false, false, false) should be {"discount":0,"until":null} (time in utc)
      ✓ param csv test - Customer.getDiscount(true, false, true) should have the discount of .2
      ✓ param csv test - Customer.getDiscount(true, false, false) should have the discount of .15
      ✓ param csv test - Customer.getDiscount(false, true, true) should have the discount of .1
      ✓ param csv test - Customer.getDiscount(false, true, false) should have the discount of .1
      ✓ param csv test - Customer.getDiscount(false, false, true) should have the discount of .2
      ✓ param csv test - Customer.getDiscount(false, false, false) should have the discount of 0
      ✓ param csv file test - Customer.getDiscount(true, false, true) should have the discount of .2
      ✓ param csv file test - Customer.getDiscount(true, false, false) should have the discount of .15
      ✓ param csv file test - Customer.getDiscount(false, true, true) should have the discount of .1
      ✓ param csv file test - Customer.getDiscount(false, true, false) should have the discount of .1
      ✓ param csv file test - Customer.getDiscount(false, false, true) should have the discount of .2
      ✓ param csv file test - Customer.getDiscount(false, false, false) should have the discount of 0


  56 passing (63ms)

```

## Run it

Run `npm install` and the the shown commandos (requires node)

Or run it with docker

`sudo docker run -it --rm bslcphbussiness/test-assignment-5-statetesting`