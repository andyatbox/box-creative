import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

export default function ProjectCard({ project, label }) {
 return (
 <Link href={`/projects/${project.slug.current}`} className="group block">
 {label && <h2 className="text-3xl mb-3">{label}</h2>}
 <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
 {project.thumbnail ? (
 <Image
 src={urlFor(project.thumbnail).width(800).height(600).url()}
 alt={project.title}
 width={800}
 height={600}
 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
 />
 ) : (
 <div className="w-full h-full flex items-center justify-center text-neutral-300">
 No image
 </div>
 )}
 </div>
 <h3 className="text-2xl mt-3">{project.title}</h3>
 </Link>
 )
}
