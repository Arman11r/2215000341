"use client"

import { useEffect, useState } from "react"
import { fetchTrendingPosts } from "@/services/api"
import PostCard from "@/components/PostCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import ErrorDisplay from "@/components/ErrorDisplay"

export default function TrendingPostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getTrendingPosts = async () => {
      try {
        setLoading(true)
        const data = await fetchTrendingPosts()
        setPosts(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch trending posts. Please try again later.")
        console.error("Error fetching trending posts:", err)
      } finally {
        setLoading(false)
      }
    }

    getTrendingPosts()
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Trending Posts</h1>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
