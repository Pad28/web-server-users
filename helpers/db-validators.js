const User = require('../models/User');
const Role = require('../models/Role');

const validators = {
	existeEmail: async(correo) => {
		const emailExiste = await User.findOne({ correo });
		if(emailExiste){
			throw new Error(`El correo: ${correo} ya esta registrado`)
		}
	},

	//---------------------------------------------------------------------------------
	rolValido: async(role) => {
		const rolEsValido = await Role.findOne({role})
		if(!rolEsValido){
			throw new Error(`El rol: ${role} no es valido`)
		}
	},

	//--------------------------------------------------------------------------------
	existeUsuarioID: async(id) => {
		const existeID = await User.findById(id);
		
		if(!existeID){
			throw new Error(`El ID: ${id} no existe`)
		}
	}
}

module.exports = validators;

