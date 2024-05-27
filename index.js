const express = require('express');
const router = require('./routes/route');
const app = express();
require('dotenv').config();
require('./config/connection');
require('./models');

app.use(express.urlencoded({extended:true}))
app.use(express.json());
const port = process.env.PORT

app.use('/', router);
app.listen(port);