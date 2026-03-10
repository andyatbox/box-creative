import Navigation from '@/components/Navigation'

export default function SiteLayout({ children }) {
 return (
 <>
 <Navigation />
 <main>{children}</main>
 <footer className="border-t border-black/10 mt-24 py-10 px-6">
 <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-black/30">
 <span>Box Creative</span>
 <span>© {new Date().getFullYear()}</span>
 </div>
 </footer>
 </>
 )
}
