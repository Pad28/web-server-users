// controllers
const bcryptjs = require('bcryptjs');

const User = require('../models/User');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const auth = {
	login: async(req, res) => {
		const { correo, password } = req.body;

		try{
			const user = await User.findOne( { correo } )
			
			// Verificar el email existente
			if(!user){
				return res.status(400).json({
					msg: 'Usuario / Password no son correctos - correo'
				})
			}

			//verificar usuario activo
			if(!user.estado){
				return res.status(400).json({
					msg: 'Usuario / Password no son correctos - estado'
				})
			}	

			// Verificar la contraseña
			const validPassword = bcryptjs.compareSync(password, user.password);
			if(!validPassword){
				return res.status(400).json({
					msg: 'Usuario / Password no son correctos - password'
				})
			}

			//Generar el JWT
			const token = await generarJWT(user._id);

			res.json({
				user,
				token
			})

		} catch(error){
			console.log(error)
			res.status(500).json({
				msg: 'Hable con el adminsitrador'
			})
		}

	},

	//------------------------------------------------------------------------------------------
	googleSignIn: async(req, res) => {
		const { id_token } = req.body;
		
		try{
			
			const { correo, nombre, img } = await googleVerify(id_token);
			let user = await User.findOne({ correo });

			if(!user){
				const data = {
					nombre,
					correo,
					password: '123456',
					img,
					google: true,
					role: 'USER_ROLE'
				}

				user = new User(data);
				await user.save();
			}

			if(!user.estado){
				return res.status(401).json({
					msg: 'Hable con el adminsitrador, usuario bloqueado'
				})
			}

			//console.log(googleUser)

			res.json({
				user,
				id_token
			})

		} catch(error){
			console.log(error)
		}

	}

}

module.exports = auth;
