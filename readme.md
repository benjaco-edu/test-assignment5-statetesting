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