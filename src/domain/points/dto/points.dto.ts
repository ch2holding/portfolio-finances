export interface CreatePointsProgramDTO {
  userId: string;
  program:
    | "livelo"
    | "esfera"
    | "iupp"
    | "smiles"
    | "latam_pass"
    | "tudoazul"
    | "ame"
    | "meli"
    | "outro";
  memberId?: string;
  linkedAccounts?: string[];
  notes?: string;
}

export interface UpdatePointsProgramDTO
  extends Partial<CreatePointsProgramDTO> {
  id: string;
  userId: string;
}

export interface CreatePointsBalanceDTO {
  userId: string;
  programId: string;
  points: number;
  earnedAt: number; // ts
  expiresAt: number; // ts
  source?: "credit_card" | "partner" | "promo" | "transfer";
  promoTag?: string;
  status?: "active" | "redeemed" | "expired";
}

export interface UpdatePointsBalanceDTO
  extends Partial<CreatePointsBalanceDTO> {
  id: string;
  userId: string;
}

export interface CreatePointsOperationDTO {
  userId: string;
  programId: string;
  date: number; // ts
  type: "earn" | "redeem" | "transfer_in" | "transfer_out" | "adjust";
  pointsDelta: number;
  partnerOrAirline?: string;
  rateOrBonus?: number;
  relatedPurchase?: { accountId: string; amount: number; cardBrand?: string };
  notes?: string;
}

export interface UpdatePointsOperationDTO
  extends Partial<CreatePointsOperationDTO> {
  id: string;
  userId: string;
}

export interface CreatePointsOfferDTO {
  program:
    | "livelo"
    | "esfera"
    | "iupp"
    | "smiles"
    | "latam_pass"
    | "tudoazul"
    | "ame"
    | "meli"
    | "outro";
  title: string;
  description: string;
  bonus: number;
  validUntil: number; // ts
  termsUrl?: string;
}

export interface UpdatePointsOfferDTO extends Partial<CreatePointsOfferDTO> {
  id: string;
}
