import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-white mb-4 font-mono">404</h1>
      <h2 className="text-xl text-neutral-300 mb-6">Page Not Found</h2>
      <Link
        href="/"
        className="px-4 py-2 rounded-xl bg-violet-600 text-white font-medium text-sm hover:bg-violet-500 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
