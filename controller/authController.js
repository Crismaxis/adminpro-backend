const UserModel = require('../models/users');
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt');

const login = async (req, res) =>{
    try {
        const { email,password } = req.body;
        const isEmailExist  = await UserModel.findOne({ email });
        
        if(!isEmailExist){
            return res.status(400).json({
                "status":"Bad request",
                "content-text":'The email not valid'
            });
        }
        const verifyPassword = bcrypt.compareSync(password, isEmailExist.password);
        if(!verifyPassword){
            return res.status(400).json({
                "status":"Bad request",
                "content-text":'The password not valid'
            });
        }

        const jwt = await generateJwt(isEmailExist.id);
        res.status(200).json({
            "status":"Ok",
            "content-text":'User authenticate',
            "_token": jwt
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    login
}