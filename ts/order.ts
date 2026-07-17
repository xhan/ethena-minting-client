import { DOMAIN, ETHENA_URL, ORDER_TYPE } from "./protocol";
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
}

export function createOrder(
  rfq: Rfq,
  benefactor: Address,
  beneficiary: Address,
  options: CreateOrderOptions = {}
): OrderSending {
  const now = options.now ?? Date.now();

  return {
    order_id: rfq.rfq_id,
    order_type: rfq.side,
    expiry: Math.floor(now / 1000) + 60,
    nonce: now,
    benefactor,
    beneficiary,
    collateral_asset: rfq.collateral_asset_address,
    collateral_amount: rfq.collateral_amount,
    usde_amount: rfq.usde_amount,
  };
}

export function getOrderTypedData(order: OrderSending) {
  return {
    domain: DOMAIN,
    message: {
      ...order,
      order_type: order.order_type === "MINT" ? 0 : 1,
      expiry: BigInt(order.expiry),
      nonce: BigInt(order.nonce),
      collateral_amount: BigInt(order.collateral_amount),
      usde_amount: BigInt(order.usde_amount),
    },
    primaryType: "Order" as const,
    types: ORDER_TYPE,
  };
}

export async function submitOrder(
  order: OrderSending,
  signature: Hex,
  fetchImpl: typeof fetch = fetch
) {
  const params = new URLSearchParams({
    signature,
    signature_type: "EIP712",
  });
  const response = await fetchImpl(`${ETHENA_URL}order?${params}`, {
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
