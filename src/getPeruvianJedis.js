const AWS = require("aws-sdk");

const getPeruvianJedis = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const result = await dynamodb.scan({ TableName: "StarWarsTable" }).promise();

  const jedisPeruanos = result.Items;

  return {
    status: 200,
    body: {
      jedisPeruanos,
    },
  };
};

module.exports = {
  getPeruvianJedis,
};