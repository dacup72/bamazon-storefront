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

// Get all data from mySQL
function loadProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.table(res);
    loadManagerOptions(res);
  });
}


// Load the manager options and pass in the products data from the database
function loadManagerOptions(products) {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"],
      message: "What would you like to do?"
    })
    .then(function(val) {
      
    });
}
    