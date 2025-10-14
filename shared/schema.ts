import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const frequencyData = pgTable("frequency_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  frequency: real("frequency").notNull(),
  amplitude: real("amplitude"),
  rms: real("rms"),
  timestamp: timestamp("timestamp").notNull(),
  source: text("source"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertFrequencyDataSchema = createInsertSchema(frequencyData).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type FrequencyData = typeof frequencyData.$inferSelect;
export type InsertFrequencyData = z.infer<typeof insertFrequencyDataSchema>;

export interface GreenwoodSettings {
  A: number;
  a: number;
  k: number;
  numLEDs: number;
  cochleaLengthMM: number;
  fMin: number;
  fMax: number;
  ledBrightness: number;
  blinkDuration: number;
}

export const defaultGreenwoodSettings: GreenwoodSettings = {
  A: 165.4,
  a: 2.1,
  k: 0.88,
  numLEDs: 32,
  cochleaLengthMM: 35,
  fMin: 20,
  fMax: 20000,
  ledBrightness: 1.0,
  blinkDuration: 500,
};
