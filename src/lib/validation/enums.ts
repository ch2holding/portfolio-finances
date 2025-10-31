import { z } from "zod";

export const currencyEnum = z.enum(["BRL"]);

export const accountTypeEnum = z.enum([
  "card_credit",
  "card_debit",
  "prepaid",
  "wallet_cash",
  "bank_checking",
  "bank_savings",
]);

export const cardBrandEnum = z.enum([
  "visa",
  "mastercard",
  "amex",
  "elo",
  "hipercard",
  "vr",
  "sodexo",
  "alelo",
  "other",
]);

export const transactionTypeEnum = z.enum(["expense", "income", "transfer"]);

export const installmentStatusEnum = z.enum([
  "scheduled",
  "posted",
  "paid",
  "canceled",
  "refunded",
]);

export const invAccountKindEnum = z.enum([
  "brokerage",
  "savings",
  "pension",
  "crypto_exchange",
]);

export const assetTypeEnum = z.enum([
  "savings",
  "cdb",
  "lci",
  "lca",
  "tesouro",
  "fundo",
  "fii",
  "acao",
  "etf",
  "cripto",
  "outro",
]);

export const pointsProgramNameEnum = z.enum([
  "livelo",
  "esfera",
  "iupp",
  "smiles",
  "latam_pass",
  "tudoazul",
  "ame",
  "meli",
  "outro",
]);

export const pointsBalanceStatusEnum = z.enum([
  "active",
  "redeemed",
  "expired",
]);

export const pointsOperationTypeEnum = z.enum([
  "earn",
  "redeem",
  "transfer_in",
  "transfer_out",
  "adjust",
]);

export const aiRoleEnum = z.enum(["user", "assistant", "tool"]);
