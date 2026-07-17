import "dotenv/config";
import {
  Address,
  createPublicClient,
  createWalletClient,
  erc20Abi,
  Hex,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";
import {
  OrderSending,
  OrderSigning,
  SignatureType,
  Signature,
} from "./types";
import { Rfq } from "./rfq";
import {
  DOMAIN,
  RPC_URL,
  MINT_ADDRESS,
  ORDER_TYPE,
} from "./constants";
import {
  createOrder,
  submitOrder as submitOrderRequest,
} from "./order";
export { getRfq } from "./rfq";

export async function createMintOrder(
  rfqData: Rfq,
  benefactor: Address,
  beneficiary: Address,
  collateralAsset: Address
): Promise<OrderSending> {
  return createOrder({
    ...rfqData,
    collateral_asset_address: collateralAsset,
  }, benefactor, beneficiary);
}

export async function signOrder(
  order: OrderSigning,
  privateKey: string
): Promise<Signature> {
  const walletClient = createWalletClient({
    chain: mainnet,
    transport: http(RPC_URL),
  });

  const account = privateKeyToAccount(privateKey as Hex);

  const signature = await walletClient.signTypedData({
    account,
    domain: DOMAIN,
    message: order,
    primaryType: "Order",
    types: ORDER_TYPE,
  });

  return {
    signature_type: SignatureType.EIP712,
    signature_bytes: signature,
  };
}

export async function getAllowance(
  collateralAddress: `0x${string}`,
  privateKey: string
) {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(process.env.RPC_URL as string),
  });
  const { address } = privateKeyToAccount(privateKey as Hex);

  const allowance = await publicClient.readContract({
    address: collateralAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address, MINT_ADDRESS],
  });
  return allowance;
}

export async function approve(
  collateralAddress: `0x${string}`,
  privateKey: string,
  amount: bigint
) {
  const account = privateKeyToAccount(privateKey as `0x${string}`);

  const walletClient = createWalletClient({
    chain: mainnet,
    transport: http(process.env.RPC_URL as string),
  });

  const txHash = await walletClient.writeContract({
    account,
    chain: mainnet,
    address: collateralAddress,
    abi: erc20Abi,
    functionName: "approve",
    args: [MINT_ADDRESS, amount],
  });
  return txHash;
}

export function bigIntAmount(amount: number) {
  return BigInt(amount) * BigInt(10 ** 6);
}

export const UINT256_MAX = BigInt(2) ** BigInt(256) - BigInt(1);

export async function submitOrder(order: OrderSending, signature: Signature) {
  const result = await submitOrderRequest(order, signature.signature_bytes);
  return result.tx;
}
