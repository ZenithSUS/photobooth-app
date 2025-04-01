import { ID } from "appwrite";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    firstName: z.string().min(1, { message: "First name is required" }),
    middleInitial: z.string().optional(),
    lastName: z.string().min(1, { message: "Last name is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type registerSchemaType = z.infer<typeof registerSchema>;

export default function Register() {
  const user = localStorage.getItem("session");
  const navigate = useNavigate();

  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      middleInitial: "",
      lastName: "",
    },
  });

  const register = async (data: registerSchemaType) => {
    try {
      if (Object.keys(form.formState.errors).length > 0) return;

      console.log(data);
      const name = `${data.firstName} ${data.middleInitial} ${data.lastName}`;
      await account.create(ID.unique(), data.email, data.password, name);

      const session = await account.createEmailPasswordSession(
        data.email,
        data.password
      );
      localStorage.setItem("session", JSON.stringify(session.current));
      const userData = await account.get();
      localStorage.setItem("name", JSON.stringify(userData.name));

      toast.success("Registered Successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("There was an error registering");
    }
  };

  useEffect(() => {
    if (user) window.location.href = "/";
  }, [user]);

  return (
    <main className="flex flex-col items-center justify-center w-screen md:h-screen">
      <form
        className="flex flex-col justify-center gap-5 p-4 rounded-md ring-2 bg-sky-400 ring-amber-400"
        onSubmit={form.handleSubmit(register)}
      >
        <h1 className="text-3xl font-bold text-center">Register</h1>

        <div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstname" className="font-bold text-xl">
              First Name
            </label>
            <input
              className="p-2 bg-white rounded-md ring-2 ring-amber-400 w-full"
              type="text"
              {...form.register("firstName")}
              placeholder="First Name"
            />
            {form.formState.errors.firstName ? (
              <span className="text-red-500 h-10">
                {form.formState.errors.firstName.message}
              </span>
            ) : (
              <span className="h-10"></span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="middleIntial" className="font-bold text-xl">
              Middle Intial
            </label>
            <input
              className="p-2 bg-white rounded-md ring-2 ring-amber-400 w-full"
              type="text"
              {...form.register("middleInitial")}
              placeholder="Middle Initial"
            />
            {form.formState.errors.middleInitial ? (
              <span className="text-red-500 h-10">
                {form.formState.errors.middleInitial.message}
              </span>
            ) : (
              <span className="h-10"></span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastname" className="font-bold text-xl">
              Last Name
            </label>
            <input
              className="p-2 bg-white rounded-md ring-2 ring-amber-400 w-full"
              type="text"
              {...form.register("lastName")}
              placeholder="Last Name"
            />
            {form.formState.errors.lastName ? (
              <span className="text-red-500 h-10">
                {form.formState.errors.lastName.message}
              </span>
            ) : (
              <span className="h-10"></span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold text-xl">
              Email
            </label>
            <input
              className="p-2 bg-white rounded-md ring-2 ring-amber-400 w-full"
              type="text"
              {...form.register("email")}
              placeholder="Email"
            />
            {form.formState.errors.email ? (
              <span className="text-red-500 h-10">
                {form.formState.errors.email.message}
              </span>
            ) : (
              <span className="h-10"></span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-bold text-xl">
              Password
            </label>
            <input
              className="p-2 bg-white rounded-md ring-2 ring-amber-400 w-full"
              type="password"
              {...form.register("password")}
              placeholder="Password"
            />
            {form.formState.errors.password ? (
              <span className="text-red-500 h-10">
                {form.formState.errors.password.message}
              </span>
            ) : (
              <span className="h-10"></span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirmpassword" className="font-bold text-xl">
              Confirm Password
            </label>
            <input
              className="p-2 bg-white rounded-md ring-2 ring-amber-400 w-full"
              type="password"
              {...form.register("confirmPassword")}
              placeholder="Confirm Password"
            />
            {form.formState.errors.confirmPassword ? (
              <span className="text-red-500 h-10">
                {form.formState.errors.confirmPassword.message}
              </span>
            ) : (
              <span className="h-10"></span>
            )}
          </div>
        </div>
        <button
          className="p-2 text-lg cursor-pointer bg-amber-200 rounded hover:bg-amber-300 hover:scale-95 transition duration-300 ease-in-out"
          type="submit"
        >
          Submit
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </main>
  );
}
