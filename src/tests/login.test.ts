import app from "../app";
import * as chai from "chai";
import chaiHttp from "chai-http";
import { beforeEach, describe, it } from "node:test";
import "mocha";
import { setupDatabase, user } from "./fixtures/db";

chai.use(chaiHttp);
const expect = chai.expect;

beforeEach(setupDatabase);

describe("POST /user/login", () => {
  it("Should login existing user", () => {
    chai
      .request(app)
      .post("/user/login")
      .send({
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.length).to.eql(2);
        expect(res.body.user.length).to.eql(6);
        expect(res.body).should.be.a("object");
        expect(res.body).should.have.property("user");
        expect(res.body).should.have.property("token");
        expect(res.body.token).to.include.deep.members(user.tokens);
      });
  });
});

describe("POST /user/login", () => {
  it("Should not login nonexistent user", () => {
    chai
      .request(app)
      .post("/user/login")
      .send({
        email: user.email,
        password: "thisnotmypass",
      })
      .then((res) => {
        expect(res.status).to.eql(400);
      });
  });
});
