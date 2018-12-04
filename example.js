var http = require('http');
var fs = require('fs'); //uses computer's file system
var url = require('url'); //to use urls

const { Pool, Client } = require('pg');
//const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb';
const connectionString = 'postgres://emtsbrfqpupudx:0469831f945fc9d9acf6989b6418d3d2f46203558f6f11ffcfa9daf1e861c1e5@ec2-54-204-40-248.compute-1.amazonaws.com:5432/d343l27jvbbstv';

const pool = new Pool({
  connectionString: connectionString,
  ssl:true,
});

/*pool.query('SELECT NOW()', (err, res) => {
  console.log(err,res);
  pool.end();
});*/

const client = new Client({
  connectionString: connectionString,
  ssl: true,
});
client.connect();

/*const testq = {
  text: 'INSERT INTO public."Student"("First_Name", "Last_Name", "Student_Email", "Student_ID", "Username", "Password") VALUES($1, $2, $3, $4, $5, $6)',
  values: ['Jane', 'Doe', 'jane@email.com', 1, 'jane_doe', 'password'],
};

client.query(testq, (err, res) => {
  console.log(err,res);
  client.end();
});*/
console.log('Running on port 80')
http.createServer(function (req, res) {
  var q = url.parse(req.url, true).pathname;
  var signUp = "SignUp.html";
  var homePage = "coursesFinalv3.html";
  //var filename = "." + q.pathname;
  switch(q) {
    case "/":
    console.log('HERE')
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

    case "/student":
    console.log('student!')
    console.log(req.method)
    switch(req.method){
      case 'GET':
        console.log('need to qwueery for student')
        break;

      case 'POST':
        console.log(req.body) // undefined
    }
    //console.log(req)
    return res.end('good here')
    break;

    default:
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end("404 Not Found");
  }
}).listen(process.env.PORT || 80);
