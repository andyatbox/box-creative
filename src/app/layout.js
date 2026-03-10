import './globals.css'

export const metadata = {
  title: 'Box Creative',
  description: 'Creative Director Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
