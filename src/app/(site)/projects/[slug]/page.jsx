import { client } from '@/sanity/client'
import { projectBySlugQuery } from '@/sanity/queries'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import ColumnsContent from '@/components/ColumnsContent'
import ImageSlider from '@/components/ImageSlider'
import { notFound } from 'next/navigation'

export const revalidate = 60

const CATEGORY_LABELS = {
 'branding-print': 'Branding & Print',
 'immersive-ux': 'Immersive UX',
 'web-app-design-dev': 'Web/App Design & Dev',
 advertising: 'Advertising',
}

export default async function ProjectPage({ params }) {
 const { slug } = await params
 const project = await client.fetch(projectBySlugQuery, { slug })

 if (!project) notFound()

 return (
 <article className="py-16">
 {/* Header */}
 <div className="max-w-5xl mx-auto px-6 mb-14">
 {project.category && (
 <p className="text-black/40 mb-4">
 {CATEGORY_LABELS[project.category] || project.category}
 </p>
 )}
 <h1 className="text-4xl">{project.title}</h1>
 </div>

 {/* Video */}
 {project.videoUrl && (
 <div className="max-w-5xl mx-auto px-6 mb-14">
 <div className="aspect-video bg-black">
 <video
 src={project.videoUrl}
 controls
 className="w-full h-full"
 />
 </div>
 </div>
 )}

 {/* Image gallery slider */}
 {project.gallery?.length > 0 && (
 <div className="mb-14">
 <ImageSlider images={project.gallery} />
 </div>
 )}

 {/* Body */}
 {project.body && (
 <div className="max-w-5xl mx-auto px-6 mt-4">
 <PortableTextRenderer value={project.body} />
 </div>
 )}
 <div className="max-w-5xl mx-auto px-6">
 <ColumnsContent groups={project.columnsContent} />
 </div>
 </article>
 )
}
