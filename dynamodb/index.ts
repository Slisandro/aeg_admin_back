const AWS = require("aws-sdk");

const region = process.env.DYNAMODB_REGION; // Obtén el valor de la variable

AWS.config.update({
    accessKeyId: "AKIAZNWR25HXCDQP5AHM",
    secretAccessKey: "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",
    region: "us-east-2"
});

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: "us-east-2"
});

module.exports = dynamoDB;

export {};