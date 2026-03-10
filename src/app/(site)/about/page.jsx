import { client } from '@/sanity/client'
import { pageBySlugQuery } from '@/sanity/queries'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import ColumnsContent from '@/components/ColumnsContent'
import { notFound } from 'next/navigation'

export const revalidate = 60

export const metadata = {
 title: 'About Box — Box Creative',
}

export default async function AboutPage() {
 const page = await client.fetch(pageBySlugQuery, { slug: 'about' })

 if (!page) notFound()

 return (
 <div className="py-16">
 <div className="max-w-3xl mx-auto px-6">
 <h1 className="text-4xl mb-14">{page.title}</h1>
 <PortableTextRenderer value={page.body} />
 <ColumnsContent groups={page.columnsContent} />
 </div>
 </div>
 )
}
