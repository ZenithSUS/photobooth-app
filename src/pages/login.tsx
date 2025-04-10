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
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <form className="flex w-[300px] flex-col justify-center gap-5 rounded-md bg-sky-400 p-4 ring-2 ring-amber-400 md:w-[400px]">
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
