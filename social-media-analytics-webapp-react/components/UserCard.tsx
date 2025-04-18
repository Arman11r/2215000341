import Image from "next/image"

interface User {
  id: string
  username: string
  postCount: number
  avatarUrl?: string
}

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  // Generate a random avatar if none is provided
  const avatarUrl =
    user.avatarUrl || `/placeholder.svg?height=100&width=100&text=${user.username.charAt(0).toUpperCase()}`

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            <Image src={avatarUrl || "/placeholder.svg"} alt={user.username} fill className="object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{user.username}</h3>
            <div className="flex items-center mt-1">
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {user.postCount} posts
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2"></div>
    </div>
  )
}
