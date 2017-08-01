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
  displayStore();
  purchase();
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
}

function purchase() {
  inquirer
  .prompt([
    {
      name: "buyItem",
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
    var query = "SELECT productName FROM products WHERE itemId = ?";
    connection.query(query, { itemId: answer.buyItem }, function(err, res) {
      console.log(res);
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
