const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../routes");
const {
  getPendingRequests,
  clearPendingRequests,
} = require("../models/pendingRequests");

const app = express();
app.use(bodyParser.json());
app.use("/api", routes);

describe("Request Controller", () => {
  beforeEach(() => {
    clearPendingRequests();
  });

  it("should return 400 if user is not registered", async () => {
    const res = await request(app)
      .post("/api/submit")
      .send({ name: "invalid_id", message: "Test message" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("User not registered");
  });

  it("should return 400 if user is over 10 years old", async () => {
    const res = await request(app)
      .post("/api/submit")
      .send({ name: "james.bond", message: "Test message" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("User is over 10 years old");
  });

  it("should return 200 if user is valid and under 10 years old", async () => {
    const res = await request(app)
      .post("/api/submit")
      .send({ name: "charlie.brown", message: "Test message" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Request received");
  });
});
