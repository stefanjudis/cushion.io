'use strict';

/*
 * cushion
 * https://github.com/Zoddy/cushion
 *
 * cushion-cli
 * https://github.com/stefanjudis/cushion-cli
 *
 * cushion.io
 * https://github.com/stefanjudis/cushion.io
 *
 * TAKE A SEAT, TAKE A CUSHION!!!!!
 *
 */

var fs = require('fs'),
    http = require('http'),
    server;

server = http.createServer(function(req, res) {
  //fs.readFile('dist/index.min.html', function(err, data) {
  fs.readFile('dist/index.html', function(err, data) {
    // show 404 page
    if (err) {
      console.log(err)
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8000);
console.log('Listening to port 8000');
