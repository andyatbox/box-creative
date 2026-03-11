import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

const makeComponents = (compact) => ({
 types: {
 image: ({ value }) => (
 <figure className={compact ? '' : 'my-10'}>
 <Image
 src={urlFor(value).width(1200).url()}
 alt={value.alt || ''}
 width={1200}
 height={800}
 className="w-full object-cover"
 />
 {value.caption && (
 <figcaption className="mt-3 text-center">
 {value.caption}
 </figcaption>
 )}
 </figure>
 ),
 code: ({ value }) => (
 <pre className="my-8 overflow-x-auto bg-neutral-950 text-neutral-100 p-6 text-sm font-mono">
 {value.language && (
 <div className="text-neutral-500 mb-4">
 {value.language}
 </div>
 )}
 <code>{value.code}</code>
 </pre>
 ),
 },
 block: {
 h2: ({ children }) => (
 <h2 className="text-2xl mt-14 mb-5">{children}</h2>
 ),
 h3: ({ children }) => (
 <h3 className="text-xl mt-10 mb-4">{children}</h3>
 ),
 h4: ({ children }) => (
 <h4 className="text-base mt-8 mb-3">{children}</h4>
 ),
 normal: ({ children }) => (
 <p className="mb-6 text-black/80">{children}</p>
 ),
 blockquote: ({ children }) => (
 <blockquote className="my-8 pl-6 border-l-2 border-black/15 text-black/55 italic">
 {children}
 </blockquote>
 ),
 },
 marks: {
 strong: ({ children }) => <strong className="">{children}</strong>,
 em: ({ children }) => <em className="italic">{children}</em>,
 underline: ({ children }) => <span className="underline underline-offset-2">{children}</span>,
 link: ({ value, children }) => (
 <a
 href={value.href}
 target={value.href?.startsWith('http') ? '_blank' : undefined}
 rel={value.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
 className="underline underline-offset-2 hover:opacity-50 transition-opacity"
 >
 {children}
 </a>
 ),
 },
 list: {
 bullet: ({ children }) => (
 <ul className="list-disc pl-6 mb-6 space-y-2 text-black/80">{children}</ul>
 ),
 number: ({ children }) => (
 <ol className="list-decimal pl-6 mb-6 space-y-2 text-black/80">{children}</ol>
 ),
 },
 listItem: {
 bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
 number: ({ children }) => <li className="leading-relaxed">{children}</li>,
 },
})

export default function PortableTextRenderer({ value, compact }) {
 if (!value) return null
 return <PortableText value={value} components={makeComponents(compact)} />
}
