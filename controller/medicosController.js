const medicosModel = require('../models/medicos');

const getMedicos= async (req, res) => {

    const count = await medicosModel.count();
    const data  = await medicosModel.find().populate('user','name').populate('hospital','name');
    res.json({
        medicosTotal: count,
        medicos: data
    });
}

const createMedicos= async (req, res) => {
    try {
        const medicos = new medicosModel({
            user: req.id,
            ...req.body
        });

        await medicos.save();
        
        res.status(200).json({
            "status":"Ok",
            "content-text":'Medico create',
            "medico": medicos
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "status":"Error server",
            "content-text":'Error inesperado...'
        });        
    }
}


const updateMedicos = async (req,res)=>{
    try {
        const {google,...campos} = req.body;
        const _id = req.params.id;
        const medicosDB = await medicosModel.findById(_id);
        if(!medicosDB) {
            return res.status(400).json({
                "status":"Bad request",
                "content-text":'Medico not found',
                "medico-id": _id
            });
        }
        const medicosUpdate = await medicosModel.findByIdAndUpdate(_id,campos,{ new:true });

        res.status(200).json({
            "status":"Ok",
            "content-text":'Medico update',
            "medico": medicosUpdate
        });
    } catch (error) {
        const _id = req.params.id;
        res.status(400).json({
            "status":"Bad request",
            "content-text":'Medico not found',
            "medico-id": _id
        });
    }
}

const deleteMedicos = async (req,res)=>{
    try {
        const _id= req.params.id;
        const ismedicosDelete = await medicosModel.findByIdAndDelete(_id);
        if(ismedicosDelete){
            res.status(200).json({
                "status":"Ok",
                "content-text":'Medico delete',
                "medicos-uid": _id
            });
        }
    } catch (error) {
        const _id = req.params.id;
        res.status(400).json({
            "status":"Bad request",
            "content-text":'Medico not found',
            "medicos": _id
        });
    }
}

module.exports ={
    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos
}