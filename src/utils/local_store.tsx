import { Account } from "@/models/auth";
import { Profile } from "@/models/user_profiles";

export function checkDataInLocal(key: string) {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(key) || null;
    return !!storedData;
  }
  return false; // Default value for SSR
}

export const getLocalProfile = () => {
  const storedUser = localStorage.getItem("profile");
  if (!storedUser) return null;

  try {
    const data = JSON.parse(storedUser);

    return Profile.fromJson(data);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export const getLocalAccount = () => {
  const storedAccount = localStorage.getItem("account");
  if (!storedAccount) return null;

  try {
    const parsedData = JSON.parse(storedAccount);

    return Account.fromJson(parsedData);
  } catch (error) {
    console.error("Error parsing account data:", error);
    return null;
  }
};
