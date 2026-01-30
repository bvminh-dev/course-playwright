import { test, expect } from "@playwright/test";

test.describe("Lesson 1: Khái niệm cơ bản", () => {
  test("Input", async ({ page }) => {
    await expect(1).toEqual(1);
  });
});
