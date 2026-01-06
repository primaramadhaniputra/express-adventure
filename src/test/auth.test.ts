import {describe, it, expect, beforeAll} from "vitest";
import request from "supertest";
import app from "../app.ts";

describe("Auth API", () => {
  // test 1 : berhasil register
  it("harus berhasil mendaftarkan user baru", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    // expect(res.body.message).toContain("berhasil");
  });

  // test 2: validasi zod bekerja
  it("harus gagal jika email tidak valid", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      username: "testuser",
      email: "bukan-email", //format salah
      passowrd: "123",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toEqual(false);
  });
});
