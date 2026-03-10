import { client } from '@/sanity/client'
import { postBySlugQuery } from '@/sanity/queries'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import ColumnsContent from '@/components/ColumnsContent'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function PostPage({ params }) {
 const { slug } = await params
 const post = await client.fetch(postBySlugQuery, { slug })

 if (!post) notFound()

 const date = post.publishedAt
 ? new Date(post.publishedAt).toLocaleDateString('en-US', {
 year: 'numeric',
 month: 'long',
 day: 'numeric',
 })
 : null

 return (
 <article className="py-16">
 <div className="max-w-3xl mx-auto px-6">
 {date && (
 <p className="text-black/40 mb-5">{date}</p>
 )}
 <h1 className="text-4xl mb-12">{post.title}</h1>
 </div>

 {post.thumbnail && (
 <div className="max-w-3xl mx-auto px-6 mb-14">
 <div className="aspect-video overflow-hidden bg-neutral-100">
 <Image
 src={urlFor(post.thumbnail).width(1200).height(675).url()}
 alt={post.title}
 width={1200}
 height={675}
 className="w-full h-full object-cover"
 />
 </div>
 </div>
 )}

 <div className="max-w-3xl mx-auto px-6">
 <PortableTextRenderer value={post.body} />
 <ColumnsContent groups={post.columnsContent} />
 </div>
 </article>
 )
}
