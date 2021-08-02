const {
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");
const Client = require('./clients');
const Equipment = require('./equipment');
const Event = require('./events');

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id : GraphQLID,
        firstName : GraphQLString,
        lastName : GraphQLString,
        email : GraphQLString,
        phone : GraphQLInt,
        notes : GraphQLString
    })
});

const RootQuery = new GraphQLObjectType({
    name : "RootQueryType",
    fields : {
        client : {
            type : ClientType,
            args : { id : { type : GraphQLID } },
            resolve(parent, args){
                return Client.findById(args.id)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
