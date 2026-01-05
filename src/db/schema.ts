import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

//  CREATE TABLE faqs (
//      id SERIAL PRIMARY KEY,
//      question TEXT NOT NULL,
//      answer TEXT NOT NULL,
//      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//  );

//  change to drizzle orm

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", {length: 100}).notNull(),
  email: varchar("email", {length: 255}).notNull().unique(),
  password: varchar("password", {length: 255}).notNull(),
  role: varchar("role", {length: 20}).default("user"),
  profilePicture: text("profile_picture"),
  createdAt: timestamp("created_at").defaultNow(),
  resetPasswordToken: varchar("reset_password_token", {length: 255}),
  resetPasswordExpires: timestamp("reset_password_expires"),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  idUser: integer("id_user")
    .notNull()
    .references(() => users.id, {onDelete: "cascade"}),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
