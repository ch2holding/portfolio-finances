export type TimestampNumber = number; // Firestore: Date.now() em ms
export type Currency = "BRL";

export interface BaseEntity {
  id: string;
  userId: string;
  createdAt?: TimestampNumber;
  updatedAt?: TimestampNumber;
}
