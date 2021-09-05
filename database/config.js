const mongoose = require('mongoose');

const connection = async() =>{
    try {
        await mongoose.connect(process.env.DB_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database: on')
    } catch (error) {
        console.log(error);        
    }
}

module.exports = {
    connection
}