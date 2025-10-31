import { tsSchema, uidSchema } from "@lib/validation/common.schema";
import {
  assetTypeEnum,
  currencyEnum,
  invAccountKindEnum,
} from "@lib/validation/enums";
import { z } from "zod";

export const createInvestmentAccountSchema = z.object({
  userId: uidSchema,
  name: z.string().min(2),
  kind: invAccountKindEnum,
  institution: z.string().optional(),
  currency: currencyEnum.default("BRL"),
});

export const updateInvestmentAccountSchema = createInvestmentAccountSchema
  .partial()
  .extend({ id: z.string().min(1), userId: uidSchema });

export const createInvestmentTransactionSchema = z.object({
  userId: uidSchema,
  invAccountId: z.string().min(1),
  date: tsSchema,
  operation: z.enum([
    "buy",
    "sell",
    "deposit",
    "withdraw",
    "apply",
    "redeem",
    "rebalance",
    "fee",
  ]),
  assetType: assetTypeEnum,
  tickerOrName: z.string().min(1),
  quantity: z.number().positive().optional(),
  price: z.number().int().optional(),
  amount: z.number().int().optional(),
  fees: z.number().int().optional(),
  notes: z.string().optional(),
});

export const updateInvestmentTransactionSchema =
  createInvestmentTransactionSchema
    .partial()
    .extend({ id: z.string().min(1), userId: uidSchema });

export const createInvestmentPositionSchema = z.object({
  userId: uidSchema,
  invAccountId: z.string().min(1),
  assetType: assetTypeEnum,
  tickerOrName: z.string().min(1),
  quantity: z.number().positive().optional(),
  principal: z.number().int().optional(),
  avgPrice: z.number().int().optional(),
  currentValue: z.number().int().optional(),
  riskLevel: z.enum(["low", "medium", "high"]).optional(),
  tags: z.array(z.string()).optional(),
});

export const updateInvestmentPositionSchema = createInvestmentPositionSchema
  .partial()
  .extend({ id: z.string().min(1), userId: uidSchema });

export const createInvestmentEarningSchema = z.object({
  userId: uidSchema,
  invAccountId: z.string().min(1),
  date: tsSchema,
  assetType: assetTypeEnum,
  tickerOrName: z.string().min(1),
  type: z.enum(["dividend", "jcp", "yield", "coupon", "interest"]),
  grossAmount: z.number().int(),
  taxAmount: z.number().int(),
  netAmount: z.number().int(),
  competenceMonth: z
    .string()
    .regex(/^\d{6}$/)
    .optional(),
});

export const updateInvestmentEarningSchema = createInvestmentEarningSchema
  .partial()
  .extend({ id: z.string().min(1), userId: uidSchema });
