// Types
interface User {
  id: string
  username: string
  postCount: number
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

// Mock data for development
const mockUsers: User[] = [
  { id: "1", username: "johndoe", postCount: 42 },
  { id: "2", username: "janedoe", postCount: 38 },
  { id: "3", username: "bobsmith", postCount: 27 },
  { id: "4", username: "alicejones", postCount: 25 },
  { id: "5", username: "mikebrown", postCount: 19 },
]

const mockPosts: Post[] = [
  {
    id: "1",
    content: "Just launched my new website! Check it out and let me know what you think.",
    user: mockUsers[0],
    comments: [
      {
        id: "1",
        content: "Looks amazing! Great job!",
        user: mockUsers[1],
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "2",
        content: "The design is so clean and modern.",
        user: mockUsers[2],
        createdAt: new Date(Date.now() - 2400000).toISOString(),
      },
      {
        id: "3",
        content: "I love the color scheme!",
        user: mockUsers[3],
        createdAt: new Date(Date.now() - 1200000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "2",
    content: "Beautiful sunset at the beach today. Nature is amazing!",
    user: mockUsers[1],
    comments: [
      {
        id: "4",
        content: "Wow, that looks incredible!",
        user: mockUsers[0],
        createdAt: new Date(Date.now() - 3000000).toISOString(),
      },
      {
        id: "5",
        content: "I wish I was there!",
        user: mockUsers[4],
        createdAt: new Date(Date.now() - 1800000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "3",
    content: "Just finished reading this amazing book. Highly recommend!",
    user: mockUsers[2],
    comments: [
      {
        id: "6",
        content: "What was your favorite part?",
        user: mockUsers[1],
        createdAt: new Date(Date.now() - 2700000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "4",
    content: "Excited to announce that I'll be speaking at the tech conference next month!",
    user: mockUsers[3],
    comments: [
      {
        id: "7",
        content: "That's awesome! What will you be talking about?",
        user: mockUsers[0],
        createdAt: new Date(Date.now() - 3300000).toISOString(),
      },
      {
        id: "8",
        content: "Congratulations! Can't wait to hear your talk.",
        user: mockUsers[2],
        createdAt: new Date(Date.now() - 2100000).toISOString(),
      },
      {
        id: "9",
        content: "Will it be recorded? I can't attend in person.",
        user: mockUsers[4],
        createdAt: new Date(Date.now() - 900000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 345600000).toISOString(),
  },
]

// API functions
export async function fetchTopUsers(): Promise<User[]> {
  // In a real app, this would be an API call to your backend
  // For now, we'll use mock data

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Sort users by post count and return top 5
  return [...mockUsers].sort((a, b) => b.postCount - a.postCount).slice(0, 5)
}

export async function fetchTrendingPosts(): Promise<Post[]> {
  // In a real app, this would be an API call to your backend
  // For now, we'll use mock data

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Find the maximum comment count
  const maxComments = Math.max(...mockPosts.map((post) => post.comments.length))

  // Return all posts that have the maximum comment count
  return mockPosts.filter((post) => post.comments.length === maxComments)
}

export async function fetchFeed(): Promise<Post[]> {
  // In a real app, this would be an API call to your backend
  // For now, we'll use mock data

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Sort posts by creation date (newest first)
  return [...mockPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}
