var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
var colors = require("colors");

// create connection to mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootpass",
    database: "bamazon"
});

// connect to the database
connection.connect(function (err) {
    if (err) throw err;
    console.log("\nWelcome to my shop! The journey ahead is dangerous! Buy some stuff!\n")
    // prompt the user to purchase
    purchase();

});
var saleItem = 0;
var saleQuantity = 0;
var stockQuantity = 0;

// function prompts the user for item and quantity to purchase
function purchase() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        inquirer.prompt([{
            name: "itemId",
            type: "number",
            message: "Enter the item ID of the item you want to buy."
        },
        {
            name: "itemQuantity",
            type: "number",
            message: "Excellent Choice! How many would you like?"
        }]).then(function (answer) {
            saleItem = answer.itemId - 1;
            saleQuantity = answer.itemQuantity;
            checkInv()

        });

    });

};

// function to check inventory

function checkInv() {

    connection.query("SELECT * FROM products", function (err, res) {
        //console.log(res[item].product_name + res[item].department_name + res[item].price + res[item].stock_quantity);
        stockQuantity = res[saleItem].stock_quantity;
        console.log(res[saleItem].product_name + " saleItem: " + saleItem + " saleQuant: " + saleQuantity + "price: " + res[saleItem].price + " stockQuant: " + stockQuantity)
        if (err) throw err;
        //call the purchase function again
        if (res[saleItem].stock_quantity < saleQuantity) {
            console.log("\nI'm sorry, we don't have that many of those. We only have " + res[saleItem].stock_quantity + ".")
            purchase();

        } else {
            console.log("\nWord. Enjoy your " + res[saleItem].product_name + "!\n");
            transact()

        }
    })
};

// function completes transaction and updates inventory
function transact() {
    var newQuantity = stockQuantity - saleQuantity;
    console.log(saleItem);
    console.log(newQuantity)
    //var slItem = item;
    //var slQuantity = quantity;
    //var stQuantity = stock;
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newQuantity
            },
            {
                item_id: saleItem + 1
            }
        ], function (err, res) {
            //console.log(res[item].product_name + res[item].department_name + res[item].price + res[item].stock_quantity);
            if (err) throw err;
            console.log(res);
            console.log(res.affectedRows + " products updated!\n")
            console.log("Thank you! Please come again!");

        })
    connection.end();
};

