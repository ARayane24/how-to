"use client";

import { useState } from "react";
import AuthInput from "./AuthInput";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  password: string;
  confirmPassword?: string;
  setPassword: (val: string) => void;
  setConfirmPassword?: (val: string) => void;
}

const AuthPasswordInput = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className="flex">
        <AuthInput
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={setPassword}
          placeholder="Password"
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className=" m-4 right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {typeof confirmPassword !== "undefined" && setConfirmPassword && (
        <div className="flex mt-4">
          <AuthInput
            id="confirm-password"
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm Password"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className=" m-4 right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      )}
    </>
  );
};

export default AuthPasswordInput;
