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
    await expect(
      await page.locator(".rfp-item-container").first()
    ).toContainText("Submission Deadline");

    await page
      .getByPlaceholder("Search by content")
      .fill("baysyeir77feroiyvbadfa");
    await expect(await page.locator(".rfp-item-container")).not.toBeAttached();
    await expect(await page.locator(".rfp-item-container").count()).toEqual(0);
  });
  test("create RFP button should be hidden for a non admin account", async ({
    page,
  }) => {
    await page.goto(
      "/infrastructure-committee.near/widget/near-prpsls-bos.components.pages.app?page=rfps"
    );
    await expect(await page.locator(".content-container")).toContainText("RFP");
    await expect(
      await page.locator(".rfp-item-container").first()
    ).toContainText("Submission Deadline");

    await expect(
      await page.getByPlaceholder("Search by content")
    ).toBeEditable();

    await expect(
      await page.getByRole("button", { name: " Create RFP" })
    ).not.toBeVisible();
  });
});

test.describe("Wallet is connected with admin account", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-connected-admin.json",
  });
  test("admin should be able see the create RFP button and fill the form", async ({
    page,
  }) => {
    await page.goto(
      "/infrastructure-committee.near/widget/near-prpsls-bos.components.pages.app?page=rfps"
    );
    await page.getByRole("button", { name: " Create RFP" }).click();
    await page.getByText("Select Category").click();
    await page.getByText("Explorers").click();
    await expect(page.locator(".badge")).toHaveText("Explorers");
    await page.locator('input[type="text"]').pressSequentially("test title");
    await page
      .locator('textarea[type="text"]')
      .pressSequentially("the rfp summary");
    await page
      .frameLocator("iframe")
      .locator(".CodeMirror textarea")
      .pressSequentially("The RFP description");

    await page.getByRole("checkbox").first().click();
    await page.getByRole("checkbox").nth(1).click();

    await page.locator('input[type="date"]').fill("2030-01-05");

    await page.waitForTimeout(2000);
  });
});
