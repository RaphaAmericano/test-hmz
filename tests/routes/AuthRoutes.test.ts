import request from "supertest";
import { Application, NextFunction, Request } from "express";
import server from "../../src/infrastructure/server";

jest.mock("../../src/application/services/AuthService", () => {
  return {
    AuthService: jest.fn().mockImplementation(() => ({
      create: jest.fn().mockResolvedValueOnce({
        id: 1,
        username: "jorge_mauro",
        password: "123456",
        email: "jorge.mauro@gmail.com",
      }),
    })),
  };
});

jest.mock("jsonwebtoken");

jest.mock("passport", () => {
  const mockPassport = {
    use: jest.fn(),
    authenticate: jest.fn((strategy, options, callback) => {
      return (req: Request, res: NextFunction) => {
        callback(null, { id: 1 }, null);
      };
    }),
  };
  return mockPassport;
});

describe("AuthRoutes", () => {
  let app: Application;

  beforeAll(() => {
    app = server;
  });

  it("should register successfully: POST /api/register ", async () => {
    const response = await request(app).post("/api/register").send({
      username: "jorge_mauro",
      password: "123456",
      email: "jorge.mauro@gmail.com",
    });

    expect(response.status).toBe(200);
  });

  it("should logout successfully POST /api/logout", async () => {
    const response = await request(app)
      .post("/api/logout")
      .set("Authorization", `Bearer moked-token`)
      .send();

    expect(response.status).toBe(200);
  }, 10000);

  it("should login successfully POST /api/login", async () => {
    const response = await request(app).post("/api/login").send({
      username: "jorge_mauro",
      password: "123456",
    });

    expect(response.status).toBe(200);
  }, 10000);
});
