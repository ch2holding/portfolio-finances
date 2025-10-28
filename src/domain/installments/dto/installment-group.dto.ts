export interface CreateInstallmentGroupDTO {
  userId: string;
  merchant?: string;
  purchaseDate: number;      // ts
  installmentCount: number;
  originalAmount: number;    // cents (total)
  interestTotal?: number;    // cents
  feesTotal?: number;        // cents
  cardAccountId: string;
  firstDueDate: number;      // ts
  statementStartMonth?: string; // yyyymm
  plan?: 'no_interest' | 'interest' | 'revolving';
  notes?: string;
}

export interface UpdateInstallmentGroupDTO extends Partial<CreateInstallmentGroupDTO> {
  id: string;
  userId: string;
}
