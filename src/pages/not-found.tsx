import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex flex-col gap-2 items-center justify-center min-h-screen">
      <h1 className="text-3xl">The page you are looking for does not exist.</h1>
      <p className="text-2xl">404</p>
      <Link className="underline hover:text-blue-500" to="/login">
        Go Back Home
      </Link>
    </main>
  );
}
