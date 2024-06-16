import { NextResponse } from 'next/server'
import { MemberRole } from '@prisma/client'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const { name, imageUrl } = await req.json()
    const serverId = params.serverId

    const profile = await currentProfile()

    if (!profile) return new NextResponse('Unauthorized', { status: 401 })
    console.log(name, imageUrl)

    const server = await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        name,
        imageUrl,
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log('[SERVERS_POST]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const serverId = params.serverId

    const profile = await currentProfile()

    if (!profile) return new NextResponse('Unauthorized', { status: 401 })
    console.log(serverId)

    const server = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log('[SERVERS_POST]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
