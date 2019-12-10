var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

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

// function prompts the user for item and quantity to purchase
function purchase() {
    let query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        inquirer.prompt([{
            name: "itemId",
            type: "input",
            message: "Enter the item ID of the item you want to buy."
        },
        {
            name: "itemQuantity",
            type: "number",
            message: "Excellent Choice! How many would you like?"
        }]).then(function (answer) {

            checkInv(answer.itemId, answer.itemQuantity)
            //connection.end();
        });

    });

};

// function to check inventory

function checkInv(item, quantity) {

    let query = connection.query("SELECT * FROM products", function (err, res) {
        let saleItem = item;
        let saleQuantity = quantity;
        let stockQuantity = res[saleItem].stock_quantity;
        if (err) throw err;
        if (isNaN(quantity)) {
            console.log("Yeah... that's not a number. Try again. With a NUMBER!")
            //call the purchase function again
        } else if (res[saleItem].stock_quantity < saleQuantity) {
            console.log("\nI'm sorry, we don't have that many of those. We only have " + res[saleItem].stock_quantity + ".")
        } else {
            console.log("\nWord. That'll be " + quantity * res[saleItem].price + " rupees.\n");
            transact(saleItem, saleQuantity, stockQuantity)
            connection.end();


        }
    })

};

// function completes transaction and updates inventory
function transact(item, quantity, stock) {
    let query = connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: stock - quantity
            },
            {
                item_id: item
            }
        ], function (err, res) {
            if (err) throw err;
            console.log("it works");
            console.table(res);

        })
};

