const validaCampos = require('./validar-campos');
const validaRole = require('./validar-roles');
const validaJWT = require('./validar-jwt');

module.exports = {
	... validaCampos,
	... validaRole,
	... validaJWT
}
