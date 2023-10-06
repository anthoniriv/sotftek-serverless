const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addPeruvianJedi = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const {
    nombre,
    altura,
    peso,
    color_cabello,
    color_piel,
    color_ojos,
    año_nacimiento,
    genero,
    sable_laser,
  } = JSON.parse(event.body);
  const id = v4();
  const fechaCreacion = Date.now();


  console.log("Id creado: ", id);

  const nuevoJedi = {
    id,
    fechaCreacion,
    nombre,
    altura,
    peso,
    color_cabello,
    color_piel,
    color_ojos,
    año_nacimiento,
    genero,
    sable_laser,
  };

  await dynamodb
    .put({
      TableName: "StarWarsTable",
      Item: nuevoJedi,
    })
    .promise();

  return {
    codigoStatus: 200,
    mensaje: "Bienvenido a la fuerza!",
    data: JSON.stringify(nuevoJedi),
  };
};

module.exports = {
  addPeruvianJedi,
};
