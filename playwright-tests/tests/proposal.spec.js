import { test, expect } from "@playwright/test";

test.describe("Wallet is connected", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-connected.json",
  });
  test("should show proposal feed", async ({ page }) => {
    await page.goto(
      "/infrastructure-committee.near/widget/near-prpsls-bos.components.pages.app?page=proposals"
    );

    await expect(await page.locator(".proposal-card").first()).toBeVisible();
  });
  test("should create proposal", async ({ page }) => {
    await page.goto(
      "/infrastructure-committee.near/widget/near-prpsls-bos.components.pages.app?page=proposals"
    );

    await page.getByRole("button", { name: " Submit Proposal" }).click();
    await page.waitForTimeout(2000);
  });
});
