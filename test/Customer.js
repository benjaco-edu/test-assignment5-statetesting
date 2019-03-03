const chai = require('chai');
const itParam = require('mocha-param');
const parse = require('csv-parse/lib/sync')
const fs = require('fs');
chai.should();
let Customer = require('../app/Customer');


describe('Customer', function () {
    describe('Get discount', function () {

        // Repeated test using a loop
        for (let i = 0; i < 3; i++) {

            it(`Run #${i} - New customer cant have a loyalty card and coupon`, function () {
                (function () {
                    Customer.getDiscount(true, true, true)
                }).should.throw(Error);
            });

            it(`Run #${i} - New customer cant have a loyalty card`, function () {
                (function () {
                    Customer.getDiscount(true, true, false)
                }).should.throw(Error);
            });
        }

        // test cases for parameterized test
        let runWith = [
            [[true, false, true], {discount: .2, until: Customer._tomorrow()}],
            [[true, false, false], {discount: .15, until: Customer._tomorrow()}],
            [[false, true, true], {discount: .1, until: new Date(9999, 0)}],
            [[false, true, false], {discount: .1, until: new Date(9999, 0)}],
            [[false, false, true], {discount: .2, until: Customer._tomorrow()}],
            [[false, false, false], {discount: 0, until: null}],
        ];

        // simple paramerterized test
        runWith.forEach(function ([param, result]) {
            it(`simple loop - Customer.getDiscount(${param.join(", ")}) should be ${JSON.stringify(result)} (time in utc)`, function () {
                let discount = Customer.getDiscount(...param);
                discount.should.eql(result);
            })
        });


        // method paramerterized test
        // a function to output the test cases, a generator is used
        function* getTestCases() {
            for (let value of runWith) {
                yield value;
            }
        }

        for (const [param, result] of getTestCases()) {
            it(`from function - Customer.getDiscount(${param.join(", ")}) should be ${JSON.stringify(result)} (time in utc)`, function () {
                let discount = Customer.getDiscount(...param);
                discount.should.eql(result);
            })
        }

        // using a library
        itParam("Params test - Customer.getDiscount(${value[0].join(', ')}) should be ${JSON.stringify(value[1])} (time in utc)", runWith, function (value) {
            let discount = Customer.getDiscount(...value[0]);
            discount.should.eql(value[1]);
        });


        // inline csv example, a npm libery is used to parse the csv

        let csv = `
"newCustomer","loyaltyCard","coupon","discount"
1,0,1,.2
1,0,0,.15
0,1,1,.1
0,1,0,.1
0,0,1,.2
0,0,0,0`;

        for (let test of parse(csv, {
            columns: true,
            skip_empty_lines: true
        })) {
            it(`param csv test - Customer.getDiscount(${Boolean(parseInt(test.newCustomer))}, ${Boolean(parseInt(test.loyaltyCard))}, ${Boolean(parseInt(test.coupon))}) should have the discount of ${test.discount} `, function () {
                let discount = Customer.getDiscount(Boolean(parseInt(test.newCustomer)), Boolean(parseInt(test.loyaltyCard)), Boolean(parseInt(test.coupon)));
                discount.discount.should.equal(parseFloat(test.discount));
            })
        }

        // csv from a file

        for (let test of parse(fs.readFileSync(__dirname+"/customer_discount_testcases.csv"), {
            columns: true,
            skip_empty_lines: true
        })) {
            it(`param csv file test - Customer.getDiscount(${Boolean(parseInt(test.newCustomer))}, ${Boolean(parseInt(test.loyaltyCard))}, ${Boolean(parseInt(test.coupon))}) should have the discount of ${test.discount} `, function () {
                let discount = Customer.getDiscount(Boolean(parseInt(test.newCustomer)), Boolean(parseInt(test.loyaltyCard)), Boolean(parseInt(test.coupon)));
                discount.discount.should.equal(parseFloat(test.discount));
            })
        }

    })
})