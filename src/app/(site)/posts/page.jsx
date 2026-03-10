import { client } from '@/sanity/client'
import { postsQuery, postsCountQuery } from '@/sanity/queries'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

const PER_PAGE = 10

export const revalidate = 60

export const metadata = {
 title: 'Posts — Box Creative',
}

export default async function PostsPage({ searchParams }) {
 const params = await searchParams
 const page = Number(params?.page) || 1
 const start = (page - 1) * PER_PAGE
 const end = start + PER_PAGE

 const [posts, total] = await Promise.all([
 client.fetch(postsQuery, { start, end }),
 client.fetch(postsCountQuery),
 ])

 const totalPages = Math.ceil(total / PER_PAGE)

 return (
 <div className="max-w-7xl mx-auto px-6 py-16">
 <h1 className="text-black/35 mb-14">Posts</h1>

 {posts.length === 0 ? (
 <div className="flex items-center justify-center py-40">
 <p className="text-black/25">No posts yet</p>
 </div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
 {posts.map((post) => (
 <PostCard key={post._id} post={post} />
 ))}
 </div>
 )}

 {totalPages > 1 && (
 <div className="flex items-center justify-center gap-8 mt-20">
 {page > 1 && (
 <Link
 href={`/posts?page=${page - 1}`}
 className="border-b border-black pb-0.5 hover:opacity-40 transition-opacity"
 >
 ← Newer
 </Link>
 )}
 <span className="text-black/30">
 {page} / {totalPages}
 </span>
 {page < totalPages && (
 <Link
 href={`/posts?page=${page + 1}`}
 className="border-b border-black pb-0.5 hover:opacity-40 transition-opacity"
 >
 Older →
 </Link>
 )}
 </div>
 )}
 </div>
 )
}
