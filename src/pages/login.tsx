import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import { account } from "../appwrite";
import { useState, useEffect } from "react";
import { ErrorType } from "../utils/types";
import CameraIcon from "../assets/ui/camera.png";
import fetchAuthUser from "../lib/services/getAuth";

export default function Login() {
  let user = JSON.parse(localStorage.getItem("session") || "false") as boolean;
  useEffect(() => {
    fetchAuthUser(user);
  }, []);

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const session = await account.createEmailPasswordSession(email, password);
      localStorage.setItem("session", JSON.stringify(session.current));
      const data = await account.get();
      localStorage.setItem("id", JSON.stringify(data.$id));
      localStorage.setItem("name", JSON.stringify(data.name));
      localStorage.setItem("email", JSON.stringify(data.email));
      toast.success("Logged in Successfully!");
      navigate("/dashboard");
    } catch (error: unknown) {
      const err = error as ErrorType;
      if (err.code === 400) toast.error("Invalid Credentials!");
      if (err.code === 404) toast.error("User not found!");
      if (err.code === 401) toast.error("Invalid Credentials!");
      return;
    }
  };

  if (user) return <Navigate to="/dashboard" />;

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <form className="relative flex w-[300px] flex-col justify-center gap-5 rounded-md bg-sky-400 p-4 ring-2 ring-amber-400 md:w-[400px]">
        <img
          src={CameraIcon}
          alt="camera"
          className="absolute top-0 h-10 w-10 cursor-pointer self-end p-0.5 transition duration-300 ease-in-out hover:scale-110"
          onClick={() => navigate("/")}
        />
        <h1 className="text-center text-3xl font-bold">Login</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-xl font-bold">
            Email
          </label>
          <input
            className="rounded-md bg-white p-2 ring-2 ring-amber-400"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-xl font-bold">
            Password
          </label>
          <input
            className="rounded-md bg-white p-2 ring-2 ring-amber-400"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button
          className="cursor-pointer rounded bg-amber-200 p-2 text-lg transition duration-300 ease-in-out hover:scale-95 hover:bg-amber-300"
          onClick={login}
        >
          Login
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <span
            className="cursor-pointer underline hover:text-blue-500"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </main>
  );
}
