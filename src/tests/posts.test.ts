import app from "../app";
import * as chai from "chai";
import chaiHttp from "chai-http";
import { beforeEach, describe, it } from "node:test";
import "mocha";
import { setupDatabase, user } from "./fixtures/db";

chai.use(chaiHttp);
const expect = chai.expect;

beforeEach(setupDatabase);

describe("GET /posts", () => {
  it("It should list all the Posts", () => {
    chai
      .request(app)
      .get("/posts?limit=10&page=2")
      .set("Authorization", `Bearer ${user.tokens[0].token}`)
      .then((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.length).to.eql(7);
        expect(res.body.data).should.be.a("array");
        expect(res.body).should.have.property("total");
      });
  });
});
