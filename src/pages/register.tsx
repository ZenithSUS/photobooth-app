import { ID } from "appwrite";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewUser } from "../actions/users";

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    firstName: z.string().min(1, { message: "First name is required" }),
    middleInitial: z
      .string()
      .max(3, { message: "Middle initial is too long" })
      .optional(),
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
        data.password,
      );

      await createNewUser(
        {
          name: name,
          email: data.email,
        },
        session.$id,
      );

      localStorage.setItem("session", JSON.stringify(session.current));
      const userData = await account.get();
      localStorage.setItem("id", JSON.stringify(userData.$id));
      localStorage.setItem("name", JSON.stringify(userData.name));
      localStorage.setItem("email", JSON.stringify(userData.email));
      localStorage.setItem("joined", JSON.stringify(userData.$createdAt));
      toast.success("Registered Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("There was an error registering");
    }
  };

  useEffect(() => {
    if (user) window.location.href = "/";
  }, [user]);

  return (
    <main className="m-auto flex w-screen flex-col items-center justify-center lg:h-screen">
      <form
        className="flex w-screen flex-col justify-center gap-5 rounded-md bg-sky-400 p-5 ring-2 ring-amber-400 lg:w-[800px]"
        onSubmit={form.handleSubmit(register)}
      >
        <h1 className="text-center text-3xl font-bold">Register</h1>

        <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstname" className="text-xl font-bold">
              First Name
            </label>
            <input
              className="w-full rounded-md bg-white p-2 ring-2 ring-amber-400"
              type="text"
              {...form.register("firstName")}
              placeholder="First Name"
            />
            {form.formState.errors.firstName ? (
              <span className="h-10 text-red-500">
                {form.formState.errors.firstName.message}
              </span>
            ) : (
              <span className="h-10"></span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="middleIntial" className="text-xl font-bold">
              Middle Intial
            </label>
            <input
              className="w-full rounded-md bg-white p-2 ring-2 ring-amber-400"
              type="text"
              {...form.register("middleInitial")}
              placeholder="Middle Initial"
            />
            {form.formState.errors.middleInitial ? (
              <span className="h-10 text-red-500">
                {form.formState.errors.middleInitial.message}
              </span>
            ) : (
              <span className="h-10"></span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastname" className="text-xl font-bold">
              Last Name
            </label>
            <input
              className="w-full rounded-md bg-white p-2 ring-2 ring-amber-400"
              type="text"
              {...form.register("lastName")}
              placeholder="Last Name"
            />
            {form.formState.errors.lastName ? (
              <span className="h-10 text-red-500">
                {form.formState.errors.lastName.message}
              </span>
            ) : (
              <span className="h-10"></span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xl font-bold">
              Email
            </label>
            <input
              className="w-full rounded-md bg-white p-2 ring-2 ring-amber-400"
              type="text"
              {...form.register("email")}
              placeholder="Email"
            />
            {form.formState.errors.email ? (
              <span className="h-10 text-red-500">
                {form.formState.errors.email.message}
              </span>
            ) : (
              <span className="h-10"></span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-xl font-bold">
              Password
            </label>
            <input
              className="w-full rounded-md bg-white p-2 ring-2 ring-amber-400"
              type="password"
              {...form.register("password")}
              placeholder="Password"
            />
            {form.formState.errors.password ? (
              <span className="h-10 text-red-500">
                {form.formState.errors.password.message}
              </span>
            ) : (
              <span className="h-10"></span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirmpassword" className="text-xl font-bold">
              Confirm Password
            </label>
            <input
              className="w-full rounded-md bg-white p-2 ring-2 ring-amber-400"
              type="password"
              {...form.register("confirmPassword")}
              placeholder="Confirm Password"
            />
            {form.formState.errors.confirmPassword ? (
              <span className="h-10 text-red-500">
                {form.formState.errors.confirmPassword.message}
              </span>
            ) : (
              <span className="h-10"></span>
            )}
          </div>
        </div>
        <button
          className="cursor-pointer rounded bg-amber-200 p-2 text-lg transition duration-300 ease-in-out hover:scale-95 hover:bg-amber-300"
          type="submit"
        >
          Submit
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <span
            className="cursor-pointer underline hover:text-blue-500"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </main>
  );
}
