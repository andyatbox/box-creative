export default {
  name: 'contactSubmission',
  title: 'Contact Submissions',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'message', title: 'Message', type: 'text' },
    { name: 'submittedAt', title: 'Submitted At', type: 'datetime' },
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      submittedAt: 'submittedAt',
    },
    prepare({ name, email, submittedAt }) {
      return {
        title: name,
        subtitle: `${email} — ${submittedAt ? new Date(submittedAt).toLocaleDateString() : ''}`,
      }
    },
  },
}
