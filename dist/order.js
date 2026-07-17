"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
exports.getOrderTypedData = getOrderTypedData;
exports.submitOrder = submitOrder;
exports.getOrderConfirmation = getOrderConfirmation;
const protocol_1 = require("./protocol");
function createOrder(rfq, benefactor, beneficiary, options = {}) {
    const now = options.now ?? Date.now();
    return {
        order_id: rfq.rfq_id,
        order_type: rfq.side,
        expiry: Math.floor(now / 1000) + 60,
        nonce: options.nonce ?? now,
        benefactor,
        beneficiary,
        collateral_asset: rfq.collateral_asset_address,
        collateral_amount: rfq.collateral_amount,
        usde_amount: rfq.usde_amount,
    };
}
function getOrderTypedData(order) {
    return {
        domain: protocol_1.DOMAIN,
        message: {
            ...order,
            order_type: order.order_type === "MINT" ? 0 : 1,
            expiry: BigInt(order.expiry),
            nonce: BigInt(order.nonce),
            collateral_amount: BigInt(order.collateral_amount),
            usde_amount: BigInt(order.usde_amount),
        },
        primaryType: "Order",
        types: protocol_1.ORDER_TYPE,
    };
}
async function submitOrder(order, signature, fetchImpl = fetch) {
    const params = new URLSearchParams({
        signature,
        signature_type: "EIP712",
    });
    const response = await fetchImpl(`${protocol_1.ETHENA_URL}order?${params}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });
    const result = await response.json();
    if (!response.ok || (result && typeof result === "object" && "error" in result)) {
        const message = result && typeof result === "object" && "error" in result
            ? String(result.error)
            : `HTTP ${response.status}`;
        throw new Error(`Ethena order 提交失败: ${message}`);
    }
    return result;
}
async function getOrderConfirmation(orderId, fetchImpl = fetch, options = {}) {
    const params = new URLSearchParams({ order_id: orderId });
    const response = await fetchImpl(`${protocol_1.ETHENA_URL}order-confirmation?${params}`, {
        signal: options.signal,
    });
    const result = await response.json();
    if (!response.ok || (result && typeof result === "object" && "error" in result)) {
        const message = result && typeof result === "object" && "error" in result
            ? String(result.error)
            : `HTTP ${response.status}`;
        throw new Error(`Ethena order confirmation 查询失败: ${message}`);
    }
    return result;
}
