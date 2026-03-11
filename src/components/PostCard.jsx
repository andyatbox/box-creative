import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

export default function PostCard({ post, label }) {
 const date = post.publishedAt
 ? new Date(post.publishedAt).toLocaleDateString('en-US', {
 year: 'numeric',
 month: 'long',
 day: 'numeric',
 })
 : null

 return (
 <Link href={`/posts/${post.slug.current}`} className="group block">
 {label && <h2 className="text-black/40 mb-3">{label}</h2>}
 {post.thumbnail && (
 <div className="aspect-video overflow-hidden bg-neutral-100 mb-4">
 <Image
 src={urlFor(post.thumbnail).width(800).height(450).url()}
 alt={post.title}
 width={800}
 height={450}
 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
 />
 </div>
 )}
 {date && (
 <p className="text-black/40 mb-2">{date}</p>
 )}
 <h3 className="text-base group-hover:underline underline-offset-4">
 {post.title}
 </h3>
 </Link>
 )
}
