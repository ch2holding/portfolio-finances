import { z } from 'zod';
import {
  pointsProgramNameEnum,
  pointsBalanceStatusEnum,
  pointsOperationTypeEnum,
  cardBrandEnum,
} from './enums';
import { uidSchema, tsSchema } from './common.schema';

export const createPointsProgramSchema = z.object({
  userId: uidSchema,
  program: pointsProgramNameEnum,
  memberId: z.string().optional(),
  linkedAccounts: z.array(z.string()).optional(),
  notes: z.string().optional(),
});
export const updatePointsProgramSchema = createPointsProgramSchema
  .partial()
  .extend({ id: z.string().min(1), userId: uidSchema });

export const createPointsBalanceSchema = z.object({
  userId: uidSchema,
  programId: z.string().min(1),
  points: z.number().int().nonnegative(),
  earnedAt: tsSchema,
  expiresAt: tsSchema,
  source: z.enum(['credit_card','partner','promo','transfer']).optional(),
  promoTag: z.string().optional(),
  status: pointsBalanceStatusEnum.default('active'),
});
export const updatePointsBalanceSchema = createPointsBalanceSchema
  .partial()
  .extend({ id: z.string().min(1), userId: uidSchema });

export const createPointsOperationSchema = z.object({
  userId: uidSchema,
  programId: z.string().min(1),
  date: tsSchema,
  type: pointsOperationTypeEnum,
  pointsDelta: z.number().int(),
  partnerOrAirline: z.string().optional(),
  rateOrBonus: z.number().min(0).max(5).optional(),
  relatedPurchase: z.object({
    accountId: z.string().min(1),
    amount: z.number().int(),
    cardBrand: cardBrandEnum.optional(),
  }).optional(),
  notes: z.string().optional(),
});
export const updatePointsOperationSchema = createPointsOperationSchema
  .partial()
  .extend({ id: z.string().min(1), userId: uidSchema });

export const createPointsOfferSchema = z.object({
  program: pointsProgramNameEnum,
  title: z.string().min(2),
  description: z.string().min(2),
  bonus: z.number().min(0).max(5),
  validUntil: tsSchema,
  termsUrl: z.string().url().optional(),
});
export const updatePointsOfferSchema = createPointsOfferSchema
  .partial()
  .extend({ id: z.string().min(1) });
