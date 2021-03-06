# Bamazon 

Bamazon is a CLI storefront app. On load, the app displays a table of items for sale. It displays item ID, item name, item price (this one is Zelda themed, so the dollars have been converted to rupies), and the current inventory for each item. There is also a Triforce. 

![Storefront](storefront.png)


It immediately prompts the user to enter the item ID of the item they want to purchase and how many of the they'd like. After checking that the order is in stock, the app confirms the sale and updates the inventory accordingly. 


## Technologies Used

Node.js, Javascript, mySQL, mySQL Workbench

Node Modules: inquirer (for input prompts), console.table (to display the inventory), colors (to style the messages)


## How It Works

For the database, I used mySQL and mySQL Workbench. The schema:

![Schema](schema.png)

The `purchase()` function uses inquirer to prompt the user to complete the transaction. Then, the `checkInv()` function queries the database to make sure the requested quantity doesn not exceed the stock quantity. If it does, the app displays a message saying as much and calls the `purchase()` function again. If not, it confirms the purchase, figures the total cost, and calls the `transact()` function. In the screen shot below, the user chose to purchase two "Bobgoblin Guts."     

![Transaction](transaction.png)

The `transact()` function updates the database. As shown below, the stock quantity of "Bobgoblin Guts" has decreased from 12 to 10.

![Updated-Database](updated-DB.png)

Finally, the app thanks the user and ends the connection to the database.


## Future

Stretch goals include a manager add-on for inventory control and a supervisor add-on for accounting.

Thanks for looking at my project.

Jed