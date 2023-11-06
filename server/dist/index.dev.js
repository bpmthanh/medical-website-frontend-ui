"use strict";

var express = require('express');

var path = require('path');

var app = express();
var buildDir = path.join(__dirname, '../build');
console.log('Using files in ' + buildDir);
var subDir = '/';
var logRequests = false;

if (subDir === '/') {
  console.log('The server config assuming it is serving at the server root. You can control this with the `subDir` variable in index.js.');
} else {
  console.log('The server config assuming it is serving at \'' + subDir + '\'.');
}

if (logRequests) {
  console.log('The server will log all incoming request. It\'s not recommended for production use.');
} // Serve the static files from the React app


app.use(subDir, express["static"](buildDir)); // Handles any requests that don't match the ones above

app.get('*', function (req, res) {
  if (logRequests) {
    console.log(req.method + ' ' + req.url);
  }

  res.sendFile(path.join(buildDir, 'index.html'));
});
var port = process.env.PORT || 6970;
app.listen(port);
console.log('React.JS App is running on the port ' + port);