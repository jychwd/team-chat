import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Message } from '@prisma/client'
const MESSAGES_BATCH = 10
export async function GET(req:Request){
  try {
    const profile = await currentProfile()
    if (!profile) {
      return redirectToSignIn()
    }
    const { searchParams } = new URL(req.url)
    const channelId = searchParams.get('channelId')
    const cursor = searchParams.get('cursor')

    if (!channelId) {
      return new NextResponse('Channel ID missing', { status: 400 })
    }

    let messages: Message[] = []

    if (cursor) {
      messages = await db.message.findMany({
        where: {
          channelId,
        },
        skip: 1,
        cursor: {
          id: cursor,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: MESSAGES_BATCH,
      })
    } else {
      messages = await db.message.findMany({
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: MESSAGES_BATCH,
      })
    }

    let nextCursor = null

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[messages.length - 1].id
    }
    return NextResponse.json({
      items: messages,
      nextCursor,
    })
  } catch (error) {
     return new NextResponse('Internal Error', { status: 500 })
  }
}