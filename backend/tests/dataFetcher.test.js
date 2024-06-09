const { fetchUserProfiles, fetchUsers } = require("../modules/dataFetcher");

describe("Data Fetcher Module", () => {
  it("should fetch user profiles", async () => {
    const userProfiles = await fetchUserProfiles();
    expect(userProfiles).toBeDefined();
    expect(userProfiles.length).toBeGreaterThan(0);
  });

  it("should fetch users", async () => {
    const users = await fetchUsers();
    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(0);
  });
});
