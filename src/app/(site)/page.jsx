import { client } from '@/sanity/client'
import { projectsQuery } from '@/sanity/queries'
import ProjectCard from '@/components/ProjectCard'

export const revalidate = 60

const CATEGORIES = [
 { value: 'branding-print', label: 'Branding & Print' },
 { value: 'immersive-ux', label: 'Interactive Experiences' },
]

export default async function HomePage() {
 const projects = await client.fetch(projectsQuery)

 return (
 <div className="max-w-7xl mx-auto px-6 py-16">
 {CATEGORIES.map(({ value, label }) => {
 const categoryProjects = projects.filter((p) => p.category === value)
 if (!categoryProjects.length) return null

 return (
 <section key={value} className="mb-24">
 <div className="mb-8 pb-4 border-b border-black/10">
 <h2 className="text-xl md:text-3xl">{label}</h2>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
 {categoryProjects.map((project) => (
 <ProjectCard key={project._id} project={project} />
 ))}
 </div>
 </section>
 )
 })}

 {projects.length === 0 && (
 <div className="flex items-center justify-center py-40">
 <p className="text-black/25">No projects yet</p>
 </div>
 )}
 </div>
 )
}
