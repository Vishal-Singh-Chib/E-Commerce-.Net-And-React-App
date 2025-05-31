// src/features/auth/useLoginHandler.ts
import type { Message } from "../../app/models/Message";
import { useLoginOrRegisterMutation } from "./loginAPI";
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
    } catch (error:any) {
      setMessage({
        type: error ,
        text: "Something went wrong",
      });
    }
  };

  return { handleSubmit, isLoading };
};
