export declare const MINT_ADDRESS = "0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3";
export declare const ETHENA_URL = "https://public.api.ethena.fi/";
export declare const DOMAIN: {
    readonly chainId: 1;
    readonly name: "EthenaMinting";
    readonly verifyingContract: "0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3";
    readonly version: "1";
};
export declare const ORDER_TYPE: {
    readonly Order: readonly [{
        readonly name: "order_id";
        readonly type: "string";
    }, {
        readonly name: "order_type";
        readonly type: "uint8";
    }, {
        readonly name: "expiry";
        readonly type: "uint128";
    }, {
        readonly name: "nonce";
        readonly type: "uint120";
    }, {
        readonly name: "benefactor";
        readonly type: "address";
    }, {
        readonly name: "beneficiary";
        readonly type: "address";
    }, {
        readonly name: "collateral_asset";
        readonly type: "address";
    }, {
        readonly name: "collateral_amount";
        readonly type: "uint128";
    }, {
        readonly name: "usde_amount";
        readonly type: "uint128";
    }];
};
export declare const VERIFY_ORDER_ABI: readonly ["function verifyOrder((string order_id,uint8 order_type,uint120 expiry,uint128 nonce,address benefactor,address beneficiary,address collateral_asset,uint128 collateral_amount,uint128 usde_amount) order,(uint8 signature_type,bytes signature_bytes) signature) view returns (bytes32)"];
