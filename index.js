require('dotenv').config();
require('./database/config.js').connection();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/',(req,res) => {
    res.json({
        msg:'correct'
    });
});

app.listen(process.env.PORT, ()=>{
    console.log('listening on port '+process.env.PORT);
});