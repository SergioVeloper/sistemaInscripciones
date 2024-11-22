const bcrypt = require('bcryptjs');
const password = 'contraseña123';
const hashedPassword = bcrypt.hashSync(password, 8);
console.log('Generated Hash:', hashedPassword);
