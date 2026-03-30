export function HomePage() {
  return (
    <main className="max-w-3xl mx-auto mt-20 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to Harfai</h1>
      <p className="text-xl text-gray-500 mb-10">
        Full-stack self-evolution framework powered by FarmFE and Harness Engineering.
      </p>
      <nav className="flex justify-center gap-4">
        <a href="/users" className="text-blue-600 no-underline font-medium hover:underline">
          View Users →
        </a>
      </nav>
    </main>
  );
}

export default HomePage;
