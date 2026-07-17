import { Hex, Address } from "viem";
export type { Rfq } from "./rfq";
export type { OrderSending } from "./order";

export enum SignatureType {
  EIP712 = 0,
  EIP1271 = 1,
}

export interface Signature {
  signature_type: SignatureType;
  signature_bytes: Hex;
}

export enum Side {
  MINT = "MINT",
  REDEEM = "REDEEM",
}

export interface OrderBase {
  benefactor: Address;
  beneficiary: Address;
  collateral_asset: Address;
  order_id: string;
}

export interface OrderSigning extends OrderBase {
  nonce: bigint;
  expiry: bigint;
  order_type: number;
  usde_amount: bigint;
  collateral_amount: bigint;
}
