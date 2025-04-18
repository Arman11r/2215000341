"use client"

import { useEffect, useState } from "react"
import { fetchTopUsers } from "@/services/api"
import UserCard from "@/components/UserCard"
import LoadingSpinner from "@/components/LoadingSpinner"
import ErrorDisplay from "@/components/ErrorDisplay"

export default function TopUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getTopUsers = async () => {
      try {
        setLoading(true)
        const data = await fetchTopUsers()
        setUsers(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch top users. Please try again later.")
        console.error("Error fetching top users:", err)
      } finally {
        setLoading(false)
      }
    }

    getTopUsers()
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Top Users</h1>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}
