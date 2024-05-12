import { test, expect } from "@playwright/test";
import { pauseIfVideoRecording } from "../util/videorecording";

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
    await page.getByText("Search RFP").click();
    await page.getByText("# 1 : Testing linked proposals").click();
    await expect(
      await page.getByRole("link", { name: "# 1 : Testing linked proposals" })
    ).toBeVisible();

    await page.getByText("Select Category").click();
    await page.getByText("Indexers").click();
    await expect(page.locator(".badge")).toHaveText("Indexers");

    await page.getByRole("textbox").first().fill("The title");

    await page
      .locator('textarea[type="text"]')
      .fill("The excellent proposal summary");
    await page
      .frameLocator("iframe")
      .locator(".CodeMirror textarea")
      .pressSequentially("The proposal description. This proposal should win.");

    await page.getByRole("textbox").nth(3).fill("2000");
    await page.getByRole("checkbox").first().click();
    await page.getByRole("checkbox").nth(1).click();
    await page.getByText("Submit Draft").click();

    const transactionText = JSON.stringify(
      JSON.parse(await page.locator("div.modal-body code").innerText()),
      null,
      1
    );
    await expect(transactionText).toEqual(
      JSON.stringify(
        {
          labels: ["Indexers"],
          body: {
            proposal_body_version: "V0",
            linked_rfp: 1,
            category: "Infrastructure Committee",
            name: "The title",
            description: "The proposal description. This proposal should win.",
            summary: "The excellent proposal summary",
            linked_proposals: [],
            requested_sponsorship_usd_amount: "2000",
            requested_sponsorship_paid_in_currency: "USDC",
            receiver_account: "efiz.near",
            requested_sponsor: "infrastructure-committee.near",
            timeline: {
              status: "DRAFT",
            },
          },
        },
        null,
        1
      )
    );

    await pauseIfVideoRecording(page);
  });
});
