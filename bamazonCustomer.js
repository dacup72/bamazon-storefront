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


connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});


function loadProducts() {
  // Selects all of the data from the MySQL products table
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);

    
  });
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
