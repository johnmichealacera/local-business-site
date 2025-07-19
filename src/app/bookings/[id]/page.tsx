import { notFound } from 'next/navigation'
import { EventDetailClient } from '@/components/events/event-detail-client'
import { getEventById } from '@/lib/events'

// Force dynamic rendering - this prevents caching and ensures fresh data
export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EventDetailPage({ params }: any) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return <EventDetailClient event={event} />
} 