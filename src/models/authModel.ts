export interface IAuth {
  id?: number;
  email: string;
  username: string;
  role?: "user" | "admin";
  password: string;
  created_at?: Date;
}
