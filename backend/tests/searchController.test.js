const request = require("supertest");
const app = require("../server");

describe("GET /api/search", () => {
  it("should return 400 if query is missing", async () => {
    const res = await request(app).get("/api/search");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Query is required");
  });

  it("should return results for a valid query", async () => {
    const res = await request(app).get("/api/search").query({ q: "東京" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
