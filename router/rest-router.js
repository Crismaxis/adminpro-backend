const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

/* Middlewares */
const { validateFields } = require('../middleware/validateFields');

/* Controllers */
const { getUser,createUser,updateUser,deleteUser } =require('../controller/userController');
const { login } = require('../controller/authController');
const { validateJwt } = require('../middleware/validateJwt');

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
    check('email','Email is required').not().isEmpty()
], login);



module.exports = router;