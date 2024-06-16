import { db } from '@/lib/db'

import { MemberRole, Server, Member, Profile } from '@prisma/client'
import { NextResponse } from 'next/server';

export const PATCH = async (
  req: Request,
  { params }: { params: { memberId: string } }
) => {
 try {
   const { role } = await req.json()
   const url = new URL(req.url)
   const serverId = url.searchParams.get('serverId')

   const server = await db.server.update({
    where:{
      id:serverId,
    
    },
    data:{
      members:{
        update:{
          where:{
            id:params.memberId
          },
          data:{
            role:role
          }
        
        }
      }
    },
    include:{
      members:{
        include:{
          profile:true
        },
        orderBy:{
          role:'asc'
        
        }
      }
    
    }
   })

   return NextResponse.json(server)
 } catch (error) {

  return new NextResponse("Internal Error", { status: 500 })
  
 }
}
export const DELETE = async (
  req: Request,
  { params }: { params: { memberId: string } }
) => {
  try {
 
    const url = new URL(req.url)
    const serverId = url.searchParams.get('serverId')

    const server = await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        members: {
          deleteMany: {
           
              id: params.memberId,
            
           
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: 'asc',
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
