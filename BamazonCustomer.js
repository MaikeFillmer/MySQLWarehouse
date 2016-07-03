//Import the MySQL library that was downloaded from NPM
var mysql = require('mysql');

//import prompt npm
var prompt = require('prompt');

//create properties for the connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: ""
})

//initiates connection to mysql database
connection.connect(function(err){
	if(err){
		console.log("error connecing: " + err.stack);
		return;
	}

	console.log("connected as id: " + connection.threadID);
	return;
});

//connect to the DB


//Perform a Query

connection.query("SELECT * FROM products", function(err,res){
	if(err) throw err;
	//console.log(res);



	for(i=0;i<res.length;i++){
		console.log("ID: " + res[i].ItemID + " Name: " + res[i].ProductName + " Price: " + res[i].Price);

	}

	prompt.start();

	prompt.get(["ItemID", "NumberofItems"],function(err, result) {
		//console.log(result);

		var item = result.ItemID;
		var arr = item-1;
		var num = result.NumberofItems;
		//console.log(res[arr].StockQuantity);
		if(num > res[arr].StockQuantity){
			console.log("Insufficient Quantity!");
		}
		else{
			//console.log("enough");

			var totalCost = num * res[arr].Price;
			console.log("Your Total Cost is: " + totalCost);
			var newNum = res[arr].StockQuantity - num;
			connection.query("UPDATE products SET ? WHERE ?", [{StockQuantity: newNum}, {ItemID: item}]);
		}



	})
	return;

});

//connection.