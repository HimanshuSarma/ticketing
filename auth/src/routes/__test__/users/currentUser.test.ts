import request from "supertest";
import { app } from "../../../app";

describe("currentUser tests", () => {
  it("expects 200 response from currentuser", async () => {

    const authCookie = await global.signin();

    console.log(authCookie, "authCookie")

    const currentUserResponse = await request(app)
      .get(
        `/api/users/currentuser`
      )
      .set("Cookie", authCookie)
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