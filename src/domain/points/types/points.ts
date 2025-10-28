import { BaseEntity } from './common';

export type PointsProgramName =
  | 'livelo'
  | 'esfera'
  | 'iupp'
  | 'smiles'
  | 'latam_pass'
  | 'tudoazul'
  | 'ame'
  | 'meli'
  | 'outro';

export interface PointsProgram extends BaseEntity {
  program: PointsProgramName;
  memberId?: string;
  linkedAccounts?: string[];
  notes?: string;
}

export interface PointsBalance extends BaseEntity {
  programId: string;
  points: number;
  earnedAt: number;
  expiresAt: number;
  source?: 'credit_card' | 'partner' | 'promo' | 'transfer';
  promoTag?: string;
  status: 'active' | 'redeemed' | 'expired';
}

export interface PointsOperation extends BaseEntity {
  programId: string;
  date: number;
  type: 'earn' | 'redeem' | 'transfer_in' | 'transfer_out' | 'adjust';
  pointsDelta: number;
  partnerOrAirline?: string;
  rateOrBonus?: number;
  relatedPurchase?: { accountId: string; amount: number; cardBrand?: string };
  notes?: string;
}

export interface PointsOffer {
  id: string;
  program: PointsProgramName;
  title: string;
  description: string;
  bonus: number;
  validUntil: number;
  termsUrl?: string;
}
