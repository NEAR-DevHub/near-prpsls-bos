import { test, expect } from "@playwright/test";
import { pauseIfVideoRecording } from "../util/videorecording";
import { mockRpcRequest } from "../util/rpcmock";
import {
  setupRPCResponsesForDontAskAgain,
  transactionCompleted,
} from "../util/dontaskagain";
import { setDontAskAgainCacheValues } from "../util/cache";

test.describe("Wallet is connected", () => {
  test.use({
    storageState: "playwright-tests/storage-states/wallet-connected.json",
  });
  test("should open RFPs and also search with a query that has no results", async ({
    page,
  }) => {
    await page.goto(
      "/infrastructure-committee.near/widget/near-prpsls-bos.components.pages.app?page=rfps"
    );

    await expect(await page.locator(".content-container")).toContainText("RFP");
    await expect(await page.locator(".rfp-card").first()).toContainText(
      "Submission Deadline"
    );

    await page
      .getByPlaceholder("Search by content")
      .fill("baysyeir77feroiyvbadfa");
    await expect(await page.locator(".rfp-card").first()).not.toBeAttached();
    await expect(await page.locator(".rfp-card").count()).toEqual(0);
    await pauseIfVideoRecording(page);
  });
  test("create RFP button should be hidden for a non admin account", async ({
    page,
  }) => {
    await page.goto(
      "/infrastructure-committee.near/widget/near-prpsls-bos.components.pages.app?page=rfps"
    );
    await expect(await page.locator(".content-container")).toContainText("RFP");
    await expect(await page.locator(".rfp-card").first()).toContainText(
      "Submission Deadline"
    );

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
    await mockRpcRequest({
      page,
      filterParams: {
        method_name: "get_global_labels",
      },
      mockedResult: [
        {
          value: "Data Lakes",
          title: "Data Lakes",
          color: [0, 255, 0],
        },
        {
          value: "Explorers",
          title: "Explorers",
          color: [0, 255, 255],
        },
      ],
    });

    await page.goto(
      "/infrastructure-committee.near/widget/near-prpsls-bos.components.pages.app?page=rfps"
    );
    await page.getByRole("button", { name: " Create RFP" }).click();
    await page.getByText("Select Category").click();
    await page.getByText("Explorers").click();
    await expect(page.locator(".badge")).toHaveText("Explorers");
    await page.locator('input[type="text"]').pressSequentially("test title");
    await page.locator('input[type="date"]').pressSequentially("2030-01-05");
    await page
      .locator('textarea[type="text"]')
      .pressSequentially("the rfp summary");
    await page
      .frameLocator("iframe")
      .locator(".CodeMirror textarea")
      .pressSequentially("The RFP description");

    await page.getByRole("checkbox").first().click();
    await page.getByRole("checkbox").nth(1).click();

    const submitbutton = await page.locator("button", { hasText: "submit" });
    await submitbutton.scrollIntoViewIfNeeded();
    await expect(submitbutton).toBeEnabled();
    await pauseIfVideoRecording(page);
    await submitbutton.click();

    const transactionText = JSON.stringify(
      JSON.parse(await page.locator("div.modal-body code").innerText()),
      null,
      1
    );
    await expect(transactionText).toEqual(
      JSON.stringify(
        {
          labels: ["Explorers"],
          body: {
            rfp_body_version: "V0",
            name: "test title",
            description: "The RFP description",
            summary: "the rfp summary",
            submission_deadline: "-58850841600000000000",
            timeline: {
              status: "ACCEPTING_SUBMISSIONS",
            },
          },
        },
        null,
        1
      )
    );
    await pauseIfVideoRecording(page);
  });
  test("should cancel RFP", async ({ page }) => {
    await mockRpcRequest({
      page,
      filterParams: {
        method_name: "get_rfp",
      },
      modifyOriginalResultFunction: async (originalResult) => {
        console.log(JSON.stringify(originalResult, null, 1));
        originalResult.snapshot.timeline.status = "ACCEPTING_SUBMISSIONS";
        originalResult.snapshot.linked_proposals = [2, 3];
        return originalResult;
      },
    });

    await page.goto(
      "/infrastructure-committee.near/widget/near-prpsls-bos.components.pages.app?page=rfp&id=1"
    );
    const buttonSelector = `div[data-testid="setting-btn"]`;
    await page.waitForSelector(buttonSelector, {
      state: "visible",
    });
    await page.click(buttonSelector);
    await page.getByRole("button", { name: "Accepting Submissions" }).click();
    await page.getByText("Cancelled", { exact: true }).click();
    await page.getByRole("radio").first().click();
    await page.getByRole("button", { name: "Ready to Cancel" }).click();

    const transactionText = JSON.stringify(
      JSON.parse(await page.locator("div.modal-body code").innerText()),
      null,
      1
    );
    await expect(transactionText).toEqual(
      JSON.stringify(
        {
          id: 1,
          proposals_to_cancel: [2, 3],
          proposals_to_unlink: [],
        },
        null,
        1
      )
    );
    await pauseIfVideoRecording(page);
  });
  test("should edit RFP", async ({ page }) => {
    await mockRpcRequest({
      page,
      filterParams: {
        method_name: "get_rfp",
      },
      modifyOriginalResultFunction: async (originalResult) => {
        console.log(JSON.stringify(originalResult, null, 1));
        originalResult.snapshot.timeline.status = "ACCEPTING_SUBMISSIONS";
        originalResult.snapshot.linked_proposals = [2, 3];
        return originalResult;
      },
    });

    await page.goto(
      "/infrastructure-committee.near/widget/near-prpsls-bos.components.pages.app?page=rfp&id=1"
    );
    await page.getByRole("button", { name: "Edit" }).click();

    await page.locator(".badge .bi-trash3-fill").click();
    await page.getByText("Select Category").click();
    await page.getByText("Explorers").click();

    await expect(page.locator(".badge")).toHaveText("Explorers");
    await page
      .locator('input[type="text"]')
      .pressSequentially("test edited title");
    await page.locator('input[type="date"]').pressSequentially("01052030");
    await page
      .locator('textarea[type="text"]')
      .pressSequentially("the edited rfp summary");
    await page
      .frameLocator("iframe")
      .locator(".CodeMirror textarea")
      .pressSequentially("The edited RFP description");

    await pauseIfVideoRecording(page);
    await page.getByRole("button", { name: "Submit" }).click();

    const transactionText = JSON.stringify(
      JSON.parse(await page.locator("div.modal-body code").innerText()),
      null,
      1
    );
    await expect(transactionText).toEqual(
      JSON.stringify(
        {
          labels: ["Explorers"],
          body: {
            rfp_body_version: "V0",
            name: "test edited titletest",
            description: "test",
            summary: "the edited rfp summarytest",
            submission_deadline: "1893801600000000000",
            timeline: {
              status: "ACCEPTING_SUBMISSIONS",
            },
          },
          id: 1,
        },
        null,
        1
      )
    );
  });
});

test.describe("Admin with don't ask again enabled", () => {
  test.use({
    storageState:
      "playwright-tests/storage-states/wallet-connected-admin-dont-ask-again.json",
  });
  test("should edit RFP", async ({ page }) => {
    const theNewDescription = "The edited RFP description";
    await setupRPCResponsesForDontAskAgain(page);
    await mockRpcRequest({
      page,
      filterParams: {
        method_name: "get_rfp",
      },
      modifyOriginalResultFunction: async (originalResult) => {
        if (transactionCompleted) {
          originalResult.snapshot.description = theNewDescription;
          originalResult.snapshot.timestamp = (
            BigInt(new Date().getTime()) * BigInt(1_000_000)
          ).toString();
          originalResult.snapshot.block_height += "1";
        }

        return originalResult;
      },
    });
    await page.goto(
      "/infrastructure-committee.near/widget/near-prpsls-bos.components.pages.app?page=rfp&id=1"
    );
    await setDontAskAgainCacheValues({
      page,
      widgetSrc:
        "infrastructure-committee.near/widget/near-prpsls-bos.components.rfps.Editor",
      methodName: "edit_rfp",
    });

    await page.getByRole("button", { name: "Edit" }).click();

    const descriptionArea = await page
      .frameLocator("iframe")
      .locator(".CodeMirror textarea");
    await descriptionArea.fill(theNewDescription);
    await descriptionArea.blur();

    await pauseIfVideoRecording(page);
    await page.getByRole("button", { name: "Submit" }).click();
    const transactionToast = await page.locator(".toast-header");
    await expect(transactionToast).toHaveText("Sending transaction");
    await expect(transactionToast).not.toBeAttached();
    // check for navigation modal
    const navigationModal = await page.getByText(
      "Your RFP has been successfully edited"
    );
    await expect(navigationModal).toBeVisible();
    await pauseIfVideoRecording(page);
  });
});
