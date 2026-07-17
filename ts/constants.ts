import "dotenv/config";

export { DOMAIN, ETHENA_URL, MINT_ADDRESS, ORDER_TYPE } from "./protocol";

export const RPC_URL = process.env.RPC_URL as string;
