'use client'

import { useState } from 'react'

export default function ContactForm() {
 const [form, setForm] = useState({ name: '', email: '', message: '' })
 const [status, setStatus] = useState(null)
 const [loading, setLoading] = useState(false)

 const handleChange = (e) => {
 setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
 }

 const handleSubmit = async (e) => {
 e.preventDefault()
 setLoading(true)
 setStatus(null)

 try {
 const res = await fetch('/api/contact', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(form),
 })

 if (res.ok) {
 setStatus('success')
 setForm({ name: '', email: '', message: '' })
 } else {
 setStatus('error')
 }
 } catch {
 setStatus('error')
 } finally {
 setLoading(false)
 }
 }

 return (
 <form onSubmit={handleSubmit} className="space-y-8">
 <div>
 <label
 htmlFor="name"
 className="block mb-3"
 >
 Name
 </label>
 <input
 id="name"
 name="name"
 type="text"
 required
 value={form.name}
 onChange={handleChange}
 className="w-full border-b border-black/20 py-2 bg-transparent focus:outline-none focus:border-black transition-colors placeholder:text-black/25"
 placeholder="Your name"
 />
 </div>

 <div>
 <label
 htmlFor="email"
 className="block mb-3"
 >
 Email
 </label>
 <input
 id="email"
 name="email"
 type="email"
 required
 value={form.email}
 onChange={handleChange}
 className="w-full border-b border-black/20 py-2 bg-transparent focus:outline-none focus:border-black transition-colors placeholder:text-black/25"
 placeholder="your@email.com"
 />
 </div>

 <div>
 <label
 htmlFor="message"
 className="block mb-3"
 >
 Message
 </label>
 <textarea
 id="message"
 name="message"
 rows={6}
 required
 value={form.message}
 onChange={handleChange}
 className="w-full border-b border-black/20 py-2 bg-transparent focus:outline-none focus:border-black transition-colors resize-none placeholder:text-black/25"
 placeholder="Tell me about your project..."
 />
 </div>

 <button
 type="submit"
 disabled={loading}
 className="border border-black px-10 py-3.5 hover:bg-black hover:text-white transition-colors disabled:opacity-40"
 >
 {loading ? 'Sending...' : 'Send Message'}
 </button>

 {status === 'success' && (
 <p className="text-sm text-black/60">Message sent. I&apos;ll be in touch soon.</p>
 )}
 {status === 'error' && (
 <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
 )}
 </form>
 )
}
