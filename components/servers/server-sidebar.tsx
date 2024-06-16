
import { redirect } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, Server } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

import { ServerChannel } from '@/components/servers/server-channel'
import { Button } from '../ui/button'
import { ServerSection } from './server-section'
import { ServerHeader } from './server-header'
import { ServerMember } from './server-member'
import { ServerMemberSection } from './server-member-section'
interface ServerSidebarProps {
  serverId:string
}

export const ServerSidebar = async ({serverId}: ServerSidebarProps) => {
 
  const profile = await currentProfile()
 
  

  if (!profile) {
    return redirect('/')
  }

  const servers = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
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
  const profileId = profile.id
  const role = servers?.members.find((member) => member.profileId === profileId)?.role
  
  const Channels = servers?.channels

  const members = servers?.members.filter((member) => member.profileId !== profileId);
 

  return (
    <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
      <ServerHeader server={servers} />

      <Separator className='h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto' />
      <ScrollArea className='flex-1 w-full items-center text-center mt-3'>
        <div>
          <ServerSection server={servers} />
        </div>
        <div>
          {Channels.map((channel) => (
            <ServerChannel
              server={servers}
              channel={channel}
              key={channel.id}
              role={role}
            />
          ))}
        </div>
        <ServerMemberSection servers={servers} />
        <div>
          {members.map((member) => {
            return (
              <ServerMember
                member={member}
                key={member.id}
                role={role}
              />
            )
          
          })}
          
        </div>
      </ScrollArea>
    </div>
  )
}
