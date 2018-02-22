var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});


connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});


function loadProducts() {
  // Selects all of the data from the MySQL products table
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.table(res);
    promptCustomerForItem(res);
  });
}

// Prompt the customer for a product ID
function promptCustomerForItem(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you would you like to purchase? [Quit with Q]",
        validate: function (val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function (val) {
      checkIfShouldExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      if (product) {
        promptCustomerForQuantity(product);
      }
      else {
        console.log("\nThat item is not in the inventory.");
        loadProducts();
      }
    });
}

// Prompt the customer for a product quantity
function promptCustomerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Quit with Q]",
        validate: function (val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function (val) {
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        loadProducts();
      }
      else {
        makePurchase(product, quantity);
      }
    });
}


// Purchase the desired quantity of the desired item
function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = product_sales + ? WHERE item_id = ?",
    [quantity, product.price * quantity, product.item_id],
    function (err, res) {
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      loadProducts();
    }
  );
}


// Check to see if the user wants to quit the program
function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "q") {
    console.log("Goodbye!");
    process.exit(0);
  }
}




// =================
// OLD CODE
// =================


// connection.connect(function(err) {
//   if (err) throw err;
//   setTimeout(()=> start(), 50);
// });

// function displayStore() {
//   connection.query("SELECT itemId, productName, price FROM products", function(err, res) {
//     if (err) throw err;
//     console.log("");
//     console.log("========== STORE CHOICES ==========");
//     console.log(res);
//     console.log("===================================");
//     console.log("");
//   });
//   purchase();
// }

// function start() {
//   inquirer
//   .prompt([
//     {
//       name: "startChoices",
//       type: "list",
//       message: "What would you like to do?",
//       choices: ["Shop", "Exit"]
//     }
//   ]).then(function(answer) {
//     if (answer.startChoices == "Shop") {
//       displayStore();
//     } else {
//       console.log("Get out of my sight! I don't need you munies!");
//       process.exit();
//     }
//   });
// }

// function purchase() {
//   connection.query('SELECT * FROM products', function(err, res) {
//     if (err) throw err;
//     inquirer
//     .prompt([
//       {
//         name: "choices",
//         type: "list",
//         choices: function() {
//           var choicesArray = [];
//           for (var i = 0; i < res.length; i++) {
//             choicesArray.push(res[i].productName);
//           }
//           return choicesArray;
//         },
//         message: "Which item would you like to purchase?"
//       },
//       {
//         name: "quantity",
//         type: "input",
//         message: "How many do you want to buy?",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       var chosenItem;
//       for (var i = 0; i < res.length; i++) {
//         if (res[i].productName === answer.choices) {
//           chosenItem = res[i];
//         }
//       }
//       if (chosenItem.stockQuantity - parseInt(answer.quantity) >= 0) {
//         connection.query('UPDATE products SET ? WHERE ?', [
//           {
//             stockQuantity: chosenItem.stockQuantity - parseInt(answer.quantity)
//           },
//           {
//             itemId: chosenItem.itemId
//           }
//         ],
//         function(err) {
//           if(err) throw err;
//           var price = chosenItem.price * parseInt(answer.quantity);
//           console.log("Total price is " + price + " dollars.");
//           start();
//         }
//       );
//     } else {
//       console.log('Not enough stock in the store to make purchase.');
//       start();
//     }
//   });
// });
// }
