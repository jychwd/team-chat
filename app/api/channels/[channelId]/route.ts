import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { de } from 'date-fns/locale'
import { NextResponse } from 'next/server'

export const DELETE = async (
  req: Request,
  { params }: { params: { channelId: string } }
) => {
  try {
    const profile = await currentProfile()

    const { channelId } = params

    const { searchParams } = new URL(req.url)

    const serverId = searchParams.get('serverId')

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!serverId) {
      return new NextResponse('Server ID missing', { status: 400 })
    }

    if (!params.channelId) {
      return new NextResponse('Channel ID missing', { status: 400 })
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: ['MODERATOR', 'ADMIN'],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: channelId,
            name: {
              not: 'general',
            },
          },
        },
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export const PATCH = async (
  req: Request,
  { params }: { params: { channelId: string } }
) => {
  try {
    const profile = await currentProfile()

    const { channelId } = params

    const { searchParams } = new URL(req.url)

    const serverId = searchParams.get('serverId')
    const { name } = await req.json()
    console.log(name)

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!serverId) {
      return new NextResponse('Server ID missing', { status: 400 })
    }

    if (!params.channelId) {
      return new NextResponse('Channel ID missing', { status: 400 })
    }

    const server = await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
              NOT: {
                name: 'general',
              },
            },
            data: {
              name,
            },
          },
        },
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
