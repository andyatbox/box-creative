import { client } from '@/sanity/client'
import { pageBySlugQuery } from '@/sanity/queries'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import ColumnsContent from '@/components/ColumnsContent'
import ContactForm from '@/components/ContactForm'

export const revalidate = 60

export const metadata = {
 title: 'Contact — Box Creative',
}

export default async function ContactPage() {
 const page = await client.fetch(pageBySlugQuery, { slug: 'contact' })

 return (
 <div className="py-16">
 <div className="max-w-3xl mx-auto px-6">
 <h1 className="text-4xl mb-14">
 {page?.title || 'Contact'}
 </h1>

 {page?.body && (
 <div className="mb-14">
 <PortableTextRenderer value={page.body} />
 </div>
 )}

 <ColumnsContent groups={page?.columnsContent} />
 <ContactForm />
 </div>
 </div>
 )
}
