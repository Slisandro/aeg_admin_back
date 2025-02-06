const { v4 } = require("uuid");
const dynamoDB = require("../../dynamodb/index.js");

const resolversClient = {
    Query: {
        clientsCount: async () => {
            const params = {
                TableName: 'aeg_admin',
                FilterExpression: 'entityType = :tipo',
                ExpressionAttributeValues: {
                    ':tipo': 'client'
                },
                Select: "COUNT"
            };

            try {
                const data = await dynamoDB.scan(params).promise();
                return data.Count;
            } catch (error) {
                console.error('Error getting clients count:', error);
                throw new Error('Error getting clients count.');
            }
        },
        getAllClients:  async () => {
            const params = {
                TableName: 'aeg_admin',
                FilterExpression: 'entityType = :tipo',
                ExpressionAttributeValues: {
                    ':tipo': 'client'
                }
            };

            try {
                const data = await dynamoDB.scan(params).promise();
                return data.Items;
            } catch (error) {
                console.error('Error getting client:', error);
                throw new Error('Error getting client.');
            }
        },
        getCourseById:  async (root: any, args: { id: string; }) => {
            const params = {
                TableName: "aeg_admin",
                Key: {
                    'id': 'CLIENT#' + args.id
                }
            };

            try {
                const data = await dynamoDB.get(params).promise();
                return data.Item;
            } catch (error) {
                console.error('Error getting client:', error);
                throw new Error('Error getting client with id CLIENT#' + args.id + ".");
            }
        }
    },
    Mutation: {
        createOrUpdateClient: async (root: any, args: {
            id: string,
            name: string,
            representative: string,
            code: string,
            entityType: string,
        }) => {
            const params = {
                TableName: "aeg_admin",
                Item: { ...args, id: args.id ?? "CLIENT#" + v4() }
            }

            try {
                await dynamoDB.put(params).promise();
                return true;
            } catch (error) {
                console.error('Error creating client:', error);
                throw new Error('Error creating client');
            }
        },
        deleteClient: async (root: any, args: { id: string; }) => {
            const params = {
                TableName: "aeg_admin",
                Key: {
                    id: args.id
                }
            }

            try {
                await dynamoDB.delete(params).promise();
                return true;
            } catch (error) {
                console.error('Error getting users:', error);
                throw new Error('Error creating user');
            }
        },
    },
};

module.exports = resolversClient;

export {};