"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRfq = getRfq;
const ETHENA_URL = "https://public.api.ethena.fi/";
async function getRfq(pair, type, side, size, benefactor) {
    const response = await fetch(`${ETHENA_URL}rfq?pair=${pair}&type_=${type}&side=${side}&size=${size}&benefactor=${benefactor}`);
    const result = await response.json();
    if (!response.ok || (result && typeof result === "object" && "error" in result)) {
        const error = result && typeof result === "object" && "error" in result
            ? result.error
            : undefined;
        const message = typeof error === "string"
            ? error
            : error && typeof error === "object" && "message" in error
                ? String(error.message)
                : `HTTP ${response.status}`;
        throw new Error(`Ethena RFQ 查询失败: ${message}`);
    }
    return result;
}
