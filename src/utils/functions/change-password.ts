import { toast } from "react-toastify";
import { account } from "../../appwrite";
import { ErrorType } from "../types";

export default async function changePassword(
  oldPassword: string,
  newPassword: string,
) {
  try {
    await account.updatePassword(newPassword, oldPassword);
    toast.success("Password Changed Successfully!");
  } catch (error) {
    const err = error as ErrorType;

    if (err.code === 401) return toast.error(err.message);
    if (err.code === 429)
      return toast.error("Too many requests try again after an hour");
    console.error(error);
  }
}
