// tests/basic.test.ts
describe("Basic Setup Test", () => {
  test("1 + 1 should equal 2", () => {
    expect(1 + 1).toBe(2);
  });

  test("Jest should handle async", async () => {
    const result = await Promise.resolve("success");
    expect(result).toBe("success");
  });
});
