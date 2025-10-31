export interface CreateAiSessionDTO {
  userId: string;
  title?: string;
}

export interface UpdateAiSessionDTO {
  id: string;
  userId: string;
  title?: string;
}

export interface CreateAiMessageDTO {
  userId: string;
  sessionId: string;
  role: "user" | "assistant" | "tool";
  content: string;
  createdAt: number; // ts
}

export interface UpdateAiMessageDTO extends Partial<CreateAiMessageDTO> {
  id: string;
  userId: string;
}
