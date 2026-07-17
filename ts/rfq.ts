const ETHENA_URL = "https://public.api.ethena.fi/";

type Address = `0x${string}`;

export interface Rfq {
  amount: string;
  collateral_amount: string;
  collateral_asset_address: Address;
  gas: string;
  minting_contract_address: Address;
  pair: string;
  rfq_id: string;
  side: "MINT" | "REDEEM";
  size: string;
  usde_address: Address;
  usde_amount: string;
}

export async function getRfq(
  pair: string,
  type: string,
  side: "MINT" | "REDEEM",
  size: string,
  benefactor: Address
): Promise<Rfq> {
  const response = await fetch(
    `${ETHENA_URL}rfq?pair=${pair}&type_=${type}&side=${side}&size=${size}&benefactor=${benefactor}`
  );
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
  return result as Rfq;
}
