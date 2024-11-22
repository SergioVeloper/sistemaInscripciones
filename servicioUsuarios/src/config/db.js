const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/servicioUsuarios')
    .then(() => console.log('Connectado con MongoDB...'))
    .catch(err => console.error('Error al conectar con MongoDB...', err));

    module.exports = mongoose;