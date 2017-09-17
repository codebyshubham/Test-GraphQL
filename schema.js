/**
 * Created by shubh on 9/16/2017.
 */

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//HardCoded Data
const Customers = [
        {id:'1', name:'Shubham', email:'shubham@shubh.com', age:22},
        {id:'2', name:'Pathik', email:'pathik@pathik.com', age:22},
        {id:'3', name:'Kishan', email:'kishan@kishan.com', age:22},
];

// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

//root query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        customer:{
            type: CustomerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                for(let i=0; i<=Customers.length; i++){
                    if (Customers[i].id === args.id){
                        return Customers[i];
                    }
                }
            }
        },
        customers:{
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return Customers
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});