"use client";

import React, { useState } from "react";
import AuthFormWrapper from "../components/AuthFormWrapper";
import AuthInput from "../components/AuthInput";
import AuthPasswordInput from "../components/AuthPasswordInput";
import AuthSubmitButton from "../components/AuthSubmitButton";
import Link from "next/link";

const SignInPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (identifier === "test@example.com" && password === "Password123!") {
        console.log("Login successful");
        // Redirect here
      } else {
        throw new Error("Invalid credentials");
      }
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

export default SignInPage;
