// Controllers
const bcryptjs = require('bcryptjs');

const User = require('../models/User');

const users = {
	get: async(req, res) => {
		const { id } = req.params;
		const user = await User.findById(id);
	
		res.json({
			msg: 'get API - Controller',
			user
		})
	},
	
	//-------------------------------------------------------------------------------
	list: async(req, res) => {
		const { limit = 5, from = 0 } = req.query;
		
		const [ total, users ] = await Promise.all([
			User.countDocuments({ estado: true }),
			User.find({estado: true})
				.skip(Number(from))
				.limit(Number(limit))
		])

		res.json({
			msg: 'list API - Controller',
			total,
			users
		})
	},

	//-------------------------------------------------------------------------------
	post: async(req, res) => {
		const { nombre, correo, password, role } = req.body;
		const user = new User({ nombre, correo, password, role })
		
		//Encritar password
		const salt = bcryptjs.genSaltSync(10);
		user.password = bcryptjs.hashSync(password, salt);
		
		await user.save()

		res.json({
			msg: 'post API - Controller',
			user
		})
	},	

	//-------------------------------------------------------------------------------
	put: async(req, res) => {
		const { id } = req.params;
		const { _id, password, google, correo, ...rest } = req.body;
		
		if(password){
			const salt = bcryptjs.genSaltSync(10);
			rest.password = bcryptjs.hashSync(password, salt);
		}

		const userDb = await User.findByIdAndUpdate(id, rest);

		res.json({
			msg: 'put API - Controller',
			userDb
		})
	},

	//-------------------------------------------------------------------------------
	delete: async(req, res) => {
		const { id } = req.params;

		const userDb = await User.findByIdAndUpdate(id, { estado: false });
		
		res.json({
			msg: 'delete API - Controller',
			userDb
		})
	}


};

module.exports = users;
