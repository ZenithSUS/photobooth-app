import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import { account } from "../appwrite";
import { useState } from "react";

export default function Login() {
  const user = localStorage.getItem("session");
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
      navigate("/");
    } catch (error) {
      toast.error("There was an error logging in");
      return;
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <form className="flex flex-col justify-center gap-5 bg- p-4 rounded-md ring-2 bg-sky-400 ring-amber-400 w-[300px] md:w-[400px]">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-bold text-xl">
            Email
          </label>
          <input
            className="p-2 bg-white rounded-md ring-2 ring-amber-400"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-bold text-xl">
            Password
          </label>
          <input
            className="p-2 bg-white rounded-md ring-2 ring-amber-400"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button
          className="p-2 text-lg cursor-pointer bg-amber-200 rounded hover:bg-amber-300 hover:scale-95 transition duration-300 ease-in-out"
          onClick={login}
        >
          Login
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <span
            className="underline cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </main>
  );
}
