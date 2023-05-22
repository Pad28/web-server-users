// Routes
const { Router } = require('express');
const { check } = require('express-validator');

const users = require('../controllers/users');
const validators = require('../helpers/db-validators');
const {
	validarCampos,
	tieneRole,
	validarJWT
} = require('../middlewares');

const router = Router();
router.get('/:id', [
	check('id', 'No es un ID valido').isMongoId(),
	validarCampos
], users.get)

router.get('/', users.list)

router.post('/', [
	check('nombre', 'El nombre es obligatorio').not().isEmpty(),
	check('password', 'El password es obligatorio y de mas de 6 caracteres').isLength({min: 6}),
	check('correo', 'El correo no es valido').isEmail(),
	check('correo').custom(correo => validators.existeEmail(correo)),
	check('role').custom(role => validators.rolValido(role)),
	validarCampos
], users.post)

router.put('/:id', [
	check('id', 'No es un ID valido').isMongoId(),
	check('id').custom(id => validators.existeUsuarioID(id)),
	check('role').custom(role => validators.rolValido(valido)),
	validarCampos
], users.put)

router.delete('/:id',  [
	validarJWT,
	tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
	check('id').isMongoId(),
	check('id').custom(id => validators.existeUsuarioID(id)),
	validarCampos
], users.delete)


module.exports = router;






