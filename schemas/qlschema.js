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

const EventType = new GraphQLObjectType({
    name: "Event",
    fields: () => ({
        id : GraphQLID,
        title : GraphQLString,
        date : GraphQLString,
        clientID : GraphQLID,
        equipment : new GraphQLList(EquipmentType),
        duration : GraphQLInt,
        location : GraphQLString,
        completed : GraphQLBoolean
    })
});

const EquipmentType = new GraphQLObjectType({
    name: "Equipment",
    fields: () => ({
        id : GraphQLID,
        title : GraphQLString,
        type : GraphQLString,
        qty : GraphQLInt,
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
        },
        event : {
            type : EventType,
            args : { id : { type : GraphQLID } },
            resolve(parent, args){
                return Event.findById(args.id)
            }
        },
        equipment : {
            type : EquipmentType,
            args : { id : { type : GraphQLID } },
            resolve(parent, args){
                return Equipment.findById(args.id)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
