/**
 * Main Test File.
 * 
 * @group unit
 * @group integration
 */

const request = require("supertest");
const app = require("../app");

const { nanoid } = require('nanoid')

describe("Testing general server functions.", () => {
  test("GET /", (done) => {
    request(app)
      .get("/")
      .set('x-request-id', `test-${nanoid(6)}`)
      .expect("Content-Type", /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  })
})

