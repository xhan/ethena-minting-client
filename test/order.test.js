const assert = require("node:assert/strict");
const test = require("node:test");

const {
  createOrder,
  getOrderTypedData,
  submitOrder
} = require("../dist");

const rfq = {
  collateral_amount: "1000000000",
  collateral_asset_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  rfq_id: "RFQ-TEST",
  side: "MINT",
  usde_amount: "999200000000000000000"
};

test("createOrder preserves RFQ integer amounts", () => {
  const order = createOrder(
    rfq,
    "0x1234567890abcdef1234567890abcdef12345678",
    "0x1234567890abcdef1234567890abcdef12345678",
    { now: 1_700_000_000_123 }
  );

  assert.deepEqual(order, {
    order_id: "RFQ-TEST",
    order_type: "MINT",
    expiry: 1_700_000_060,
    nonce: 1_700_000_000_123,
    benefactor: "0x1234567890abcdef1234567890abcdef12345678",
    beneficiary: "0x1234567890abcdef1234567890abcdef12345678",
    collateral_asset: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    collateral_amount: "1000000000",
    usde_amount: "999200000000000000000"
  });
});

test("getOrderTypedData converts an API order into exact EIP-712 values", () => {
  const order = createOrder(
    rfq,
    "0x1234567890abcdef1234567890abcdef12345678",
    "0x1234567890abcdef1234567890abcdef12345678",
    { now: 1_700_000_000_123 }
  );
  const typedData = getOrderTypedData(order);

  assert.equal(typedData.primaryType, "Order");
  assert.equal(typedData.message.order_type, 0);
  assert.equal(typedData.message.expiry, 1_700_000_060n);
  assert.equal(typedData.message.nonce, 1_700_000_000_123n);
  assert.equal(typedData.message.collateral_amount, 1_000_000_000n);
  assert.equal(typedData.message.usde_amount, 999_200_000_000_000_000_000n);
});

test("submitOrder sends the signed order to the official order endpoint", async () => {
  let request;
  const order = createOrder(
    rfq,
    "0x1234567890abcdef1234567890abcdef12345678",
    "0x1234567890abcdef1234567890abcdef12345678",
    { now: 1_700_000_000_123 }
  );

  const result = await submitOrder(order, "0xsignature", async (url, options) => {
    request = { url: String(url), options };
    return {
      ok: true,
      json: async () => ({ tx: "0xtx" })
    };
  });

  assert.equal(request.url, "https://public.api.ethena.fi/order?signature=0xsignature&signature_type=EIP712");
  assert.equal(request.options.method, "POST");
  assert.deepEqual(JSON.parse(request.options.body), order);
  assert.deepEqual(result, { tx: "0xtx" });
});
