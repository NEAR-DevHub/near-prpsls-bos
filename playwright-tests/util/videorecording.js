export async function pauseIfVideoRecording(page) {
  let isVideoRecorded = (await page.video()) ? true : false;
  if (isVideoRecorded) {
    await page.waitForTimeout(500);
  } else {
    await page.waitForTimeout(100);
  }
};
