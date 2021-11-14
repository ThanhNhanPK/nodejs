let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let mysql = require("mysql");
let fs = require("fs");
let http= require('http');

var application_root = __dirname;

let mysql_opt = JSON.parse(fs.readFileSync(__dirname + "/config.json"));





// start http server.
function start_server() {
	let app = express();
	
	app.use(cors());
	app.options("*", cors());
	//app.use(express.json()) // for parsing application/json
	app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

	let jsonParser = bodyParser.json();	

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	app.post("/updatescore/shark", function (req, res) {
		 
		
		 res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
		//console.log(req.body);
		//console.log(jsonParser);
		
		var id=req.body.id;
		var updatedata=req.body.Score;
		var db=req.body.data;
		if (!req.body) {
			return res.sendStatus(400);
		}
		
		let connection = mysql.createConnection(mysql_opt);
		connection.connect();
		let sql_cmd = "UPDATE shark SET `Score`= ? WHERE shark.`id` = ?"
		connection.query(sql_cmd, [updatedata,id], function (err, rows, fields) {
			if (err) {
				res.sendStatus(500);
				return console.error(err);
			}
			res.send(req.body);
		});
		connection.end();
	});
	app.post("/userrank/shark", function (req, res) {
		 res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
		
		
		//console.log(req.body);
		//console.log(jsonParser);
		var id=req.body.id;
		var db=req.body.data;
		
		if (!req.body) {
			return res.sendStatus(400);
		}
		
		let connection = mysql.createConnection(mysql_opt);
		connection.connect();
		let sql_cmd = "SELECT id,MaDN, FullName, Score, FIND_IN_SET( Score, ( SELECT GROUP_CONCAT( Score ORDER BY Score DESC ) FROM shark ) ) AS rank FROM shark WHERE id = ?"
		connection.query(sql_cmd, [id], function (err, rows, fields) {
			if (err) {
				res.sendStatus(500);
				return console.error(err);
			}
			res.send(rows);
		});
		connection.end();
	});

	app.post("/get_top/shark", function (req, res) {
		res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
	
		var db=req.body.data;
		let data = [];
		let connection = mysql.createConnection(mysql_opt);
		connection.connect();
		let sql_cmd = "SELECT * FROM shark WHERE 1 ORDER BY shark.`Score` DESC LiMIT 0,10";
		connection.query(sql_cmd, function (err, rows, fields) {
			if (err) {
				res.sendStatus(500);
				console.error(err);
				return;
			}
			/*
			for (let i = 0; i < rows.length; i++) {
				data.push(JSON.parse(rows[i].data));
				console.error(rows[i].data);
			}
			*/
			res.send(rows);
		});
		connection.end();
	});
	app.post("/get_all/shark", function (req, res) {
		 // res.redirect('https://' + req.headers.host + req.url);
		// res.writeHead(301,{Location: `https://${req.headers.host}${req.url}`});
		//res.end();
		res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
			//console.log(req.body);
		var db=req.body.data;
		
		let data = [];
		let connection = mysql.createConnection(mysql_opt);
		connection.connect();
		let sql_cmd = "SELECT * FROM shark";
		connection.query(sql_cmd, function (err, rows, fields) {
			if (err) {
				res.sendStatus(500);
				console.error(err);
				return;
			}
			/*
			for (let i = 0; i < rows.length; i++) {
				data.push(JSON.parse(rows[i].data));
				console.error(rows[i].data);
			}
			*/
			res.send(rows);
		});
		connection.end();
	});
	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	app.post("/updatescore/diamon", function (req, res) {
		res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
   res.setHeader('Access-Control-Allow-Credentials', true); // If needed
	  // console.log(req.body);
	   //console.log(jsonParser);
	   
	   var id=req.body.id;
	   var updatedata=req.body.Score;
	   var db=req.body.data;
	   if (!req.body) {
		   return res.sendStatus(400);
	   }
	   
	   let connection = mysql.createConnection(mysql_opt);
	   connection.connect();
	   let sql_cmd = "UPDATE diamon SET `Score`= ? WHERE diamon.`id` = ?"
	   connection.query(sql_cmd, [updatedata,id], function (err, rows, fields) {
		   if (err) {
			   res.sendStatus(500);
			   return console.error(err);
		   }
		   res.send(req.body);
	   });
	   connection.end();
   });
   app.post("/userrank/diamon", function (req, res) {
		res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
   res.setHeader('Access-Control-Allow-Credentials', true); // If needed
	   
	   
	  // console.log(req.body);
	   //console.log(jsonParser);
	   var id=req.body.id;
	   var db=req.body.data;
	   
	   if (!req.body) {
		   return res.sendStatus(400);
	   }
	   
	   let connection = mysql.createConnection(mysql_opt);
	   connection.connect();
	   let sql_cmd = "SELECT id,MaDN, FullName, Score, FIND_IN_SET( Score, ( SELECT GROUP_CONCAT( Score ORDER BY Score DESC ) FROM diamon ) ) AS rank FROM diamon WHERE id = ?"
	   connection.query(sql_cmd, [id], function (err, rows, fields) {
		   if (err) {
			   res.sendStatus(500);
			   return console.error(err);
		   }
		   res.send(rows);
	   });
	   connection.end();
   });

   app.post("/get_top/diamon", function (req, res) {
	   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
   res.setHeader('Access-Control-Allow-Credentials', true); // If needed
   
	   var db=req.body.data;
	   let data = [];
	   let connection = mysql.createConnection(mysql_opt);
	   connection.connect();
	   let sql_cmd = "SELECT * FROM diamon WHERE 1 ORDER BY diamon.`Score` DESC LiMIT 0,10";
	   connection.query(sql_cmd, function (err, rows, fields) {
		   if (err) {
			   res.sendStatus(500);
			   console.error(err);
			   return;
		   }
		   /*
		   for (let i = 0; i < rows.length; i++) {
			   data.push(JSON.parse(rows[i].data));
			   console.error(rows[i].data);
		   }
		   */
		   res.send(rows);
	   });
	   connection.end();
   });
   app.post("/get_all/diamon", function (req, res) {
	   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
   res.setHeader('Access-Control-Allow-Credentials', true); // If needed
		  // console.log(req.body);
	   var db=req.body.data;
	   
	   let data = [];
	   let connection = mysql.createConnection(mysql_opt);
	   connection.connect();
	   let sql_cmd = "SELECT * FROM diamon";
	   connection.query(sql_cmd, function (err, rows, fields) {
		   if (err) {
			   res.sendStatus(500);
			   console.error(err);
			   return;
		   }
		   /*
		   for (let i = 0; i < rows.length; i++) {
			   data.push(JSON.parse(rows[i].data));
			   console.error(rows[i].data);
		   }
		   */
		   res.send(rows);
	   });
	   connection.end();
   });
	

	app.listen(3000, () => console.log("Performance test server app listening on port 3000!"));
	
	//http.createServer(app).listen(3000, () => console.log("Performance test server app listening on port 3000!"));
	}

start_server();