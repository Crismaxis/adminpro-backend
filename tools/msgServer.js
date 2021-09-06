const msgPort = ()=>{
    console.log('');
    console.log('   NODE SERVER'.green);
    console.log('');
    console.log('   PORT:  '+`${process.env.HOST}:${process.env.PORT}`.underline.blue);
    console.log('');
}

module.exports = {
    msgPort
}