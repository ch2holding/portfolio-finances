import type { AccountType, CardBrand } from "@domain/accounts/types/account";
import type { BaseEntity } from "../../../types/common";

export type TransactionType = "expense" | "income" | "transfer";

export interface Transaction extends BaseEntity {
  accountId: string;
  accountType: AccountType;
  cardBrand?: CardBrand;

  date: number;
  description: string;
  merchant?: string;
  amount: number;
  type: TransactionType;
  categoryId?: string;
  tags?: string[];

  installmentGroupId?: string;
  installmentNumber?: number;
  installmentCount?: number;
  purchaseDate?: number;
  dueDate?: number;
  statementMonth?: string;
  interestAmount?: number;
  feesAmount?: number;
  status?: "scheduled" | "posted" | "paid" | "canceled" | "refunded";

  llm?: {
    classified: boolean;
    model?: string;
    confidence?: number;
    raw?: string;
  };
}
