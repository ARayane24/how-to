"use client";

import React, { useEffect, useState } from "react";
import AuthFormWrapper from "../components/AuthFormWrapper";
import AuthInput from "../components/AuthInput";
import AuthPasswordInput from "../components/AuthPasswordInput";
import PasswordStrengthBar from "../components/PasswordStrengthBar";
import AuthSubmitButton from "../components/AuthSubmitButton";
import Link from "next/link";
import { checkDataInLocal } from "@/utils/local_store";
import { useRouter } from "next/navigation";
import LaravelApiClient from "@/api-clients/laravel_client";

const SigninPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const loginXML = `
       <account id="0">
      <userName>${username}</userName>
      <password>${password}</password>
      <email>${email}</email>
    </account>`;
      const response = await LaravelApiClient.publicPost(
        "/api/v1/create-account",
        loginXML
      );
      if (!response.ok) {
        throw new Error("Failed to login");
      }

      router.push("/login"); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred during registration.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormWrapper>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Sign up to get started
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <AuthInput
            id="username"
            type="text"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={setUsername}
          />

          <AuthInput
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={setEmail}
          />

          <AuthPasswordInput
            password={password}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            setPassword={setPassword}
          />

          <PasswordStrengthBar password={password} />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <AuthSubmitButton loading={loading} />
      </form>

      <div className="flex items-center justify-center text-gray-400 text-sm">
        Already have an account?
        <Link
          href="/login"
          className="ml-1 font-medium text-purple-400 hover:text-purple-300 transition-colors"
        >
          Log in
        </Link>
      </div>
    </AuthFormWrapper>
  );
};

export default SigninPage;
