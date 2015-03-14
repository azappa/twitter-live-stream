/*jshint node:true, eqnull:true, laxcomma:true, undef:true, indent:2, camelcase:false, unused:true */
'use strict';


//  -- various reqs --
var Twitter = require('twit');

var router = require('router');
var route = router();
var finalhandler = require('finalhandler');

//  -- config app with socketio --
var app = require('http').createServer(function (req, res) {
  route(req, res, finalhandler(req, res));
});
var io = require('socket.io')(app);

var jade = require('jade');
var stylus = require('stylus');
var nib = require('nib');
var fs = require('fs');
var _static = require('node-static');
var _publicFiles = new _static.Server('./public', { headers: {'cache-control': 'no-cache, must-revalidate'}});







//  -- running app --
app.listen(process.env.PORT);


//  -- config Twitter module --
var twcfg = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};
var tw = new Twitter(twcfg);
var ts = tw.stream('statuses/filter', {track: process.env.HASHTAG});


//  -- build style --
stylus(fs.readFileSync('./public/s/css/style.styl', 'utf8'))
  .include(nib.path)
  .set('compress', true)
  .render(function(err, css) {
      if (err) { console.log(err); return; }
      //console.log(' ---> ', css);
      fs.writeFile('./public/s/css/style.css', css, function (err_) {
        if (err_) { 
          console.log(err_);
          return;
        }
      });
  });



//  -- routes --
route.get('/s/*', function (req, res) {
  _publicFiles.serve(req, res, function (err) {
    if (err) { 
      console.log(req.url, '\n', err); 
      return;
    }
  });
});


route.get('/', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(jade.renderFile('./views/index.jade', { hashtag: process.env.HASHTAG }));
});



//  -- socket.io events --
ts.on('tweet', function (tweet) {
  io.emit('tweet', tweet);
  //console.log(tweet);
});


ts.on('limit', function (limitMsg) {
  io.emit('error', limitMsg);
  console.log('Oh no!', limitMsg);
});


ts.on('disconnect', function (disconnectMsg) {
  io.emit('end', disconnectMsg);
  console.log('Oh no!', disconnectMsg);
});

