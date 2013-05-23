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
    indexPath = __dirname + '/dist/index.html',
    favIcon = fs.readFileSync(__dirname + '/assets/images/favicon.ico'),
    port = 8000,
    server;

server = http.createServer(function(request, response) {
  console.log('request to:', request.url);

  if (request.url === '/favicon.ico') {
    response.writeHead(200, {'Content-Type': 'image/x-icon'});
    response.end(favIcon);
  } else {
    fs.readFile(indexPath, 'utf-8', function(error, data) {
      if (error) {
        console.log(error);

        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('soorrrrryyyyy.', 'utf-8');
      } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data, 'utf-8');
      }
    });
  }
}).listen(port, function() {
  console.log('Listening to port ' + port);
});
