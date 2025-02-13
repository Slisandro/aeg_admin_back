const { v4 } = require("uuid");
const dynamoDB = require("../../dynamodb/index.js");

const resolversConstancy = {
    Constancy: { // Resolvers for the Constancy type's fields
        user: async (parent: { userId: string }) => {
            const params = {
                TableName: "aeg_admin",
                Key: {
                    'id': parent.userId
                }
            };
            const user = await dynamoDB.get(params).promise();
            return user.Item;
        },
        course: async (parent: { courseId: string; }) => {
            const params = {
                TableName: "aeg_admin",
                Key: {
                    'id': parent.courseId
                }
            };
            const course = await dynamoDB.get(params).promise();
            return course.Item;
        },
        client: async (parent: { clientId: string }) => {
            const params = {
                TableName: "aeg_admin",
                Key: {
                    'id': parent.clientId
                }
            };
            const client = await dynamoDB.get(params).promise();
            return client.Item;
        },
    },
    Query: {
        constanciesCount: async () => {
            const params = {
                TableName: 'aeg_admin',
                FilterExpression: 'entityType = :tipo',
                ExpressionAttributeValues: {
                    ':tipo': 'constancy'
                },
                Select: "COUNT"
            };

            try {
                const data = await dynamoDB.scan(params).promise();
                return data.Count;
            } catch (error) {
                console.error('Error getting constancies count:', error);
                throw new Error('Error getting constancies count.');
            }
        },
        getAllConstancies: async () => {
            const params = {
                TableName: 'aeg_admin',
                FilterExpression: 'entityType = :tipo',
                ExpressionAttributeValues: {
                    ':tipo': 'constancy'
                }
            };

            try {
                const data = await dynamoDB.scan(params).promise();
                return data.Items || []; // Return the raw Constancy items
            } catch (error) {
                console.error('Error getting constancies', error);
                throw new Error('Error getting constancies');
            }
        },
        getConstanciesByClient: async (root: any, args: { clientId: string }) => {
            const params = {
                TableName: 'aeg_admin',
                FilterExpression: 'entityType = :tipo AND clientId = :clientId',
                ExpressionAttributeValues: {
                    ':tipo': 'constancy',
                    ':clientId': args.clientId
                }
            };

            try {
                const data = await dynamoDB.scan(params).promise();
                return data.Items;
            } catch (error) {
                console.error('Error getting constancies by client id:', error);
                throw new Error('Error getting constancies by client id.');
            }
        },
        getConstanciesByUser: async (root: any, args: { userId: string }) => {
            const params = {
                TableName: 'aeg_admin',
                FilterExpression: 'entityType = :tipo AND userId = :userId',
                ExpressionAttributeValues: {
                    ':tipo': 'constancy',
                    ':userId': args.userId
                },
            };

            try {
                const data = await dynamoDB.scan(params).promise();
                return data.Items;
            } catch (error) {
                console.error('Error getting constancies by user id:', error);
                throw new Error('Error getting constancies by user id.');
            }
        },
        getConstanciesByCourse: async (root: any, args: { courseId: string }) => {
            const params = {
                TableName: 'aeg_admin',
                FilterExpression: 'entityType = :tipo AND courseId = :courseId',
                ExpressionAttributeValues: {
                    ':tipo': 'constancy',
                    ':courseId': args.courseId
                },
            };

            try {
                const data = await dynamoDB.scan(params).promise();
                return data.Items;
            } catch (error) {
                console.error('Error getting constancies by course id:', error);
                throw new Error('Error getting constancies by course id.');
            }
        }
    },
    Mutation: {
        createOrUpdateConstancy: async (root: any, args: {
            id: string,
            userId: string,
            courseId: string,
            clientId: string,
            startDate: string,
            endDate: string,
            entityType: string
        }) => {
            const params = {
                TableName: "aeg_admin",
                Item: { ...args, id: args.id ?? "CONSTANCY#" + v4() }
            }

            try {
                await dynamoDB.put(params).promise();
                return true;
            } catch (error) {
                console.error('Error creating constancy:', error);
                throw new Error('Error creating constancy');
            }
        },
        deleteConstancy: async (root: any, args: { id: string }) => {
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
                console.error('Error deleting constancy: ', error);
                throw new Error('Error deleting constancy');
            }
        },
    },
};

module.exports = resolversConstancy;

export { };