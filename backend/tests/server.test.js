const request = require("supertest");
const sendEmails = require("../modules/emailSender");
const app = require("../server");
const {
  getPendingRequests,
  clearPendingRequests,
} = require("../models/pendingRequests");

jest.mock("../modules/emailSender");
jest.mock("../models/pendingRequests");

describe("Server", () => {
  it("should serve static files from the public directory", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });

  it("should handle 404 errors", async () => {
    const res = await request(app).get("/non-existent-route");
    expect(res.status).toBe(404);
  });

  it("should serve the frontend app from the dist directory", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("<!doctype html>");
  });
});
