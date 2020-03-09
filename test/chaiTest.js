//Gracias a Chai podemos usar la funcionalidad expect que es de gran ayuda en entornos Node.js
var expect = require("chai").expect;

describe("Vamos a realizar nuestro primer test usando Chai", function() {

  it("test para comprobar el correcto funcionamiento de la sintaxis que nos provee Chai", function() {
    expect(5).to.equal(5);
    expect(5).to.not.equal(3);
  });

});