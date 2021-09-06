const mongoose = require('mongoose');

const connection = async() =>{
    try {
        await mongoose.connect(process.env.DB_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('   DATABASE:'+'  On'.blue);
    } catch (error) {
        console.log(error);        
    }
}

module.exports = {
    connection
}