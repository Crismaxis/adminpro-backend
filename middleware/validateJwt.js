const jwt = require('jsonwebtoken');
const validateJwt = (req,res,next)=>{
    // Leer token
    const token = req.header('x-access-token');
    if(!token){
        return res.status(401).json({
            "status":"Unauthorized",
            "content-text":'You do not have permission to enter this page !'
        });
    }

    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY_JWT);
        if(_id){
            req.id=_id;
            next();
        }

    } catch (error) {
        return res.status(401).json({
            "status":"Unauthorized",
            "content-text":'Invalid token'
        });
    }
}

module.exports = {
    validateJwt
}