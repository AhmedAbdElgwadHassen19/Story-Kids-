import { json } from "drizzle-orm/gel-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


export const storyTable = pgTable("stories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  storyId: varchar().notNull().unique(),
  storySubject: varchar().notNull(),
  storyType: varchar().notNull(),
  ageGroup: varchar().notNull(),
  imageURL: varchar().default(""),
  Content: json(),

  email:varchar("email").references(() => usersTable.email).notNull(),
})