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
  var url = (req.url === '/') ? '/index.html' : req.url,
      path = 'dist' + url,
      urlSplit = url.split('.'),
      contentType = urlSplit[urlSplit.length - 1] || 'html';

  if (contentType === 'js') {
    contentType = 'javascript';
  }

  fs.readFile(path, function(err, data) {
    // show 404 page
    if (err) {
      console.log(err);

      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write('soorrrrryyyyy.');
      res.end();

      return;
    }

    res.writeHead(200, {'Content-Type': 'text/' + contentType});
    res.write(data);
    res.end();
  });
}).listen(8000);
console.log('Listening to port 8000');
