import React from "react";

const getStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) {
    score += 2;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[\W]/.test(password)) score++;
  } else if (password.length >= 1) score++;
  else score = 0;
  return score;
};

const PasswordStrengthBar = ({ password }: { password: string }) => {
  const strength = getStrength(password);
  const colors = ["bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

  if (strength == 0) return <></>;

  return (
    <div className="h-2 w-full bg-gray-700 rounded">
      <div
        className={`h-full transition-all duration-300 rounded ${
          colors[strength - 1]
        }`}
        style={{ width: `${(strength / 4) * 100}%` }}
      />
    </div>
  );
};

export default PasswordStrengthBar;
