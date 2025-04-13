import formatDate from "../utils/functions/format-date";
import unknown from "../assets/ui/unknown.jpg";

export default function Account() {
  const name = JSON.parse(localStorage.getItem("name") as string);
  const email = JSON.parse(localStorage.getItem("email") as string);
  const joined = formatDate(
    JSON.parse(localStorage.getItem("joined") as string),
  );

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-bold md:text-start">Account</h1>
      <div className="relative flex flex-col gap-2 rounded-md bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-4 shadow-md shadow-sky-400">
        <div className="flex flex-col gap-2 overflow-hidden">
          <div className="grid grid-cols-1 place-items-center gap-1.5 text-center">
            <img
              src={unknown}
              alt="profile_img"
              className="h-24 w-24 rounded-full"
            />
            <h2 className="text-2xl font-bold">{name}</h2>
          </div>
          <h2 className="text-lg">Email: {email}</h2>
          <h2 className="text-lg">Joined: {joined}</h2>
        </div>
      </div>
    </div>
  );
}
