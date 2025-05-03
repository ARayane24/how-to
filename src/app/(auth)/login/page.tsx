"use client";

import React, { useEffect, useState } from "react";
import AuthFormWrapper from "../components/AuthFormWrapper";
import AuthInput from "../components/AuthInput";
import AuthPasswordInput from "../components/AuthPasswordInput";
import AuthSubmitButton from "../components/AuthSubmitButton";
import Link from "next/link";
import LaravelApiClient from "@/api-clients/laravel_client";
import { XML } from "@/utils/xml";
import { useRouter } from "next/navigation";
import { AccessToken, Account } from "@/models/auth";
import { checkDataInLocal } from "@/utils/local_store";
import { Profile } from "@/models/user_profiles";

function isEmail(identifier: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(identifier);
}

async function getProfile(id: number) {
  const profile = await LaravelApiClient.get(`/api/v1/user-profiles/${id}`);

  if (!profile.ok) {
    throw new Error("Failed to fetch profile");
  }

  const data = await profile.text();

  console.log("Profile data: ", data);
  const rootElement = XML.parseXML(data).documentElement;
  localStorage.setItem("profile", JSON.stringify(Profile.fromXML(rootElement)));

}

const LoginPage = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in and redirect
  useEffect(() => {
    if (checkDataInLocal("accessToken")) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!identifier || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const loginXML = isEmail(identifier) ? `<account>
          <password>${password}</password>
          <email>${identifier}</email>
      </account>` : `<account>
      <password>${password}</password>
      <userName>${identifier}</userName>`;
      const response = await LaravelApiClient.publicPost(
        "/api/auth/login",
        loginXML
      );
      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const text = await response.text();
      const xmlDoc = XML.parseXML(text);

      // Extract data from XML
      const authElement = xmlDoc.getElementsByTagName("account")[0];
      const accountId = authElement.getAttribute("id") || "";

      const tokenElement = xmlDoc.getElementsByTagName("token")[0];
      const expiresElement = xmlDoc.getElementsByTagName("expiresIn")[0];

      const authToken = tokenElement?.textContent || "";
      const expires = expiresElement?.textContent || "";

      const authResult = new AccessToken(
        accountId,
        authToken,
        new Date(expires)
      );


      const account = isEmail(identifier)? new Account(0,"", identifier, "") : new Account(0, identifier,"", "");
      localStorage.setItem("account", JSON.stringify(account));
      localStorage.setItem("accessToken", JSON.stringify(authResult));
      await getProfile(Number(authResult.accountId));

      console.log("Login successful", authResult);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormWrapper>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Log in to your account
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          <AuthInput
            id="identifier"
            type="text"
            placeholder="Email or Username"
            autoComplete="username"
            value={identifier}
            onChange={setIdentifier}
          />

          <AuthPasswordInput password={password} setPassword={setPassword} />
        </div>

        <div className="flex items-center justify-between">
          <a
            href="#"
            className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
          >
            Forgot your password?
          </a>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <AuthSubmitButton loading={loading} />
      </form>

      <div className="flex items-center justify-center text-gray-400 text-sm">
        Don&apos;t have an account?
        <Link
          href="/signin"
          className="ml-1 font-medium text-purple-400 hover:text-purple-300 transition-colors"
        >
          Sign in
        </Link>
      </div>
    </AuthFormWrapper>
  );
};

export default LoginPage;
