import request from "supertest";
import { app } from "../../../app";

describe("user signin tests", () => {
  it("returns a 200 on successful signin", async () => {
    await request(app)
      .post(
        `/api/users/signup`
      )
      .send({
        email: "test@gmail.com",
        password: "Password123."
      })
      .expect(200);
    

    return request(app)
      .post(
        `/api/users/signin`
      )
      .send({
        email: "test@gmail.com",
        password: "Password123."
      })
      .expect(200);
  });
  
  
  it("returns a 400 on failed signin due to non existing email", async () => {
    return request(app)
      .post(
        `/api/users/signin`
      )
      .send({
        email: "test@test1.com",
        password: "Password123."
      })
      .expect(500);
  });
  
  it("returns an error on failed signin due to invalid password", async () => {

    await request(app)
      .post(
        `/api/users/signup`
      )
      .send({
        email: "test@gmail.com",
        password: "Password123."
      })
      .expect(200);

    return request(app)
      .post(
        `/api/users/signin`
      )
      .send({
        email: "test@gmail.com",
        password: "Password123."
      })
      .expect(200);
  });

  it("expects a Set-Cookie header in the response", async () => {

    await request(app)
      .post(
        `/api/users/signup`
      )
      .send({
        email: "test@gmail.com",
        password: "Password123."
      })
      .expect(200);

    const response = await request(app)
      .post(
        `/api/users/signin`
      )
      .send({
        email: "test@gmail.com",
        password: "Password123."
      })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});