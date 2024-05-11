import { test } from '@playwright/test';

test.describe("Wallet is connected", () => {
    test.use({
      storageState: "playwright-tests/storage-states/wallet-connected.json",
    });
    test("should show proposal feed", async ({ page }) => {
      // Navigate to the proposal feed page using the same pattern as in rfp.spec.js
      await page.goto('/infrastructure-committee.near/widget/near-prpsls-bos.components.pages.app?page=proposals');

      // Check if the proposal feed is visible
      const feedSelector = '.proposal-feed';
      await page.waitForSelector(feedSelector);
      const feedVisible = await page.isVisible(feedSelector);
      expect(feedVisible).toBe(true);

      // Optionally, check for the existence of proposal items if needed
      // const proposalItems = await page.$$(feedSelector + ' .proposal-item');
      // expect(proposalItems.length).toBeGreaterThan(0);
    });
});
