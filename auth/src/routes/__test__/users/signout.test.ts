import request from "supertest";
import { app } from "../../../app";

describe("user signout tests", () => {
  it("clears the cookie after signing out", async () => {
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
        `/api/users/signout`
      )
      .send({})
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});