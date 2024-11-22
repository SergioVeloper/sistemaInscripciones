var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: 'Nombre de usuario requerido' },
  email: { type: String, required: 'Correo electrónico requerido', unique: true },
  password: { type: String, required: 'Contraseña requerida' },
  state: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' }
});


mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
