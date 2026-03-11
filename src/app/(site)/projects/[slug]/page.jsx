import { client } from '@/sanity/client'
import { projectBySlugQuery, allProjectsQuery } from '@/sanity/queries'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import ColumnsContent from '@/components/ColumnsContent'
import ImageSlider from '@/components/ImageSlider'
import ProjectCard from '@/components/ProjectCard'
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
 const [project, allProjects] = await Promise.all([
  client.fetch(projectBySlugQuery, { slug }),
  client.fetch(allProjectsQuery),
 ])

 if (!project) notFound()

 const categoryProjects = allProjects.filter(p => p.category === project.category)
 const currentIdx = categoryProjects.findIndex(p => p._id === project._id)
 const hasPrevNext = categoryProjects.length > 1
 const prevProject = hasPrevNext
  ? categoryProjects[(currentIdx - 1 + categoryProjects.length) % categoryProjects.length]
  : null
 const nextProject = hasPrevNext
  ? categoryProjects[(currentIdx + 1) % categoryProjects.length]
  : null
 const otherProjects = allProjects.filter(p => p._id !== project._id)

 // Group other projects by category, current category first
 const CATEGORY_ORDER = [
  project.category,
  ...Object.keys(CATEGORY_LABELS).filter(c => c !== project.category),
 ]
 const groupedProjects = CATEGORY_ORDER.reduce((acc, cat) => {
  const projects = otherProjects.filter(p => p.category === cat)
  if (projects.length) acc.push({ category: cat, projects })
  return acc
 }, [])

 return (
 <article className="py-16">
 {/* Header */}
 <div className="max-w-5xl mx-auto px-6 mb-14">
 {project.category && (
 <p className="mb-4">
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

 {/* Prev / Next within category */}
 {hasPrevNext && (
 <div className="max-w-5xl mx-auto px-6 mt-24 border-t border-black/10 pt-14">
 <div className="grid grid-cols-2 gap-6">
 <ProjectCard project={prevProject} label="Previous project" />
 <ProjectCard project={nextProject} label="Next project" />
 </div>
 </div>
 )}

 {/* All other projects grid, grouped by category */}
 {groupedProjects.length > 0 && (
 <div className="px-6 mt-24 space-y-16">
 {groupedProjects.map(({ category, projects }) => (
 <div key={category}>
 <h2 className="text-3xl mb-6">
 {category === project.category
 ? `More projects from ${CATEGORY_LABELS[category] || category}`
 : CATEGORY_LABELS[category] || category}
 </h2>
 <div className="grid grid-cols-2 gap-4 md:grid-cols-3 2xl:grid-cols-6">
 {projects.map(p => (
 <ProjectCard key={p._id} project={p} />
 ))}
 </div>
 </div>
 ))}
 </div>
 )}
 </article>
 )
}
