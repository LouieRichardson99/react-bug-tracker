import { PayloadProps } from "../types";

export function fetchAuth() {
  if (!localStorage.getItem("user")) return null;

  return JSON.parse(localStorage.getItem("user") || "");
}

export function setPayload(data: { user: { id: number; email: string } }) {
  const hourInMilliseconds = 3600000;

  return {
    id: data.user.id,
    email: data.user.email,
    expiresAt: new Date().getTime() + hourInMilliseconds,
  };
}

export function setAuth(
  payload: PayloadProps,
  setAuthState: (payload: PayloadProps) => void
) {
  localStorage.setItem("user", JSON.stringify(payload));
  setAuthState(payload);
}
