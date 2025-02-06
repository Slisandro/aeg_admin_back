const { v4 } = require("uuid");
const dynamoDB = require("../../dynamodb/index.js");

const resolversCourse = {
    Query: {
        coursesCount: async () => {
            const params = {
                TableName: 'aeg_admin',
                FilterExpression: 'entityType = :tipo',
                ExpressionAttributeValues: {
                    ':tipo': 'course' 
                },
                Select: "COUNT"
            };

            try {
                const data = await dynamoDB.scan(params).promise();
                return data.Count;
            } catch (error) {
                console.error('Error getting courses count:', error);
                throw new Error('Error getting courses count.');
            }
        },
        getAllCourses: async () => {
            const params = {
                TableName: 'aeg_admin',
                FilterExpression: 'entityType = :tipo',
                ExpressionAttributeValues: {
                    ':tipo': 'course'
                }
            };

            try {
                const data = await dynamoDB.scan(params).promise();
                return data.Items;
            } catch (error) {
                console.error('Error getting courses:', error);
                throw new Error('Error getting courses.');
            }
        },
        getCourseById: async (root: any, args: { id: string; }) => {
            const params = {
                TableName: "aeg_admin",
                Key: {
                    'id': 'COURSE#' + args.id
                }
            };

            try {
                const data = await dynamoDB.get(params).promise();
                return data.Item;
            } catch (error) {
                console.error('Error getting course:', error);
                throw new Error('Error getting course with id COURSE#' + args.id + ".");
            }
        }
    },
    Mutation: {
        createOrUpdateCourse: async (root: any, args: {
            id: string,
            name: string,
            duration: number,
            entityType: string
        }) => {
            const params = {
                TableName: "aeg_admin",
                Item: { ...args, id: args.id ?? "COURSE#" + v4() }
            }

            try {
                await dynamoDB.put(params).promise();
                return true;
            } catch (error) {
                console.error('Error creating course:', error);
                throw new Error('Error creating course');
            }
        },
        deleteCourse: async (root: any, args: { id: string; }) => {
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
                console.error('Error deleting course: ', error);
                throw new Error('Error deleting course');
            }
        },
    },
};

module.exports = resolversCourse;

export {};