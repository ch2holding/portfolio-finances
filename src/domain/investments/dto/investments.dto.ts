export interface CreateInvestmentAccountDTO {
  userId: string;
  name: string;
  kind: 'brokerage' | 'savings' | 'pension' | 'crypto_exchange';
  institution?: string;
  currency: 'BRL';
}

export interface UpdateInvestmentAccountDTO extends Partial<CreateInvestmentAccountDTO> {
  id: string;
  userId: string;
}

export interface CreateInvestmentTransactionDTO {
  userId: string;
  invAccountId: string;
  date: number;
  operation:
    | 'buy' | 'sell' | 'deposit' | 'withdraw'
    | 'apply' | 'redeem' | 'rebalance' | 'fee';
  assetType:
    | 'savings' | 'cdb' | 'lci' | 'lca' | 'tesouro' | 'fundo'
    | 'fii' | 'acao' | 'etf' | 'cripto' | 'outro';
  tickerOrName: string;
  quantity?: number;
  price?: number;  // cents
  amount?: number; // cents
  fees?: number;   // cents
  notes?: string;
}

export interface UpdateInvestmentTransactionDTO extends Partial<CreateInvestmentTransactionDTO> {
  id: string;
  userId: string;
}

export interface CreateInvestmentPositionDTO {
  userId: string;
  invAccountId: string;
  assetType:
    | 'savings' | 'cdb' | 'lci' | 'lca' | 'tesouro' | 'fundo'
    | 'fii' | 'acao' | 'etf' | 'cripto' | 'outro';
  tickerOrName: string;
  quantity?: number;
  principal?: number;    // cents
  avgPrice?: number;     // cents
  currentValue?: number; // cents
  riskLevel?: 'low' | 'medium' | 'high';
  tags?: string[];
}

export interface UpdateInvestmentPositionDTO extends Partial<CreateInvestmentPositionDTO> {
  id: string;
  userId: string;
}

export interface CreateInvestmentEarningDTO {
  userId: string;
  invAccountId: string;
  date: number;
  assetType:
    | 'savings' | 'cdb' | 'lci' | 'lca' | 'tesouro' | 'fundo'
    | 'fii' | 'acao' | 'etf' | 'cripto' | 'outro';
  tickerOrName: string;
  type: 'dividend' | 'jcp' | 'yield' | 'coupon' | 'interest';
  grossAmount: number; // cents
  taxAmount: number;   // cents
  netAmount: number;   // cents
  competenceMonth?: string; // yyyymm
}

export interface UpdateInvestmentEarningDTO extends Partial<CreateInvestmentEarningDTO> {
  id: string;
  userId: string;
}
