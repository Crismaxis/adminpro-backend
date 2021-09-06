require('dotenv').config();
require('colors');
require('./database/config.js').connection();
const { msgPort } = require('./tools/msgServer');
const express = require('express');
const cors = require('cors');
const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());
app.use(require('./router/rest-router.js'));

app.listen(process.env.PORT, ()=>{
    msgPort();
});