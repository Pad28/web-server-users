// routes
const { Router } = require('express');
const { check } = require('express-validator');

const auth = require('../controllers/auth');
const { 
	validarCampos
} = require('../middlewares/validar-campos');

const router = Router();
router.post('/login', [
	check('correo', 'El correo es obligatorio').isEmail(),
	check('password', 'La contraseña es obligatoria').not().isEmpty(),
	validarCampos
], auth.login)

router.post('/google', [
	check('id_token', 'El id_token google es necesario').not().isEmpty(),
	validarCampos
], auth.googleSignIn)



module.exports = router;


