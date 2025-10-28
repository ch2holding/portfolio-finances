import { z } from 'zod';
import { uidSchema, tsSchema } from './common.schema';
import { aiRoleEnum } from './enums';

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
