import { User } from "@/types";

export const getSavedUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem("taxihub_user");
  return saved ? JSON.parse(saved) : null;
};

export const saveUser = (user: User) => {
  localStorage.setItem("taxihub_user", JSON.stringify(user));
};

export const clearUser = () => {
  localStorage.removeItem("taxihub_user");
};
