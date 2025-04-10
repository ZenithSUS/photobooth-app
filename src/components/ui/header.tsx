export default function Header() {
  const name = JSON.parse(localStorage.getItem("name") as string);

  return (
    <header className="sticky top-0 right-0 left-0 z-20 flex flex-col items-center gap-1.5 border-b-2 border-amber-400 bg-gradient-to-br from-sky-300 via-blue-300 to-indigo-400 p-4 text-black shadow-md lg:flex-row lg:justify-between lg:gap-0">
      <h1 className="text-3xl font-bold">ZenithBooth</h1>
      <p className="text-center text-2xl font-bold">Hello, {name}</p>
    </header>
  );
}
