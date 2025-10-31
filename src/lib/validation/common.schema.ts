import { z } from "zod";
import { currencyEnum } from "./enums";

export const idSchema = z.string().min(1);
export const uidSchema = z.string().min(1); // request.auth.uid
export const tsSchema = z.number().int(); // timestamp ms

export const paginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z.number().int().min(1).max(200).default(50),
});

export const centsSchema = z.number().int();
export const positiveCentsSchema = centsSchema.nonnegative();

export const currencySchema = currencyEnum.default("BRL");
