import request from "supertest";
import { app } from "../../../app";

describe("user signup tests", () => {
  it("returns a 200 on successful signup", async () => {
    return request(app)
      .post(
        `/api/users/signup`
      )
      .send({
        email: "test@gmail.com",
        password: "Password123."
      })
      .expect(200);
  });
  
  
  it("returns a 400 on failed signup due to invalid email", async () => {
    return request(app)
      .post(
        `/api/users/signup`
      )
      .send({
        email: "test",
        password: "Password123."
      })
      .expect(400);
  });
  
  it("returns a 400 on failed signup due to invalid password", async () => {
    return request(app)
      .post(
        `/api/users/signup`
      )
      .send({
        email: "test",
        password: "password."
      })
      .expect(400);
  });

  it("returns a 400 status error due to missing or extra fields", async () => {
    await request(app)
      .post(
        `/api/users/signup`
      )
      .send({
        email: "test",
      })
      .expect(400);

    await request(app)
      .post(
        `/api/users/signup`
      )
      .send({
        password: "Password123.",
      })
      .expect(400);

    await request(app)
      .post(
        `/api/users/signup`
      )
      .send({
        email: "test@test.com",
        password: "Password123.",
        abc: "abc"
      })
      .expect(400);
  });

  it("disallows duplicate emails", async () => {
    await request(app)
      .post(
        `/api/users/signup`
      )
      .send({
        email: "test@test.com",
        password: "Password123."
      })
      .expect(200);

    await request(app)
      .post(
        `/api/users/signup`
      )
      .send({
        email: "test@test.com",
        password: "Password123."
      })
      .expect(500);
  });

  it("expects a Set-Cookie header in the response", async () => {
    const response = await request(app)
      .post(
        `/api/users/signup`
      )
      .send({
        email: "test@test.com",
        password: "Password123."
      })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});