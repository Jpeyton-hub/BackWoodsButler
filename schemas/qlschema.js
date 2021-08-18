const {  
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require("graphql");
const Client = require('./clients');
const Equipment = require('./equipment');
const Event = require('./events');

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id : {type : GraphQLID},
        firstName : { type : GraphQLString},
        lastName : {type : GraphQLString},
        email : {type : GraphQLString},
        phone : {type : GraphQLInt},
        notes : {type : GraphQLString}
    })
});

const EventType = new GraphQLObjectType({
    name: "Event",
    fields: () => ({
        id : { type : GraphQLID },
        title : { type : GraphQLString },
        date : { type : GraphQLString },
        client : { type : ClientType,
                    resolve(parent, args){
                        return Client.findById(parent.clientID)
                    } 
                },
        equipment : { type : new GraphQLList(EquipmentType) },
        duration : { type : GraphQLInt },
        location : { type : GraphQLString },
        completed : { type : GraphQLBoolean }
    })
});

const EquipmentType = new GraphQLObjectType({
    name: "Equipment",
    fields: () => ({
        id : { type : GraphQLID },
        title : { type : GraphQLString },
        type : { type : GraphQLString },
        qty : { type : GraphQLInt },
        notes : { type : GraphQLString },
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
