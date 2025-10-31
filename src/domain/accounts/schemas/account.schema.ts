import { uidSchema } from "@lib/validation/common.schema";
import {
  accountTypeEnum,
  cardBrandEnum,
  currencyEnum,
} from "@lib/validation/enums";
import { z } from "zod";

export const accountBenefitsSchema = z.object({
  airline: z.string().optional(),
  lounge: z.boolean().optional(),
  cashback: z.number().min(0).max(1).optional(),
  fxFee: z.number().min(0).max(1).optional(),
  notes: z.string().optional(),
});

export const accountBillingSchema = z.object({
  closingDay: z.number().int().min(1).max(28),
  dueDay: z.number().int().min(1).max(28),
  creditLimit: z.number().int().nonnegative().optional(),
  availableCredit: z.number().int().nonnegative().optional(),
});

export const createAccountSchema = z.object({
  userId: uidSchema,
  name: z.string().min(2),
  accountType: accountTypeEnum,
  currency: currencyEnum.default("BRL"),
  icon: z.string().optional(),
  issuer: z.string().optional(),
  last4: z
    .string()
    .regex(/^\d{2,4}$/, "Use 2–4 dígitos finais")
    .optional(),
  cardBrand: cardBrandEnum.optional(),
  benefits: accountBenefitsSchema.optional(),
  billing: accountBillingSchema.optional(),
});

export const updateAccountSchema = createAccountSchema
  .partial()
  .extend({ id: z.string().min(1), userId: uidSchema });
