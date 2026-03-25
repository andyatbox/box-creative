'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
 { label: 'Home / Works', href: '/' },
 { label: 'About Box', href: '/about' },
 { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
 const pathname = usePathname()
 const [menuOpen, setMenuOpen] = useState(false)

 return (
 <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-md backdrop-saturate-150 border-b border-black/10">
 <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
 <Link href="/" className="">
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.65 185.753" className="h-[100px] w-auto">
   <g>
     <polygon points="98.267 88.295 101.89 85.304 105.511 82.314 109.135 79.325 112.756 76.333 116.379 73.343 120.004 70.353 123.625 67.363 61.811 16.331 0 67.363 0 118.39 61.811 169.422 123.625 118.39 92.717 92.875 94.645 91.285 98.267 88.295"/>
     <polygon points="123.625 67.363 61.811 16.331 61.811 22.311 120.004 70.353 123.625 67.363"/>
     <polygon points="120.004 70.353 61.811 22.311 61.811 28.292 116.379 73.343 120.004 70.353" fill="#0d0d0d"/>
     <polygon points="116.379 73.343 61.811 28.292 61.811 34.273 112.756 76.333 116.379 73.343" fill="#1a1a1a"/>
     <polygon points="112.756 76.333 61.811 34.273 61.811 40.255 109.135 79.325 112.756 76.333" fill="#262626"/>
     <polygon points="109.135 79.325 61.811 40.255 61.811 46.235 105.511 82.314 109.135 79.325" fill="#333"/>
     <polygon points="105.511 82.314 61.811 46.235 61.811 52.216 101.89 85.304 105.511 82.314" fill="#404040"/>
     <polygon points="101.89 85.304 61.811 52.216 61.811 58.197 98.267 88.295 101.89 85.304" fill="#4d4d4d"/>
     <polygon points="98.267 88.295 61.811 58.197 61.811 64.178 94.645 91.285 98.267 88.295" fill="#595959"/>
     <polygon points="94.645 91.285 61.811 64.178 61.811 67.361 92.717 92.875 94.645 91.285" fill="#666"/>
     <polygon points="61.811 67.361 0 118.39 61.811 169.422 123.625 118.39 61.811 67.361" fill="#404040"/>
     <polygon points="0 67.363 0 118.39 61.811 67.361 61.811 16.331 0 67.363"/>
   </g>
   <g>
     <path d="M199.763,91.452c2.423-.985,3.613-3.531,3.613-6.076,0-4.311-3.161-7.514-8.212-7.514-2.093,0-3.983.206-5.83.206-1.888,0-2.628-.123-3.326-.123-.82,0-1.19.411-1.19,1.026,0,1.478,1.642.739,1.642,3.572v20.242c0,2.874-1.642,2.094-1.642,3.613,0,.533.37,1.026,1.19,1.026.698,0,1.438-.123,3.326-.123,1.725,0,4.764.164,6.61.164,6.16,0,8.91-3.695,8.91-8.417,0-3.531-1.93-6.323-5.091-7.596ZM192.126,82.666c0-1.478.616-1.971,1.683-1.971h.328c1.601,0,3.203,1.519,3.203,4.968,0,3.244-1.396,4.64-3.284,4.64h-1.026c-.657,0-.903-.206-.903-.986v-6.652ZM194.63,104.632h-.657c-1.438,0-1.848-.657-1.848-1.971v-8.581c0-.821.37-.985.985-.985h1.232c2.546,0,4.352,1.847,4.352,5.953,0,3.449-1.478,5.584-4.064,5.584Z"/>
     <path d="M213.539,86.034c-5.605.828-8.273,6.368-7.362,12.542.96,6.499,4.955,10.226,10.154,9.458,5.484-.81,8.227-6.403,7.334-12.455-.96-6.499-4.927-10.313-10.126-9.545ZM216.498,105.228c-2.153.318-4.22-3.279-5.072-9.046-.684-4.63-.003-7.055,1.906-7.337,2.112-.312,4.185,3.325,5.043,9.133.684,4.63.073,6.962-1.877,7.25Z"/>
     <path d="M238.224,103.072l-3.819-6.693,3.613-5.83c1.273-1.971,2.546-1.765,2.546-2.956,0-.575-.493-.944-1.068-.944-.533,0-1.395.123-2.135.123s-1.273-.123-2.011-.123-1.273.369-1.273.985c0,.986,1.068.945,1.068,2.094,0,.575-.288,1.149-.658,1.724l-1.56,2.423-1.273-2.217c-.41-.78-.698-1.52-.698-2.012,0-1.15.903-.986.903-2.053,0-.616-.452-.944-1.15-.944-.82,0-1.683.123-3.326.123-1.395,0-2.381-.123-3.161-.123-.533,0-1.026.328-1.026.985,0,1.068,1.273,1.026,2.586,3.326l3.532,6.282-3.696,5.954c-1.355,2.258-2.792,2.135-2.792,3.284,0,.534.452.904,1.068.904.533,0,1.273-.123,2.053-.123.821,0,1.601.123,2.218.123.82,0,1.355-.37,1.355-.986,0-.945-1.109-.903-1.109-2.053,0-.493.206-1.068.616-1.725l1.889-2.998,1.56,2.792c.41.739.616,1.232.616,1.806,0,1.396-1.15,1.232-1.15,2.217,0,.616.452.945,1.272.945.863,0,1.766-.123,3.449-.123,1.478,0,2.464.123,3.244.123.533,0,.985-.329.985-.945,0-1.067-1.396-1.026-2.668-3.367Z"/>
   </g>
 </svg>
 </Link>

 {/* Desktop nav */}
 <nav className="hidden md:flex items-center gap-10">
 {navLinks.map(({ label, href }) => (
 <Link
 key={href}
 href={href}
 className={`font-bold relative after:absolute after:bottom-0 after:left-0 after:h-[3px] after:bg-black after:transition-all after:duration-300 ${
 pathname === href ? 'after:w-full' : 'after:w-0 hover:after:w-full'
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
 className={`font-bold relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[3px] after:bg-black after:transition-all after:duration-300 ${
 pathname === href ? 'after:w-full' : 'after:w-0'
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
