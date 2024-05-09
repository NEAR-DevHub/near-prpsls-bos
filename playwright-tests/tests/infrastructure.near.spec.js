import { test, expect } from "@playwright/test";

test.describe("Wallet is connected", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-connected.json",
  });
  test("should go to homepage and click header links", async ({ page }) => {
    await page.goto(
      "/infrastructure-committee.near/widget/near-prpsls-bos.components.pages.app"
    );

    const aboutHeaderLink = await page.getByRole("link", { name: "About" });
    await expect(aboutHeaderLink).toBeVisible();
    await aboutHeaderLink.click();
    await expect(await page.locator(".content-container")).toContainText(
      "About"
    );

    const adminHeaderLink = await page.getByRole("link", { name: "Admin" });
    await expect(adminHeaderLink).toBeVisible();
    await adminHeaderLink.click();
    await expect(await page.locator(".content-container")).toContainText(
      "Admin"
    );

    const proposalsHeaderLink = await page.getByRole("link", {
      name: "Proposals",
    });
    await expect(proposalsHeaderLink).toBeVisible();
    await proposalsHeaderLink.click();
    await expect(await page.locator(".content-container")).toContainText(
      "Feed"
    );

    const rfpsHeaderLink = await page.getByRole("link", { name: "RFPs" });
    await expect(rfpsHeaderLink).toBeVisible();
    await rfpsHeaderLink.click();
    await expect(await page.locator(".content-container")).toContainText("RFP");
  });
});
