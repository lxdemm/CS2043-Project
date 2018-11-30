var http = require('http');
var fs = require('fs'); //uses computer's file system
var url = require('url'); //to use urls
//var mysql = require('mysql');

/*var con = mysql.createConnection ({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})*/

const { Pool, Client } = require('pg');
//const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb';
const connectionString = 'postgres://emtsbrfqpupudx:0469831f945fc9d9acf6989b6418d3d2f46203558f6f11ffcfa9daf1e861c1e5@ec2-54-204-40-248.compute-1.amazonaws.com:5432/d343l27jvbbstv';

const pool = new Pool({
  connectionString: connectionString,
  ssl:true,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err,res);
  pool.end();
});

const client = new Client({
  connectionString: connectionString,
  ssl: true,
});
client.connect();

client.query('SELECT * FROM public."Student"', (err, res) => {
  console.log(err,res);
  client.end();
});

http.createServer(function (req, res) {
  var q = url.parse(req.url, true).pathname;
  var signUp = "SignUp.html";
  var homePage = "coursesFinalv3.html";
  //var filename = "." + q.pathname;
  switch(q) {
    case "/":
    fs.readFile(signUp, function(err, data) {
      if(err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
    break;

    case "/home":
    fs.readFile(homePage, function(err, data) {
      if(err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
    break;

    default:
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end("404 Not Found");
  }
}).listen(process.env.PORT || 80);
