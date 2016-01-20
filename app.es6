const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const path = require('path');
const stylus = require('stylus');
const nib = require('nib');
const babelify = require('express-babelify-middleware');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app
  .set('port', process.env.PORT || 3000)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'jade');
app
  .use(
    stylus.middleware({
      src: path.join(__dirname, 's'),
      compile: (str, stylPath) => {
        return stylus(str)
                .set('filename', stylPath)
                .set('compress', true)
                .use(nib());
      },
    })
  )
  .use(bodyParser.urlencoded({
    extended: true,
  }))
  .use(methodOverride())
  .use('/js', babelify(__dirname + '/s/js/main.es6', {
    debug: false,
    cache: false,
    presets: ['es2015'],
    // @TODO not-work => only: /\.es6$/,
    minify: true,
  }))
  .use(express.static(path.join(__dirname, 's')))
  .use(errorHandler());


// Routes
app.route('/').get((req, res) => {
  res.render('index', {
    hashtag: process.env.HASHTAG,
  });
  return;
});


const PORT = app.get('port');
server.listen(PORT, () => {
  // console.log('Express server listening on port ' + PORT);
});

//  Twitter stream...
const Twit = require('twit');
const twcfg = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
};
const tw = new Twit(twcfg);
const ts = tw.stream('statuses/filter', { track: process.env.HASHTAG });
//  -- socket.io events --
ts.on('tweet', tweet => { io.emit('tweet', tweet); });
ts.on('limit', limitMsg => { io.emit('error', limitMsg); });
ts.on('disconnect', disconnectMsg => { io.emit('end', disconnectMsg); });
