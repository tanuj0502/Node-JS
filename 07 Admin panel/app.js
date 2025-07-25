// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/admin-panel');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'adminsecret', resave: false, saveUninitialized: true }));

const adminRoutes = require('./routes/admin');
app.use('/', adminRoutes);

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
