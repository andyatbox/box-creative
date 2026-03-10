'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
 { label: 'Home / Works', href: '/' },
 { label: 'About Box', href: '/about' },
 { label: 'Posts', href: '/posts' },
 { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
 const pathname = usePathname()
 const [menuOpen, setMenuOpen] = useState(false)

 return (
 <header className="sticky top-0 z-50 bg-white border-b border-black/10">
 <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
 <Link href="/"className="">
 Box Creative
 </Link>

 {/* Desktop nav */}
 <nav className="hidden md:flex items-center gap-10">
 {navLinks.map(({ label, href }) => (
 <Link
 key={href}
 href={href}
 className={` transition-opacity ${
 pathname === href ? 'opacity-100' : 'opacity-40 hover:opacity-100'
 }`}
 >
 {label}
 </Link>
 ))}
 </nav>

 {/* Mobile hamburger */}
 <button
 className="md:hidden flex flex-col gap-1.5 p-2"
 onClick={() => setMenuOpen((o) => !o)}
 aria-label="Toggle menu"
 >
 <span className="block w-5 h-px bg-black"/>
 <span className="block w-5 h-px bg-black"/>
 <span className="block w-5 h-px bg-black"/>
 </button>
 </div>

 {/* Mobile menu */}
 {menuOpen && (
 <div className="md:hidden bg-white border-t border-black/10">
 <nav className="flex flex-col px-6 py-6 gap-5">
 {navLinks.map(({ label, href }) => (
 <Link
 key={href}
 href={href}
 onClick={() => setMenuOpen(false)}
 className={` ${
 pathname === href ? 'opacity-100' : 'opacity-40'
 }`}
 >
 {label}
 </Link>
 ))}
 </nav>
 </div>
 )}
 </header>
 )
}
