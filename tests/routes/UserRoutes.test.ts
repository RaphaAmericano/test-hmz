import request from "supertest";
import { Application, NextFunction, Request } from "express";
import server from "../../src/infrastructure/server";

jest.mock("../../src/application/services/UserService", () => {
  return {
    UserService: jest.fn().mockImplementation(() => ({
      find_all: jest.fn().mockResolvedValueOnce({
        data: [
          {
            id: 'c36de974-77f3-4e52-8025-a6492c092550',
            first_name: 'Jorge',
            last_name: 'Mauro',
            avatar: null,
            username: 'jorge_mauro',
            email: 'jorge.mauro@gmail.com'
          }
        ]
      }),
      find_by_id: jest.fn().mockResolvedValueOnce({
        id: 'c36de974-77f3-4e52-8025-a6492c092550',
        first_name: 'Jorge',
        last_name: 'Mauro',
        avatar: null,
        username: 'jorge_mauro',
        email: 'jorge.mauro@gmail.com'
      }),
      update: jest.fn().mockResolvedValueOnce({
        id: 'c36de974-77f3-4e52-8025-a6492c092550',
        first_name: 'Luis',
        last_name: 'Mauro',
        avatar: null,
        username: 'jorge_mauro',
        email: 'jorge.mauro@gmail.com'
      }),
      delete: jest.fn().mockResolvedValueOnce({
        id: 'c36de974-77f3-4e52-8025-a6492c092550',
        first_name: 'Luis',
        last_name: 'Mauro',
        avatar: null,
        username: 'jorge_mauro',
        email: 'jorge.mauro@gmail.com'
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

describe("UserRoutes", () => {
  let app: Application;

  beforeAll(() => {
    app = server;
  });

  it("should get all users successfully: GET /api/users", async () => {
    const response = await request(app).get("/api/users");
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      data: expect.any(Array)
    }));
  });

  it("should get a user by ID successfully: GET /api/users/:id", async () => {
    const response = await request(app).get("/api/users/c36de974-77f3-4e52-8025-a6492c092550");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 'c36de974-77f3-4e52-8025-a6492c092550',
      first_name: 'Jorge',
      last_name: 'Mauro',
      avatar: null,
      username: 'jorge_mauro',
      email: 'jorge.mauro@gmail.com'});
  });

  it("should update a user successfully: PUT /api/users/:id", async () => {
    const response = await request(app).put("/api/users/c36de974-77f3-4e52-8025-a6492c092550").send({
      first_name: 'Luis'
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 'c36de974-77f3-4e52-8025-a6492c092550',
      first_name: 'Luis',
      last_name: 'Mauro',
      avatar: null,
      username: 'jorge_mauro',
      email: 'jorge.mauro@gmail.com'
    });
    expect(response.body.first_name).toBe('Luis');
  });

  it("should delete a user successfully: DELETE /api/users/:id", async () => {
    const response = await request(app).delete("/api/users/c36de974-77f3-4e52-8025-a6492c092550");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 'c36de974-77f3-4e52-8025-a6492c092550',
      first_name: 'Luis',
      last_name: 'Mauro',
      avatar: null,
      username: 'jorge_mauro',
      email: 'jorge.mauro@gmail.com'
    });
  });
  
});
