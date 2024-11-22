const {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList} = require('graphql');
const sequelize = require('./config/db');
const Matricula = require('./models/Matricula');

const MatriculaType = new GraphQLObjectType({
    name: 'Matricula',
    fields: () => ({
        id: {type: GraphQLInt},
        usuarioId: {type: GraphQLInt},
        cursoId: {type: GraphQLInt},
        fechaMatricula: {type: GraphQLString}
    })
});

// Obtener todas las matrículas
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        matriculas: {
            type: new GraphQLList(MatriculaType),
            resolve() {
                return Matricula.findAll();
            }
        },
        matricula: {
            type: MatriculaType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return Matricula.findByPk(args.id);
            }
        }
    }
});

// Definir todas las mutaciones en un solo objeto Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        matricula: {
            type: MatriculaType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return Matricula.findByPk(args.id);
            }
        },
        addMatricula: {
            type: MatriculaType,
            args: {
                usuarioId: {type: GraphQLInt},
                cursoId: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return Matricula.create({
                    usuarioId: args.usuarioId,
                    cursoId: args.cursoId
                });
            }
        },
        deleteMatricula: {
            type: MatriculaType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return Matricula.destroy({
                    where: {
                        id: args.id
                    }
                });
            }
        },
        updateMatricula: {
    type: MatriculaType,
    args: {
        id: {type: GraphQLInt},
        usuarioId: {type: GraphQLInt},
        cursoId: {type: GraphQLInt}
    },
    async resolve(parent, args) {
        // Realiza la actualización y obtiene el número de filas afectadas
        const [updatedRows] = await Matricula.update(
            {
                usuarioId: args.usuarioId,
                cursoId: args.cursoId
            },
            {
                where: { id: args.id }
            }
        );

        // Si no se actualizó ninguna fila, devuelve null
        if (updatedRows === 0) {
            return null;
        }

        // Retorna la matrícula actualizada
        return Matricula.findByPk(args.id);
    }
}

    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
