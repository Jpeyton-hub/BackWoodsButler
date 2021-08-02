const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schemas/qlschema');

const app = express();

const PORT = process.env.PORT || 5050

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}));

app.listen(PORT, () => {
    console.log(`Now listening at localhost:${PORT}`);
});