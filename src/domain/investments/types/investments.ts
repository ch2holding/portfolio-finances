import type { BaseEntity } from "@/types/common";

export type InvestmentAccountKind =
  | "brokerage"
  | "savings"
  | "pension"
  | "crypto_exchange";

export type AssetType =
  | "savings"
  | "cdb"
  | "lci"
  | "lca"
  | "tesouro"
  | "fundo"
  | "fii"
  | "acao"
  | "etf"
  | "cripto"
  | "outro";

export interface InvestmentAccount extends BaseEntity {
  name: string;
  kind: InvestmentAccountKind;
  institution?: string;
  currency: "BRL";
}

export interface InvestmentTransaction extends BaseEntity {
  invAccountId: string;
  date: number;
  operation:
    | "buy"
    | "sell"
    | "deposit"
    | "withdraw"
    | "apply"
    | "redeem"
    | "rebalance"
    | "fee";
  assetType: AssetType;
  tickerOrName: string;
  quantity?: number;
  price?: number;
  amount?: number;
  fees?: number;
  notes?: string;
}

export interface InvestmentPosition extends BaseEntity {
  invAccountId: string;
  assetType: AssetType;
  tickerOrName: string;
  quantity?: number;
  principal?: number;
  avgPrice?: number;
  currentValue?: number;
  riskLevel?: "low" | "medium" | "high";
  tags?: string[];
}

export interface InvestmentEarning extends BaseEntity {
  invAccountId: string;
  date: number;
  assetType: AssetType;
  tickerOrName: string;
  type: "dividend" | "jcp" | "yield" | "coupon" | "interest";
  grossAmount: number;
  taxAmount: number;
  netAmount: number;
  competenceMonth?: string;
}
