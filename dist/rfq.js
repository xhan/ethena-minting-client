"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRfq = getRfq;
const ETHENA_URL = "https://public.api.ethena.fi/";
async function getRfq(pair, type, side, size, benefactor) {
    const response = await fetch(`${ETHENA_URL}rfq?pair=${pair}&type_=${type}&side=${side}&size=${size}&benefactor=${benefactor}`);
    return (await response.json());
}
