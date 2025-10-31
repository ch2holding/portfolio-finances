import {
  centsSchema,
  tsSchema,
  uidSchema,
} from "@lib/validation/common.schema";
import { z } from "zod";

export const createInstallmentGroupSchema = z.object({
  userId: uidSchema,
  merchant: z.string().optional(),
  purchaseDate: tsSchema,
  installmentCount: z.number().int().min(1),
  originalAmount: centsSchema,
  interestTotal: z.number().int().optional(),
  feesTotal: z.number().int().optional(),
  cardAccountId: z.string().min(1),
  firstDueDate: tsSchema,
  statementStartMonth: z
    .string()
    .regex(/^\d{6}$/)
    .optional(),
  plan: z.enum(["no_interest", "interest", "revolving"]).optional(),
  notes: z.string().optional(),
});

export const updateInstallmentGroupSchema = createInstallmentGroupSchema
  .partial()
  .extend({ id: z.string().min(1), userId: uidSchema });
