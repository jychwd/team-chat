import { NextResponse } from 'next/server'
import { ChannelType } from '@prisma/client'


import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

export async function POST(req: Request) {


  const { name, serverId } = await req.json()
  const type = ChannelType.TEXT
  const profile = await currentProfile()

  const channel = await db.channel.create({
    data: {
      name,
      type,
      profileId: profile.id,
      serverId,
    },
  })

  return NextResponse.json(channel)
}

