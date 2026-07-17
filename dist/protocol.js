"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERIFY_ORDER_ABI = exports.ORDER_TYPE = exports.DOMAIN = exports.ETHENA_URL = exports.MINT_ADDRESS = void 0;
exports.MINT_ADDRESS = "0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3";
exports.ETHENA_URL = "https://public.api.ethena.fi/";
exports.DOMAIN = {
    chainId: 1,
    name: "EthenaMinting",
    verifyingContract: exports.MINT_ADDRESS,
    version: "1",
};
exports.ORDER_TYPE = {
    Order: [
        { name: "order_id", type: "string" },
        { name: "order_type", type: "uint8" },
        { name: "expiry", type: "uint128" },
        { name: "nonce", type: "uint120" },
        { name: "benefactor", type: "address" },
        { name: "beneficiary", type: "address" },
        { name: "collateral_asset", type: "address" },
        { name: "collateral_amount", type: "uint128" },
        { name: "usde_amount", type: "uint128" },
    ],
};
exports.VERIFY_ORDER_ABI = [
    "function verifyOrder((string order_id,uint8 order_type,uint120 expiry,uint128 nonce,address benefactor,address beneficiary,address collateral_asset,uint128 collateral_amount,uint128 usde_amount) order,(uint8 signature_type,bytes signature_bytes) signature) view returns (bytes32)",
];
