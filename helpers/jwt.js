const jwt = require('jsonwebtoken');

const generateJwt = (_id)=>{
    return new Promise((resolve,reject)=>{
        const payload = {
            _id
        }
        jwt.sign(payload,process.env.SECRET_KEY_JWT,{
            expiresIn:'12h'
        },(err, token)=>{
            if(err){
                reject(err);
            }else{
                resolve(token);
            }
        }
        );
    });
}

module.exports = {
    generateJwt
}