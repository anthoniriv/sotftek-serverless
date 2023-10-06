const { healthCheck } = require("./index");

test("healthCheck debería retornar un objeto con statusCode 200 y un mensaje 'Hello, world!'", async () => {
  const event = {};

  const result = await healthCheck(event);

  expect(result.statusCode).toBe(200);

  const body = JSON.parse(result.body);
  expect(body).toEqual({
    message: "Hello, world!",
    input: event,
  });
});
