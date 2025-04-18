import Image from "next/image"
import { formatDistanceToNow } from "date-fns"

interface User {
  id: string
  username: string
  avatarUrl?: string
}

interface Comment {
  id: string
  content: string
  user: User
  createdAt: string
}

interface Post {
  id: string
  content: string
  imageUrl?: string
  user: User
  comments: Comment[]
  createdAt: string
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  // Generate a random image if none is provided
  const imageUrl = post.imageUrl || `/placeholder.svg?height=400&width=600&text=Post+by+${post.user.username}`

  // Generate a random avatar if none is provided
  const avatarUrl =
    post.user.avatarUrl || `/placeholder.svg?height=50&width=50&text=${post.user.username.charAt(0).toUpperCase()}`

  // Format the date
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-center space-x-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
          <Image src={avatarUrl || "/placeholder.svg"} alt={post.user.username} fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-semibold">{post.user.username}</h3>
          <p className="text-xs text-gray-500">{timeAgo}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        <p className="mb-3">{post.content}</p>
      </div>

      {/* Post Image */}
      {imageUrl && (
        <div className="relative w-full h-64">
          <Image src={imageUrl || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
        </div>
      )}

      {/* Post Stats */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              {Math.floor(Math.random() * 100)}
            </span>
          </div>
          <span className="text-gray-600 text-sm">{post.comments.length} comments</span>
        </div>
      </div>

      {/* Comments Section */}
      {post.comments.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <h4 className="text-sm font-semibold mb-2">Comments</h4>
          <div className="space-y-3">
            {post.comments.slice(0, 2).map((comment) => (
              <div key={comment.id} className="flex space-x-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={
                      comment.user.avatarUrl ||
                      `/placeholder.svg?height=50&width=50&text=${comment.user.username.charAt(0).toUpperCase()}`
                    }
                    alt={comment.user.username}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-white p-2 rounded-lg text-sm flex-1">
                  <span className="font-semibold">{comment.user.username}</span> {comment.content}
                </div>
              </div>
            ))}

            {post.comments.length > 2 && (
              <button className="text-blue-500 text-sm font-medium">View all {post.comments.length} comments</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
