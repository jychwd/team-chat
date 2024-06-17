import { NextResponse } from 'next/server'
import { ChannelType } from '@prisma/client'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { name } = await req.json()
    const type = ChannelType.TEXT
    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    const url = new URL(req.url)
    const serverId = url.searchParams.get('serverId')
    if (!serverId) {
      return new NextResponse('Server ID missing', { status: 400 })
    }

    if (name === 'general') {
      return new NextResponse("Name cannot be 'general'", { status: 400 })
    }

    const server = await db.server.update({
      where: { id: serverId },
      data: {
        channels: {
          create: {
            name,
            type,
            profileId: profile.id,
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    return new NextResponse('Error creating channel', { status: 500 })
  }
}
