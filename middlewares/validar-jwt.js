const jwt = require('jsonwebtoken');

const User = require('../models/User');

const validarJWT = async(req, res, next) => {
	const token = req.header('x-token');

	if(!token){
		return res.status(401).json({
			msg: 'No hay token en la petición'
		})
	}

	try{
		const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
		
		const user = await User.findById(id);
		if(!user){
			return res.status(401).json({
				msg: 'Token no valido - usuario no existe en DB'
			})
		}

		if(!user.estado){
			return res.status(401).json({
				msg: 'Token no valido - usuario false'
			})
		}

		req.user = user;
		next()

	} catch(error){
		console.log(error)
		res.status(401).json({
			msg: 'Token no valido'
		})
	}


}

module.exports = {
	validarJWT
}
