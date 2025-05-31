// src/features/auth/useLoginHandler.ts
import type { Message } from "../../app/models/message"; // ✅ Correct

import { useLoginOrRegisterMutation } from "./LoginAPI";
import { useNavigate } from "react-router-dom";
export const useLoginHandler = (
  email: string,
  password: string,
  setMessage: (msg: Message | null) => void
) => {
const navigate = useNavigate();
  const [loginOrRegister, { isLoading }] = useLoginOrRegisterMutation();

  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      setMessage({ type: "error", text: "Please enter a valid email." });
      return;
    }

    if (password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters long.",
      });
      return;
    }

    try {
      const result = await loginOrRegister({
        email: normalizedEmail,
        password,
      }).unwrap();

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", result.email);  
      if(result.token)
      setMessage({ type: "success", text: "Login Successful" });
    else
     setMessage({
        type: "error",
        text:  "Please check your username and password",
      });
      navigate('/post');
    } catch (error: unknown) {
  let errorMessage = "Something went wrong";

  if (typeof error === "object" && error !== null && "message" in error) {
    errorMessage = (error as { message: string }).message;
  }

  setMessage({
    type: "error", // or any other enum/type you use
    text: errorMessage,
  });
}
  };

  return { handleSubmit, isLoading };
};
