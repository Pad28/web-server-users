const {model, Schema} = require("mongoose")

const userSchema = new Schema({
	nombre: {
		type: String,
		required: true
	},
	correo: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true,
		enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
	},
	estado: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: false
	},
	img: {
		type: String,
		required: false,
		default: 'img default'
	}
});

userSchema.methods.toJSON = function(){
	const { __v, password, ...user } = this.toObject();
	return user
}

module.exports = model('User', userSchema);


