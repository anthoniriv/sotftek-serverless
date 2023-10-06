const { addPeruvianJedi } = require("./createPeruvianJedi");
const AWS = require("aws-sdk");
const awsMock = require("aws-sdk-mock");

describe("addPeruvianJedi", () => {
  afterEach(() => {
    awsMock.restore("DynamoDB.DocumentClient");
  });

  it("debería agregar un Jedi peruano", async () => {
    const fakeEventData = {
      body: JSON.stringify({
        nombre: "Alan Garcia",
        altura: 1.88,
        peso: 84,
        color_cabello: "rubio",
        color_piel: "blanco",
        color_ojos: "azules",
        año_nacimiento: "1855",
        genero: "masculino",
        sable_laser: "rojo",
      }),
    };

    awsMock.mock("DynamoDB.DocumentClient", "put", (params, callback) => {
      callback(null, {});
    });

    const response = await addPeruvianJedi(fakeEventData);

    expect(response.codigoStatus).toBe(200);
    expect(response.mensaje).toBe("Bienvenido a la fuerza!");
    expect(JSON.parse(response.data)).toEqual({
      id: expect.any(String),
      fechaCreacion: expect.any(Number),
      ...JSON.parse(fakeEventData.body),
    });
  });
});
