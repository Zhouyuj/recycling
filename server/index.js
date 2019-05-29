const express = require('express');
const path = require('path');
const app = express();
// const history = require('connect-history-api-fallback');

// health check url
app.get('/api/capabilities', function(req, res, next) {
  res.status(200).send('capabilities');
});

/**
 * spa use html5history mode
 * must be placed before static resource
 * must be placed after logic
 */
// app.use(history());
// 中间件的资源公开
app.use(express.static(path.join(__dirname, '../dist')));

// 默认重定向到根目录下
app.use('/', function(req, res, next) {
  res.redirect('/');
});

// app.use(function (req, res, next) {
//     if (req.path.indexOf('/api') >= 0){
//         next();
//     } else { //angular启动页
//         res.sendfile('web-client/index.html');
//     }
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const server = app.listen(9999, function() {
  const host = server.address().address;
  const port = server.address().port;
  /* eslint-disable no-console */
  console.log('Example app listening at http://%s:%s', host, port);
});
