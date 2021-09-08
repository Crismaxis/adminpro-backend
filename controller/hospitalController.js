const hospitalModel = require('../models/hospital');

const getHospital= async (req, res) => {

    const count = await hospitalModel.count();
    const data  = await hospitalModel.find().populate('user','name');
    res.json({
        hospitalTotal: count,
        hospital: data
    });
}

const createHospital= async (req, res) => {
    try {
        const hospital = new hospitalModel({
            user: req.id,
            ...req.body
        });

        await hospital.save();
        
        res.status(200).json({
            "status":"Ok",
            "content-text":'Hospital create',
            "hospital": hospital
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "status":"Error server",
            "content-text":'Error inesperado...'
        });        
    }
}


const updateHospital = async (req,res)=>{
    try {
        const {google,...campos} = req.body;
        const _id = req.params.id;
        const hospitalDB = await hospitalModel.findById(_id);
        if(!hospitalDB) {
            return res.status(400).json({
                "status":"Bad request",
                "content-text":'Hospital not found',
                "hospital": _id
            });
        }
        const hospitalUpdate = await hospitalModel.findByIdAndUpdate(_id,campos,{ new:true });

        res.status(200).json({
            "status":"Ok",
            "content-text":'Hospital update',
            "hospital-id": hospitalUpdate
        });
    } catch (error) {
        const _id = req.params.id;
        res.status(400).json({
            "status":"Bad request",
            "content-text":'Hospital not found',
            "hospital": _id
        });
    }
}

const deleteHospital = async (req,res)=>{
    try {
        const _id= req.params.id;
        const isHospitalDelete = await hospitalModel.findByIdAndDelete(_id);
        if(isHospitalDelete){
            res.status(200).json({
                "status":"Ok",
                "content-text":'Hospital delete',
                "hospital-uid": _id
            });
        }
    } catch (error) {
        const _id = req.params.id;
        res.status(400).json({
            "status":"Bad request",
            "content-text":'Hospital not found',
            "hospital": _id
        });
    }
}

module.exports ={
    getHospital,
    createHospital,
    updateHospital,
    deleteHospital
}