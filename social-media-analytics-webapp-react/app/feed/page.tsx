"use client"

import { useEffect, useState } from "react"
import { fetchFeed } from "@/services/api"
import PostCard from "@/components/PostCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import ErrorDisplay from "@/components/ErrorDisplay"

export default function FeedPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getFeed = async () => {
      try {
        setLoading(true)
        const data = await fetchFeed()
        setPosts(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch feed. Please try again later.")
        console.error("Error fetching feed:", err)
      } finally {
        setLoading(false)
      }
    }

    getFeed()

    // Set up polling for real-time updates
    const interval = setInterval(async () => {
      try {
        const data = await fetchFeed()
        setPosts(data)
      } catch (err) {
        console.error("Error updating feed:", err)
      }
    }, 10000) // Poll every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Live Feed</h1>

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
