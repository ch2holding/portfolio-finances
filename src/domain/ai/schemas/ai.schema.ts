import { tsSchema, uidSchema } from "@lib/validation/common.schema";
import { aiRoleEnum } from "@lib/validation/enums";
import { z } from "zod";

export const createAiSessionSchema = z.object({
  userId: uidSchema,
  title: z.string().min(1).optional(),
});

export const updateAiSessionSchema = createAiSessionSchema
  .partial()
  .extend({ id: z.string().min(1), userId: uidSchema });

export const createAiMessageSchema = z.object({
  userId: uidSchema,
  sessionId: z.string().min(1),
  role: aiRoleEnum,
  content: z.string().min(1),
  createdAt: tsSchema,
});

export const updateAiMessageSchema = createAiMessageSchema
  .partial()
  .extend({ id: z.string().min(1), userId: uidSchema });
