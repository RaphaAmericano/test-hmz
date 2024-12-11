import request from "supertest";
import jwt from "jsonwebtoken"
import { AuthController } from "../../src/application/controllers/AuthController";
import { AuthService } from "../../src/application/services/AuthService";
import { Application } from "express";
import server from "../../src/infrastructure/server";
import { TokenManager } from "../../src/infrastructure/utils/TokenManager";

jest.mock("../../src/application/services/AuthService", () => {
    return {
        AuthService: jest.fn().mockImplementation(() => ({
            create: jest.fn(),
        })),
    };
})
jest.mock("jsonwebtoken")

describe("AuthRoutes", () => {
  let app: Application;
  let token: string;
  beforeAll(() => {
    app = server;
    token = TokenManager.generateToken({ id: 1 });
  });

  let authController: AuthController;
  let authServiceMock: jest.Mocked<AuthService>;
  beforeEach(() => {
    authServiceMock = {
      login: jest.fn(),
      register: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    authController = new AuthController(authServiceMock);
  });

  it("should login successfully", async () => {
    const mockDataResponse = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5ZTNiODgyLTc3YTYtNDliZC05MDgxLTUxYjNkYzVjOTU1MiIsIm5hbWUiOiJKb8OjbyBTaWx2YSIsImlhdCI6MTczMjkwODUyOCwiZXhwIjoxNzMyOTEyMTI4fQ.kS7EbpcMxmGgbpZaQ4CMW7AxpdAYBjVvm8g27yVcFWM"
    }

    const expectedResponse = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5ZTNiODgyLTc3YTYtNDliZC05MDgxLTUxYjNkYzVjOTU1MiIsIm5hbWUiOiJKb8OjbyBTaWx2YSIsImlhdCI6MTczMjkwODUyOCwiZXhwIjoxNzMyOTEyMTI4fQ.kS7EbpcMxmGgbpZaQ4CMW7AxpdAYBjVvm8g27yVcFWM"
    }
    
    const authServiceMock = AuthService.prototype.create as jest.Mock;
    authServiceMock.mockResolvedValue(mockDataResponse);

    const response = await request(app)
        .post('/api/login')
        .send({
            email: "test@example.com",
            password: "password"
        });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
    
  });

  it("should logout successfully", async () => {
    // const token = TokenManager.generateToken({ id: 1 })
    const response = await request(app)
      .post("/api/logout")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(200);
  });
});
