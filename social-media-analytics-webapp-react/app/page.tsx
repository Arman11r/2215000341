import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold mb-8 text-center">Social Media Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link
          href="/top-users"
          className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Top Users</h2>
          <p className="text-white opacity-90">View users with the highest number of posts</p>
        </Link>

        <Link
          href="/trending-posts"
          className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Trending Posts</h2>
          <p className="text-white opacity-90">Discover posts with the most engagement</p>
        </Link>

        <Link
          href="/feed"
          className="bg-gradient-to-r from-amber-500 to-red-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Live Feed</h2>
          <p className="text-white opacity-90">See the latest posts in real-time</p>
        </Link>
      </div>
    </div>
  )
}
