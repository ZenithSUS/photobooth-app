export default function Header() {
  const name = JSON.parse(localStorage.getItem("name") as string);

  return (
    <header className="flex flex-col gap-1.5 md:flex-row items-center md:justify-between md:gap-0 p-4 bg-gradient-to-br from-sky-300 via-blue-300 to-indigo-400 text-black z-150 shadow-md sticky top-0 left-0 right-0 border-b-2 border-amber-400">
      <h1 className="text-3xl font-bold">Photo Booth</h1>
      <p className="text-2xl font-bold text-center">Hello, {name}</p>
    </header>
  );
}
