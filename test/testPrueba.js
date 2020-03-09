//Creamos nuestro primer test para nuestro entorno.
//Este test es muy básico y sólo lo queremos para comprobar, que los test funcionan correctamente en nuestro sistema
describe("Primer test con Mocha en nuesto entorno", function () {
    // Aquí indicamos el nombre de nuestro test
    it("primer test para comprobar el correcto funcionamiento de los test en nuestro sistema", function (done) {
        // Queremos un test sencillo que sea corrento
        if (5 == 5) {
            console.log("La afirmación es correcta");
            //Si obtenermos el comportamiento esperado, llamamos a la función done sin argumentos
            done();
        } else {
            console.log("La afirmación no es correcta");
            //Si no obtenermos el comportamiento esperado, devolvemos error
            done(new Error("El resultado no fue el esperado"));
        }
    });
});