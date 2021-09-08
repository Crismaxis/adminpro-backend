const userModel = require('../models/users');
const medicoModel = require('../models/medicos');
const hospitalModel = require('../models/hospital');

const search = async (req, res) => {
    const search = req.params.search;
    const regExp = new RegExp(search,'i');

    const [user,medico,hospital] = await Promise.all([
        userModel.find({name:regExp}),
        medicoModel.find({name:regExp}),
        hospitalModel.find({name:regExp})
    ]);

    res.status(200).json({
        "status":"Ok",
        "content-text":'Search text found',
        "search-user": user,
        "search-medico": medico,
        "search-hospital": hospital
    });
}

module.exports = {
    search
}