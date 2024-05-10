import { test, expect } from "@playwright/test";

test.describe("Wallet is connected", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-connected.json",
  });
  test("should open RFPs", async ({ page }) => {
    await page.goto(
      "/infrastructure-committee.near/widget/near-prpsls-bos.components.pages.app?page=rfps"
    );

    await expect(await page.locator(".content-container")).toContainText("RFP");
    await page.waitForTimeout(6000);
  });
});
