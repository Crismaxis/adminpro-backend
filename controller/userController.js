const  bcrypt = require('bcryptjs');
const UserModel = require('../models/users');
const { generateJwt } = require('../helpers/jwt');

const getUser= async (req, res) => {

    const count = await UserModel.count();
    const page = Number(req.query.page) || 0 ;
    const limit = Number(req.query.limit) || 0 ;
    const data  = await UserModel.find().skip(page).limit(limit);
    res.json({
        usersTotal: count,
        users: data
    });
}

const createUser= async (req, res) => {
    try {
        const { email,password } = req.body;
        const isEmailExist  = await UserModel.findOne({ email });
        const user = new UserModel(req.body);
       
        if(isEmailExist){
            return res.status(400).json({
                "status":"Bad request",
                "content-text":'The email is already in use.'
            });
        }

        const salt = bcrypt.genSaltSync();
        user.password  = bcrypt.hashSync( password, salt );

        const jwt = await generateJwt(user._id);
        await user.save();
        
        res.status(200).json({
            "status":"Ok",
            "content-text":'User create',
            "user": user,
            "_token":jwt
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "status":"Error server",
            "content-text":'Error inesperado...'
        });        
    }
}


const updateUser = async (req,res)=>{
    try {
        const {email,google,...campos} = req.body;
        const _id = req.params.id;
        const userDB = await UserModel.findById(_id);

        if(!userDB) {
            return res.status(400).json({
                "status":"Bad request",
                "content-text":'User not found',
                "user-uid": _id
            });
        }

        if(userDB.email != email){
            const isEmailExist  = await UserModel.findOne({ email });
            if(isEmailExist){
                return res.status(400).json({
                    "status":"Bad request",
                    "content-text":'The email is already in use.',
                    "user-email":email
                });
            }
        }

        campos.email = email;
        const userUpdate = await UserModel.findByIdAndUpdate(_id,campos,{ new:true });

        res.status(200).json({
            "status":"Ok",
            "content-text":'User update',
            "user-uid": userUpdate
        });
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req,res)=>{
    try {
        const _id= req.params.id;
        const isUserDelete = await UserModel.findByIdAndDelete(_id);
        if(isUserDelete){
            res.status(200).json({
                "status":"Ok",
                "content-text":'User delete',
                "user-uid": _id
            });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    getUser,
    createUser,
    updateUser,
    deleteUser
}