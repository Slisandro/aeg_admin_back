const { v4 } = require("uuid");
const dynamoDB = require("../../dynamodb/index.js");

const resolversUser = {
    Query: {
        usersCount: async () => {
            const params = {
                TableName: 'aeg_admin',
                FilterExpression: 'entityType = :tipo',
                ExpressionAttributeValues: {
                    ':tipo': 'user'
                },
                Select: "COUNT"
            };

            try {
                const data = await dynamoDB.scan(params).promise();
                return data.Count;
            } catch (error) {
                console.error('Error getting user count:', error);
                throw new Error('Error getting users count.');
            }
        },
        getAllUsers: async () => {
            const params = {
                TableName: 'aeg_admin',
                FilterExpression: 'entityType = :tipo',
                ExpressionAttributeValues: {
                    ':tipo': 'user'
                }
            };

            try {
                const data = await dynamoDB.scan(params).promise();
                return data.Items;
            } catch (error) {
                console.error('Error getting users:', error);
                throw new Error('Error getting users.');
            }
        },
        getUserById: async (root: any, args: { id: string }) => {
            const params = {
                TableName: "aeg_admin",
                Key: {
                    'id': 'USER#' + args.id
                }
            };

            try {
                const data = await dynamoDB.get(params).promise();
                return data.Item;
            } catch (error) {
                console.error('Error getting user:', error);
                throw new Error('Error getting user with id USER#' + args.id + ".");
            }
        }
    },
    Mutation: {
        createOrUpdateUser: async (root: any, args: {
            id: string,
            name: string,
            email: string,
            password: string,
            role: string,
            entityType: string
        }) => {
            const params = {
                TableName: "aeg_admin",
                Item: { ...args, id: args.id ?? "USER#" + v4() }
            }

            try {
                await dynamoDB.put(params).promise();
                return true;
            } catch (error) {
                console.error('Error getting users:', error);
                throw new Error('Error creating user');
            }
        },
        deleteUser: async (root: any, args: { id: string; }) => {
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
                console.error('Error deleting user:', error);
                throw new Error('Error deleting user');
            }
        },
    },
};

module.exports = resolversUser;