var express = require('express');
var app = express();
var indexRoute = require('./index');
app.use(function (req, res, next) {
  indexRoute(req, res, next);
});
app.listen(9000);
