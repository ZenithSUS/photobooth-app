import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import changePassword from "../utils/functions/change-password";
import formatDate from "../utils/functions/format-date";
import unknown from "../assets/ui/unknown.jpg";
import Modal from "react-modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

Modal.setAppElement("#root");

const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type changePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export default function Account() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const name = JSON.parse(localStorage.getItem("name") as string);
  const email = JSON.parse(localStorage.getItem("email") as string);
  const profileImage = JSON.parse(
    localStorage.getItem("profileImage") || ("" as string),
  );
  const joined = formatDate(
    JSON.parse(localStorage.getItem("joined") as string),
  );

  const form = useForm<changePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      confirmPassword: "",
    },
  });

  const handleChangePassword = async (data: changePasswordSchemaType) => {
    try {
      if (!data.oldPassword || !data.confirmPassword) return;
      startTransition(async () => {
        await changePassword(data.oldPassword, data.newPassword);
      });
      setIsModalOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("There is something changing your password");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Modal
        isOpen={isModalOpen}
        parentSelector={() => document.querySelector("#root") as HTMLElement}
        className={
          "bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
        }
        overlayClassName={
          "fixed inset-0 z-40 bg-black/50 bg-opacity-50 backdrop-blur-sm"
        }
      >
        <div className="flex min-w-screen flex-col md:min-w-[400px]">
          <form
            onSubmit={form.handleSubmit(handleChangePassword)}
            className="grid grid-cols-1 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-4"
          >
            <h2 className="text-center text-lg font-bold">Change Password</h2>
            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="oldpassword" className="text-lg font-bold">
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldpassword"
                  autoComplete="off"
                  {...form.register("oldPassword")}
                  className="w-full rounded-sm bg-white p-2"
                />
                {form.formState.errors.oldPassword ? (
                  <span className="h-7 text-red-500">
                    {form.formState.errors.oldPassword.message}
                  </span>
                ) : (
                  <span className="h-7"></span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="newpassword" className="text-lg font-bold">
                  New Password
                </label>
                <input
                  type="password"
                  id="newpassword"
                  autoComplete="off"
                  {...form.register("newPassword")}
                  className="w-full rounded-sm bg-white p-2"
                />
                {form.formState.errors.newPassword ? (
                  <span className="h-7 text-red-500">
                    {form.formState.errors.newPassword.message}
                  </span>
                ) : (
                  <span className="h-7"></span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmpassword" className="text-lg font-bold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmpassword"
                  autoComplete="off"
                  {...form.register("confirmPassword")}
                  className="w-full rounded-sm bg-white p-2"
                />
                {form.formState.errors.confirmPassword ? (
                  <span className="h-7 text-red-500">
                    {form.formState.errors.confirmPassword.message}
                  </span>
                ) : (
                  <span className="h-7"></span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="cursor-pointer rounded-xl bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 p-2 transition duration-300 ease-in-out hover:from-green-500 hover:via-emerald-500 hover:to-teal-500 disabled:bg-gradient-to-br disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400"
                >
                  Submit
                </button>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-2 transition duration-300 ease-in-out hover:from-amber-500 hover:via-orange-500 hover:to-red-500 disabled:bg-gradient-to-br disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <h1 className="text-center text-3xl font-bold">Account</h1>
      <div className="relative flex flex-col gap-2 rounded-md bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-4 shadow-md shadow-sky-400">
        <div className="flex flex-col gap-2 overflow-hidden">
          <div className="grid grid-cols-1 place-items-center gap-1.5 text-center">
            <img
              src={profileImage !== null || "" ? profileImage : unknown}
              alt="profile_img"
              className="h-24 w-24 rounded-full"
            />
            <h2 className="text-2xl font-bold">{name}</h2>
          </div>

          <div className="grid grid-cols-1 place-items-center gap-1.5">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg">Email: {email}</h2>
              <h2 className="text-lg">Joined: {joined}</h2>
            </div>

            <div className="m-2 flex flex-col items-center justify-center gap-2">
              <button
                className="cursor-pointer rounded-md bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-2 text-lg duration-300 ease-in-out hover:scale-105 hover:from-amber-500 hover:via-orange-500 hover:to-red-500"
                onClick={() => setIsModalOpen(true)}
              >
                Change Password
              </button>
              <button className="cursor-pointer rounded-md bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-2 text-lg duration-300 ease-in-out hover:scale-105 hover:from-amber-500 hover:via-orange-500 hover:to-red-500">
                Change Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
