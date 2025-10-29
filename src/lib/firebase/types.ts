import { Timestamp as FirestoreTimestamp } from "firebase/firestore";
import type { Timestamp as AdminTimestamp } from "firebase-admin/firestore";

/**
 * Timestamp universal que funciona em client e admin
 */
export type Timestamp = FirestoreTimestamp | AdminTimestamp;

/**
 * Tipo base para documentos do Firestore
 */
export interface FirestoreDocument {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Helpers para conversão de timestamps
 */
export const timestampHelpers = {
  toDate(timestamp: Timestamp): Date {
    return timestamp.toDate();
  },

  fromDate(date: Date): FirestoreTimestamp {
    return FirestoreTimestamp.fromDate(date);
  },

  now(): FirestoreTimestamp {
    return FirestoreTimestamp.now();
  },
};
