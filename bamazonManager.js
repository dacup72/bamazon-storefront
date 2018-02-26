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
  loadManagerMenu();
});

// Get product data from the database
function loadManagerMenu() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
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
      switch (val.choice) {
      case "View Products for Sale":
        console.table(products);
        loadManagerMenu();
        break;
      case "View Low Inventory":
        loadLowInventory();
        break;
      case "Add to Inventory":
        addToInventory(products);
        break;
      case "Add New Product":
        addNewProduct(products);
        break;
      default:
        console.log("Goodbye!");
        process.exit(0);
        break;
      }
    });
}


// Query the DB for low inventory products
function loadLowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
    if (err) throw err;
    console.table(res);
    loadManagerMenu();
  });
}

// Prompt the manager for a product to replenish
function addToInventory(inventory) {
  
}

// Ask for the quantity that should be added to the chosen product
function promptManagerForQuantity(product) {
  
}

// Gets all departments, then gets the new product info, then inserts the new product into the db
function addNewProduct() {
  
}