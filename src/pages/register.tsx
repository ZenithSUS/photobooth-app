import { ID } from "appwrite";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import {
  account,
  storage,
  BUCKET_ID,
  ENDPOINT as endpointUrl,
  PROJECT_ID as projectId,
} from "../appwrite";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewUser } from "../actions/users";
import { ErrorType } from "../utils/types";
import { useTransition } from "react";
import {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from "../utils/constants/image-file";
import fetchAuthUser from "../lib/services/getAuth";
import Loading from "../components/ui/loading";

const registerSchema = z
  .object({
    email: z.string().min(3, { message: "Email is required" }).email(),
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
    image: z
      .instanceof(FileList)
      .refine(
        (files) => files.length === 0 || files.length === 1,
        "Please upload exactly one file",
      )
      .refine(
        (files) => files.length === 0 || files[0].size <= MAX_FILE_SIZE,
        `Max file size is 5MB`,
      )
      .refine(
        (files) =>
          files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
        "Only .jpg, .jpeg, and .png formats are supported",
      )
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type registerSchemaType = z.infer<typeof registerSchema>;

export default function Register() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const navigate = useNavigate();
  const [fileName, setFileName] =
    useState<SetStateAction<string>>("No file chosen");
  const [isPending, startTransition] = useTransition();

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

      startTransition(async () => {
        const name = `${data.firstName} ${data.middleInitial} ${data.lastName}`;
        const acc = await account.create(
          ID.unique(),
          data.email,
          data.password,
          name,
        );

        const session = await account.createEmailPasswordSession(
          data.email,
          data.password,
        );

        const userData = {
          name: name,
          email: data.email,
          profileImage: "N/A",
          profileId: "N/A",
        };

        if (data.image instanceof FileList && data.image.length > 0) {
          const imageFile = new File(
            [data.image[0]],
            "zenithbooth_profile_" + uuidv4() + ".jpg",
            {
              type: "image/jpeg",
            },
          );
          const uploadedFile = await storage.createFile(
            BUCKET_ID,
            ID.unique(),
            imageFile,
          );

          userData.profileImage = `${endpointUrl}/storage/buckets/${uploadedFile.bucketId}/files/${uploadedFile.$id}/view?project=${projectId}&mode=admin`;
          userData.profileId = uploadedFile.$id;
        }
        account.updatePrefs({
          imageUrl: userData.profileImage,
          imageId: userData.profileId,
        });
        await createNewUser(userData, acc.$id);

        localStorage.setItem("session", JSON.stringify(session.current));
        const userDataResponse = await account.get();
        localStorage.setItem("id", JSON.stringify(userDataResponse.$id));
        localStorage.setItem("name", JSON.stringify(userDataResponse.name));
        localStorage.setItem("email", JSON.stringify(userDataResponse.email));
        localStorage.setItem(
          "profileImage",
          JSON.stringify(userData.profileImage),
        );
        localStorage.setItem("profileId", JSON.stringify(userData.profileId));
        localStorage.setItem(
          "joined",
          JSON.stringify(userDataResponse.$createdAt),
        );
        toast.success("Registered Successfully!");
      });
    } catch (error) {
      const err = error as ErrorType;
      if (err.code === 409) {
        toast.error("Email already in use");
        return;
      } else if (err.code === 400) {
        toast.error(err.message);
        return;
      } else {
        toast.error("There was an error registering");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      let userSession = JSON.parse(localStorage.getItem("session") || "false");
      if (userSession) {
        const authResult = await fetchAuthUser(userSession);
        setIsAuthenticated(!!authResult);
      } else {
        try {
          const session = await account.getSession("current");
          if (session && session.current) {
            userSession = session.current;
            localStorage.setItem("session", JSON.stringify(userSession));
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Session error:", error);
          setIsAuthenticated(false);
        }
      }
      setIsAuthChecking(false);
    };

    checkAuth();
  }, []);

  if (isAuthChecking) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-4">
      <form
        className="bg-primary-light my-1.5 flex w-full max-w-[700px] flex-col justify-center gap-1 rounded-md p-5 ring-2 ring-black"
        onSubmit={form.handleSubmit(register)}
      >
        <h1 className="p-1 text-center text-3xl font-bold">Register</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {/* First Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="text-xl font-bold">
              First Name
            </label>
            <input
              id="firstName"
              className="w-full rounded-md bg-white p-2 ring-2 ring-black/55"
              type="text"
              {...form.register("firstName")}
              placeholder="First Name"
              autoComplete="on"
            />
            <span className="h-6 text-red-500">
              {form.formState.errors.firstName?.message}
            </span>
          </div>

          {/* Middle Initial */}
          <div className="flex flex-col gap-1">
            <label htmlFor="middleInitial" className="text-xl font-bold">
              Middle Initial
            </label>
            <input
              id="middleInitial"
              className="w-full rounded-md bg-white p-2 ring-2 ring-black/55"
              type="text"
              {...form.register("middleInitial")}
              placeholder="Middle Initial"
              autoComplete="on"
            />
            <span className="h-6 text-red-500">
              {form.formState.errors.middleInitial?.message}
            </span>
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="text-xl font-bold">
              Last Name
            </label>
            <input
              id="lastName"
              className="w-full rounded-md bg-white p-2 ring-2 ring-black/55"
              type="text"
              {...form.register("lastName")}
              placeholder="Last Name"
              autoComplete="on"
            />
            <span className="h-6 text-red-500">
              {form.formState.errors.lastName?.message}
            </span>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xl font-bold">
              Email
            </label>
            <input
              id="email"
              className="w-full rounded-md bg-white p-2 ring-2 ring-black/55"
              type="text"
              {...form.register("email")}
              placeholder="Email"
              autoComplete="on"
            />
            <span className="h-6 text-red-500">
              {form.formState.errors.email?.message}
            </span>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-xl font-bold">
              Password
            </label>
            <input
              id="password"
              className="w-full rounded-md bg-white p-2 ring-2 ring-black/55"
              type="password"
              {...form.register("password")}
              placeholder="Password"
              autoComplete="on"
            />
            <span className="h-6 text-red-500">
              {form.formState.errors.password?.message}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-xl font-bold">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              className="w-full rounded-md bg-white p-2 ring-2 ring-black/55"
              type="password"
              {...form.register("confirmPassword")}
              placeholder="Confirm Password"
              autoComplete="on"
            />
            <span className="h-6 text-red-500">
              {form.formState.errors.confirmPassword?.message}
            </span>
          </div>
        </div>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center justify-center gap-1">
          <label htmlFor="profileImage" className="text-xl font-bold">
            Profile Image
          </label>

          <div className="flex">
            <label className="bg-secondary-dark hover:bg-secondary-darker/80 flex cursor-pointer items-center rounded-l-md px-4 py-2 font-medium text-white transition duration-300 ease-in-out hover:scale-105">
              Choose File
              <input
                id="profileImage"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                {...form.register("image")}
                onChange={(e) => {
                  form.register("image").onChange(e);
                  setFileName(
                    e.target.files && e.target.files[0]
                      ? e.target.files[0].name
                      : "No file chosen",
                  );
                }}
                autoComplete="off"
              />
            </label>
            <span className="flex w-full items-center rounded-r-md border border-gray-300 bg-white px-3 py-2">
              {fileName as string}
            </span>
          </div>
          <h3 className="text-md mt-1.5 text-center font-medium">
            Max Size 5MB
          </h3>

          {form.formState.errors.image ? (
            <span className="h-10 text-red-500">
              {form.formState.errors.image.message}
            </span>
          ) : (
            <span className="h-10"></span>
          )}
        </div>

        {/* Submit Button */}
        <button
          className="bg-secondary-dark hover:bg-secondary-darker/80 cursor-pointer rounded p-2 text-lg font-semibold text-white transition duration-300 ease-in-out hover:scale-95 disabled:bg-gray-400"
          type="submit"
          disabled={isPending}
        >
          Submit
        </button>

        {/* Link to Login */}
        <p className="text-center font-medium">
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
