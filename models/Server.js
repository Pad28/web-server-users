const cors = require('cors');
const express = require('express');

const { dbConnection } = require('../database/config');

class Server{
	constructor(){
		this.app = express();
		this.port = process.env.PORT || 3000;

		this.usersPath = '/api/users';
		this.authPath = '/api/auth';

		this.conectionDB()

		this.middlewares()
		this.routes()

	}

	//---------------------------------------------------------------------------------------------------
	middlewares(){
		this.app.use(cors())
		this.app.use(express.json())
		this.app.use(express.static('public'))
	}


	//---------------------------------------------------------------------------------------------------
	routes(){
		this.app.use(this.authPath, require('../routes/auth'))
		this.app.use(this.usersPath, require('../routes/users'))

		this.app.get('*', (req, res) => {
			res.status(404).send('<h1>404 | Not found</h1>')
		})
	}

	//---------------------------------------------------------------------------------------------------
	listen(){
		this.app.listen(this.port, () => {
			console.log('Puerto activo: ' + this.port)
		})
	}

	//---------------------------------------------------------------------------------------------------
	async conectionDB(){
		await dbConnection()
	}

}

module.exports = Server;
