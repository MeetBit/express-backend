/**
 * Main Test File.
 * 
 * @group unit
 * @group integration
 * @group calendar
 */

 const request = require("supertest");
 const app = require("#root/app");
 
 const { nanoid } = require('nanoid')
 
 describe("Testing calendar functions.", () => {
   test("GET /", (done) => {
     request(app)
       .get("/calendar/123")
       .set('x-request-id', `test-${nanoid(6)}`)
       .expect(200)
       .end((err, res) => {
         if (err) return done(err);
         return done();
       });
   })

   test("POST /calendar", (done) => {
    request(app)
      .post("/calendar")
      .set('x-request-id', `test-${nanoid(6)}`)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  })

  test("PATCH /calendar", (done) => {
    request(app)
      .patch("/calendar/123")
      .set('x-request-id', `test-${nanoid(6)}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  })

  test("DELETE /calendar", (done) => {
    request(app)
      .delete("/calendar/123")
      .set('x-request-id', `test-${nanoid(6)}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  })
 })
 
 