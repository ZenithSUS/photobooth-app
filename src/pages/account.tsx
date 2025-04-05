import formatDate from "../utils/functions/format-date";

export default function Account() {
  const name = JSON.parse(localStorage.getItem("name") as string);
  const email = JSON.parse(localStorage.getItem("email") as string);
  const joined = formatDate(
    JSON.parse(localStorage.getItem("joined") as string)
  );

  return (
    <main className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Account</h1>
      <div
        className="flex flex-col gap-2 bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 p-4
      shadow-md shadow-sky-400 rounded-md"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Name: {name}</h2>
          <h2 className="text-2xl font-bold">Email: {email}</h2>
          <h2 className="text-2xl font-bold">Joined: {joined}</h2>
        </div>
      </div>
    </main>
  );
}
