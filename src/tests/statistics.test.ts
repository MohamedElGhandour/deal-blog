import app from "../app";
import * as chai from "chai";
import chaiHttp from "chai-http";
import { beforeEach, describe, it } from "node:test";
import "mocha";
import { setupDatabase, admin } from "./fixtures/db";

chai.use(chaiHttp);
const expect = chai.expect;

beforeEach(setupDatabase);

describe("GET /admin/statistics", () => {
  it("It should list all the statistics", () => {
    chai
      .request(app)
      .get("/admin/statistics")
      .set("Authorization", `Bearer ${admin.tokens[0].token}`)
      .then((res) => {
        expect(res.status).to.eql(200);
        expect(res.body.length).to.eql(8);
        expect(res.body).should.have.property("totalNumberOfPosts");
      });
  });
});
