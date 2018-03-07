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
  if (err) throw err;
  console.log("connection successful!");
  makeTable();
});

// Shows table data in database
function makeTable() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    promptSupervisor();
  });
}

// Prompt supervisor to ask what they want to do
function promptSupervisor() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department", "Quit"]
      }
    ])
    .then(function(val) {
      if (val.choice === "View Product Sales by Department") {
        viewSales();
      }
      else if (val.choice === "Create New Department") {
        addDepartment();
      }
      else {
        console.log("Goodbye!");
        process.exit(0);
      }
    });
}


// Asking the user about the department they would like to add
function addDepartment() {
  inquirer
    .prompt([
      
      
    ])
    .then(function(val) {
      
    });
}


// Selects a few columns from the departments table, calculates a total_profit column
function viewSales() {
  
}