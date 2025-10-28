export interface CreateAccountDTO {
  userId: string;
  name: string;
  accountType:
    | 'card_credit' | 'card_debit' | 'prepaid'
    | 'wallet_cash' | 'bank_checking' | 'bank_savings';
  currency: 'BRL';
  icon?: string;
  issuer?: string;
  last4?: string;
  cardBrand?:
    | 'visa' | 'mastercard' | 'amex' | 'elo' | 'hipercard'
    | 'vr' | 'sodexo' | 'alelo' | 'other';
  benefits?: {
    airline?: string;
    lounge?: boolean;
    cashback?: number;
    fxFee?: number;
    notes?: string;
  };
  billing?: {
    closingDay: number;
    dueDay: number;
    creditLimit?: number;
    availableCredit?: number;
  };
}

export interface UpdateAccountDTO {
  id: string;
  userId: string;
  name?: string;
  accountType?:
    | 'card_credit' | 'card_debit' | 'prepaid'
    | 'wallet_cash' | 'bank_checking' | 'bank_savings';
  currency?: 'BRL';
  icon?: string;
  issuer?: string;
  last4?: string;
  cardBrand?:
    | 'visa' | 'mastercard' | 'amex' | 'elo' | 'hipercard'
    | 'vr' | 'sodexo' | 'alelo' | 'other';
  benefits?: {
    airline?: string;
    lounge?: boolean;
    cashback?: number;
    fxFee?: number;
    notes?: string;
  };
  billing?: {
    closingDay?: number;
    dueDay?: number;
    creditLimit?: number;
    availableCredit?: number;
  };
}
