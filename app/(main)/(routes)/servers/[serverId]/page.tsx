import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const SetupPage = async ({ params }: { params: { serverId: string } }) => {
  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: 'general',
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  const channel = server.channels[0]

  return redirect(`/servers/${params.serverId}/channels/${channel.id}`)
}

export default SetupPage
