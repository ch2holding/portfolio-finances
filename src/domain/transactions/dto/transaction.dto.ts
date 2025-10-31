export interface CreateTransactionDTO {
  userId: string;
  accountId: string;

  accountType:
    | "card_credit"
    | "card_debit"
    | "prepaid"
    | "wallet_cash"
    | "bank_checking"
    | "bank_savings";
  cardBrand?:
    | "visa"
    | "mastercard"
    | "amex"
    | "elo"
    | "hipercard"
    | "vr"
    | "sodexo"
    | "alelo"
    | "other";

  date: number; // ts ms
  description: string;
  merchant?: string;
  amount: number; // cents
  type: "expense" | "income" | "transfer";
  categoryId?: string;
  tags?: string[];

  installmentGroupId?: string;
  installmentNumber?: number;
  installmentCount?: number;
  purchaseDate?: number; // ts
  dueDate?: number; // ts
  statementMonth?: string; // 'yyyymm'
  interestAmount?: number; // cents
  feesAmount?: number; // cents
  status?: "scheduled" | "posted" | "paid" | "canceled" | "refunded";
}

export interface UpdateTransactionDTO extends Partial<CreateTransactionDTO> {
  id: string;
  userId: string;
}
