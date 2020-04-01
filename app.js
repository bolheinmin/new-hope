
// Imports dependencies and set up http server
const 
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express(); 



// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/new-hope'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/new-hope/index.html'));
});