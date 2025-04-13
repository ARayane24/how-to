import { AccessToken } from "@/models/auth";

class LaravelApiClient {
  static baseUrl: string = "http://localhost:8000";
  static key: string = "API_KEY";

  static async get(path: string) {
    const response = await fetch(LaravelApiClient.baseUrl + path, {
      headers: {
        Authorization: `Bearer ${
          LaravelApiClient.getSessionToken()?.token || ""
        }`,
      },
    });
    return response;
  }

  static async post(path: string, data: unknown) {
    const response = await fetch(LaravelApiClient.baseUrl + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LaravelApiClient.getSessionToken()!.token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  static async publicPost(path: string, data: unknown) {
    console.log("post", LaravelApiClient.baseUrl + path, data);

    const response = await fetch(LaravelApiClient.baseUrl + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }
  static async put(path: string, data: unknown) {
    const response = await fetch(LaravelApiClient.baseUrl + path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LaravelApiClient.getSessionToken()!.token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  static async delete(path: string) {
    const response = await fetch(LaravelApiClient.baseUrl + path, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${LaravelApiClient.getSessionToken()!.token}`,
      },
    });
    return response;
  }

  static async patch(path: string, data: unknown) {
    const response = await fetch(LaravelApiClient.baseUrl + path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LaravelApiClient.getSessionToken()!.token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  static saveSessionToken(AccessToken: AccessToken) {
    localStorage.setItem("accessToken", JSON.stringify(AccessToken));
    console.log("Token saved");
  }

  static getSessionToken(): AccessToken | null {
    const token = localStorage.getItem("accessToken");
    console.log("Token: " + token);
    if (!token) return null;
    return JSON.parse(token);
  }

  static async refreshToken() {
    const token = LaravelApiClient.getSessionToken();
    const currentTime = new Date(Date.now());

    if (
      !token ||
      new Date(token.tokenDateExpired).getTime > currentTime.getTime
    )
      return;

    const newToken = await LaravelApiClient.publicPost("/refresh", {
      refresh_token: token.refreshToken,
    });
    const data = await newToken.json();
    if (!newToken.ok) {
      console.error("Error:", data);
      throw new Error(
        data.error || "An error occurred during refreshing token"
      );
    }

    token.token = data.access_token;
    token.tokenDateExpired = new Date(data.expires_at);
    LaravelApiClient.saveSessionToken(token);
  }

  static async tryRecoverSession(apiClientMethode: () => Promise<Response>) {
    try {
      await LaravelApiClient.refreshToken();
      return apiClientMethode();
    } catch (error) {
      console.error("Error:", error);
      localStorage.clear();
      throw new Error("Session expired, please login again");
    }
  }
}

export default LaravelApiClient;
