import request from "supertest";
import { app } from "../../../app";

describe("currentUser tests", () => {
  it("expects 200 response from currentuser", async () => {

    const token = await global.signin();

    console.log(token, "token")

    const currentUserResponse = await request(app)
      .get(
        `/api/users/currentuser`
      )
      .set('Authorization', `Bearer ${token}`) // Add the Authorization header
      .send()
      .expect(200);

    expect(currentUserResponse.body?.currentUser?.email).toBe("test@gmail.com");
  });

  it("returns null if user is not authenticated", async () => {

    const currentUserResponse = await request(app)
      .get(
        `/api/users/currentuser`
      )
      .set("Cookie", "invalidcookie")
      .send()
      .expect(400);

    expect(currentUserResponse.body).toEqual({
      errors: [{
        message: "No token found"
      }]
    });
  });
});