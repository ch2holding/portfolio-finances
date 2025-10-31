import type { BaseEntity } from "@/types/common";

export interface AiSession extends BaseEntity {
  title?: string;
}

export interface AiMessage extends BaseEntity {
  sessionId: string;
  role: "user" | "assistant" | "tool";
  content: string;
  createdAt: number;
}
