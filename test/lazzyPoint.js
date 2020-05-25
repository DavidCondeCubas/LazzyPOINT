const supertest = require("supertest");
const assert = require("assert");
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

describe("GET /menu", () => {
    it("debe llamar a la ruta /menu y devolverlo correctamente", (done) => {
        supertest(app)
            .get("/menu")
            .expect('Content-Type','text/html; charset=utf-8')
            .end((err, res) => {
                done();
            });
    }); 
});


describe("GET /presentaciones", () => {
    it("debe llamar a la ruta /presentaciones y devolverlo correctamente", (done) => {
        supertest(app)
            .get("/presentaciones")
            .expect('Content-Type','text/html; charset=utf-8')
            .end((err, res) => {
                if (res) {
                    console.log("The result is correct")
                }
                done();
            });
    }); 
});


describe("GET /galeriaImagenes", () => {
    it("debe llamar a la ruta /galeriaImagenes y devolverlo correctamente", (done) => {
        supertest(app)
            .get("/galeriaImagenes")
            .expect('Content-Type','text/html; charset=utf-8')
            .end((err, res) => {
                if (res) {
                    console.log("The result is correct")
                }
                done();
            });
    }); 
});


describe("GET /contacto", () => {
    it("debe llamar a la ruta /contacto y devolverlo correctamente", (done) => {
        supertest(app)
            .get("/contacto")
            .expect('Content-Type','text/html; charset=utf-8')
            .end((err, res) => {
                if (res) {
                    console.log("The result is correct")
                }
                done();
            });
    }); 
});
