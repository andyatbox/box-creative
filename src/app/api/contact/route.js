import { writeClient } from '@/sanity/writeClient'

export async function POST(req) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 })
    }

    await writeClient.create({
      _type: 'contactSubmission',
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return Response.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
