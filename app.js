

var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/admin",require('./routes/admin'));
app.use("/doctors",require('./routes/doctors'));
app.use("/patients",require('./routes/patients'));
app.use("/appointments",require('./routes/appointments'));

module.exports = app;
