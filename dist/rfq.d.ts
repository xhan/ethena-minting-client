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
export declare function getRfq(pair: string, type: string, side: "MINT" | "REDEEM", size: string, benefactor: Address): Promise<Rfq>;
export {};
