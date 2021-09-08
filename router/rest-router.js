const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

/* Middlewares */
const { validateFields } = require('../middleware/validateFields');
const { validateJwt } = require('../middleware/validateJwt');

/* Controllers */
const { getUser,createUser,updateUser,deleteUser } =require('../controller/userController');
const { login } = require('../controller/authController');
const { getHospital,createHospital,updateHospital,deleteHospital } =require('../controller/hospitalController');
const { getMedicos,createMedicos,updateMedicos,deleteMedicos } =require('../controller/medicosController');
const { search } = require('../controller/search');

/* Rest users */
router.get('/api/users',[validateJwt], getUser);
router.post('/api/user',[
    validateJwt,
    check('name','Name is required').not().isEmpty(),
    check('password','Password is required').not().isEmpty(),
    check('email','Email is required').not().isEmpty(),
    validateFields
], createUser);
router.put('/api/user/:id',[validateJwt], updateUser);
router.delete('/api/user/:id',[validateJwt], deleteUser);

/* Rest Auth */
router.post('/api/login',[
    check('password','Password is required').not().isEmpty(),
    check('email','Email is required').not().isEmpty(),
    validateFields
], login);

/* Rest hospital */
router.get('/api/hospital',[validateJwt], getHospital);
router.post('/api/hospital',[
    validateJwt,
    check('name','Name is required').not().isEmpty(),
    validateFields
], createHospital);
router.put('/api/hospital/:id',[validateJwt], updateHospital);
router.delete('/api/hospital/:id',[validateJwt], deleteHospital);

/* Rest medicos */
router.get('/api/medicos',[validateJwt], getMedicos);
router.post('/api/medicos',[
    validateJwt,
    check('name','Name is required').not().isEmpty(),
    check('hospital','User is required').not().isEmpty(),
    validateFields
], createMedicos);
router.put('/api/medicos/:id',[validateJwt], updateMedicos);
router.delete('/api/medicos/:id',[validateJwt], deleteMedicos);

/* Rest busqueda */
router.get('/api/search/:search',[validateJwt], search);

module.exports = router;