import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mohit AI - AI-Powered SDR Automation',
  description: 'Mohit AI - Your AI SDR That Never Sleeps',
}

export default function HomePage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: `` }} />
    </>
  )
}
