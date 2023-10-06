const { getPeruvianJedis } = require("./getPeruvianJedis");

const AWS = require("aws-sdk");
const awsMock = require("aws-sdk-mock");

describe("getPeruvianJedis", () => {
  afterEach(() => {
    awsMock.restore("DynamoDB.DocumentClient");
  });

  it("debería retornar jedis peruanos", async () => {
    const fakeResponseData = {
      Items: [
        {
          nombre: "Anthoni Rivera La Rosa",
          peso: 105,
          color_cabello: "Marron",
          altura: 1.75,
          color_piel: "Trigueña",
          sable_laser: "Rojo",
          id: "1c79d0e9-1297-4053-bcf4-b8ec091b97f6",
          color_ojos: "Marron Oscuro",
          fechaCreacion: 1695626393183,
          año_nacimiento: 1999,
          genero: "Masculino"
        }
      ]
    };

    awsMock.mock("DynamoDB.DocumentClient", "scan", (params, callback) => {
      callback(null, fakeResponseData);
    });

    const event = {};
    const response = await getPeruvianJedis(event);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ jedisPeruanos: fakeResponseData.Items });
  });
});
