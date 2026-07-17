import type { Rfq } from "./rfq";
type Address = `0x${string}`;
type Hex = `0x${string}`;
export interface OrderSending {
    benefactor: Address;
    beneficiary: Address;
    collateral_asset: Address;
    collateral_amount: string;
    expiry: number;
    nonce: number;
    order_id: string;
    order_type: "MINT" | "REDEEM";
    usde_amount: string;
}
interface CreateOrderOptions {
    now?: number;
    nonce?: number;
}
export declare function createOrder(rfq: Rfq, benefactor: Address, beneficiary: Address, options?: CreateOrderOptions): OrderSending;
export declare function getOrderTypedData(order: OrderSending): {
    domain: {
        readonly chainId: 1;
        readonly name: "EthenaMinting";
        readonly verifyingContract: "0xe3490297a08d6fC8Da46Edb7B6142E4F461b62D3";
        readonly version: "1";
    };
    message: {
        order_type: number;
        expiry: bigint;
        nonce: bigint;
        collateral_amount: bigint;
        usde_amount: bigint;
        benefactor: Address;
        beneficiary: Address;
        collateral_asset: Address;
        order_id: string;
    };
    primaryType: "Order";
    types: {
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
};
export declare function submitOrder(order: OrderSending, signature: Hex, fetchImpl?: typeof fetch): Promise<any>;
export {};
