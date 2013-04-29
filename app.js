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
    md = require('node-markdown').Markdown,
    pagePath = 'pages',
    server;

server = http.createServer(function(req, res) {
  'use strict';

  var page = req.url.replace('.html', '');

  fs.readFile(pagePath + page + '/README.md', 'utf-8', function(err, data) {
    // show 404 page
    if (err) {
      console.log(err)
      //some fance 404 function

      return
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(md(data));
    res.end();
  });
}).listen(8000);
