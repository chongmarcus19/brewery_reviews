// Imports the server.js file to be tested.
let server = require("../server");
//Assertion (Test Driven Development) and Should, Expect(Behaviour driven development) library
let chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp); 
const { expect } = chai;
var assert = chai.assert;

describe("Server!", () => { 
    it("Returns default homepage ", done => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          assert.strictEqual(res.body.message, "Welcome!");
          done();
        });
    });

    it("Succesfully creats new reviews", done => {
      chai
        .request(server)
        .get("/create")
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body[0].should.have.property('brewery_name');
          res.body[0].should.have.property('review');
          res.body[0].should.have.property('review_date');
          done();
        });
    });

  });