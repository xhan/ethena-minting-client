const assert = require("node:assert/strict");
const test = require("node:test");

const { getRfq } = require("../dist");

test("getRfq preserves decimal size text", async () => {
  const originalFetch = global.fetch;
  let requestedUrl;
  global.fetch = async (url) => {
    requestedUrl = String(url);
    return {
      json: async () => ({ rfq_id: "RFQ-TEST" })
    };
  };

  try {
    const result = await getRfq(
      "USDC/USDe",
      "ALGO",
      "MINT",
      "1000.000000001",
      "0x1234567890abcdef1234567890abcdef12345678"
    );

    assert.equal(result.rfq_id, "RFQ-TEST");
    assert.match(requestedUrl, /size=1000\.000000001/u);
  } finally {
    global.fetch = originalFetch;
  }
});
