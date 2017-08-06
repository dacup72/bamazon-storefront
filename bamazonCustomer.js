var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  setTimeout(()=> start(), 50);
});

function displayStore() {
  connection.query("SELECT itemId, productName, price FROM products", function(err, res) {
    if (err) throw err;
    console.log("");
    console.log("========== STORE CHOICES ==========");
    console.log(res);
    console.log("===================================");
    console.log("");
  });
  purchase();
}

function start() {
  inquirer
  .prompt([
    {
      name: "startChoices",
      type: "list",
      message: "What would you like to do?",
      choices: ["Shop", "Exit"]
    }
  ]).then(function(answer) {
    if (answer.startChoices == "Shop") {
      displayStore();
    } else {
      console.log('Get out of my sight!');
      process.exit();
    }
  });
}

function purchase() {
  connection.query(query, function(err, res) {
    if (err) throw err;
    inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "Input the item ID of the product you wish to purchase.",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many do you want to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var chosenItem;
      for (var i = 0; i < res.length; i++) {
        if (res[i].itemId === answer.item) {
          chosenItem = results[i].productName;
          console.log(chosenItem);
        }
      }
    });
  });
}


function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        quantity: 100
      },
      {
        flavor: "Rocky Road"
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
}
