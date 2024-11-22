const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const sequelize = require('./config/db');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
        app.listen(4000, () => {
            console.log('Server running on http://localhost:4000/graphql');
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
