export async function mockRpcRequest(
  page,
  filterParams = {},
  mockedResult = {}
) {
  await page.route("https://rpc.mainnet.near.org", async (route, request) => {
    const postData = request.postDataJSON();

    const filterParamsKeys = Object.keys(filterParams);
    if (
      filterParamsKeys.filter(
        (param) => postData.params[param] === filterParams[param]
      ).length === filterParamsKeys.length
    ) {
      const mockedResponse = {
        jsonrpc: "2.0",
        id: "dontcare",
        result: {
          result: Array.from(
            new TextEncoder().encode(JSON.stringify(mockedResult))
          ),
        },
      };

      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockedResponse),
      });
    } else {
      route.continue();
    }
  });
}
