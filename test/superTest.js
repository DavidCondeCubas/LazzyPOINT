const supertest = require("supertest");
const assert = require('assert');
const app = require("../app");

//Test de un get a la ruta /
describe("GET /", () => {
    it("debe devolver el status code 200", (done) => {
        supertest(app)
            .get("/")
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log("El resultado no ha sido el esperado");
                    done(err);
                }
                console.log("El resultado ha sido el esperado, correcto");
                done();
            });
    });
});