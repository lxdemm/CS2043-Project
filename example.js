var http = require('http');
var fs = require('fs'); //uses computer's file system
var url = require('url'); //to use urls
//var mysql = require('mysql');

/*var con = mysql.createConnection ({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "Heyh00heyy!"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})*/

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

    case "/coursesFinal.html":
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
