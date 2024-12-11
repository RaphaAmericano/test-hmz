import request from "supertest";
import jwt from "jsonwebtoken"
import { AuthController } from "../../src/application/controllers/AuthController";
import { AuthService } from "../../src/application/services/AuthService";
import { Application, NextFunction, Request } from "express";
import server from "../../src/infrastructure/server";
import { TokenManager } from "../../src/infrastructure/utils/TokenManager";
import { authenticate } from "passport";

jest.mock("../../src/application/services/AuthService", () => {
    return {
        AuthService: jest.fn().mockImplementation(() => ({
            create: jest.fn(),
        })),
    };
})
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
})

describe("AuthRoutes", () => {
  let app: Application;
  

  beforeAll(() => {
    app = server
  });




  // it("should register successfully", async () => {
  //   (jwt.sign as jest.Mock).mockReturnValue("moked-token")

  //     const response = await request(app)
  //     .post("/api/register").send({
  //       username:"jorge_mauro",
  //       password: "123456",
  //       email: "jorge.mauro@gmail.com"
  //     });
  //     console.log(response)
  //     // expect(response.status).toBe(200);
    
  // });

  it("should logout successfully", async () => {
    
    const response = await request(app)
      .post("/api/logout")
      .set("Authorization", `Bearer moked-token`)
      .send();
    expect(response.status).toBe(200);
  }, 10000);
});
