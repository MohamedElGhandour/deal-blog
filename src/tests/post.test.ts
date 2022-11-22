import app from "../app";
import * as chai from "chai";
import chaiHttp from "chai-http";
import { beforeEach, describe, it } from "node:test";
import "mocha";
import { setupDatabase, user } from "./fixtures/db";

chai.use(chaiHttp);
const expect = chai.expect;

beforeEach(setupDatabase);

describe("POST /posts", () => {
  it("Should create post for user", () => {
    chai
      .request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${user.tokens[0].token}`)
      .send({
        title: "test",
        body: "test",
      })
      .then((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.length).to.eql(8);
        expect(res.body).should.be.a("object");
        expect(res.body).should.have.property("_id");
        expect(res.body).should.have.property("title");
        expect(res.body).should.have.property("body");
        expect(res.body).should.have.property("status");
      });
  });
});
