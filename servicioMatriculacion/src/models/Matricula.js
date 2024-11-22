const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importa la conexión

const Matricula = sequelize.define('Matricula', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unsigned: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cursoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaMatricula: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'matriculas',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Matricula;
