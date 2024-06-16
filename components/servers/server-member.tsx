'use client'


import { Member, MemberRole, Server, Channel, Profile } from '@prisma/client'
import { ActionTooltip } from '@/components/action-tooltip'
import { ShieldAlert, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserAvatar } from '@/components/user-avatar'
import { useParams } from 'next/navigation'

interface ServerMemberProps {
 member: Member & {profile: Profile}
 role?: MemberRole
}

export const ServerMember = ({ member, role }: ServerMemberProps) => {
  

  const handleClick = () => {}

  return (
    <>
      <div
        className={cn(
          'flex',
          'items-center',
          'p-3',
          'hover:bg-zinc-300',
          'rounded-md',
          'cursor-pointer',
          'transition',
          'mx-2',
          'text-sm',
          'gap-x-2'
        )}
      >
        <UserAvatar
          src={member.profile.imageUrl}
          className='h-8 w-8 md:h-8 md:w-8'
        />
        {member.profile.name}
        {member.role === 'MODERATOR' && (
          <ShieldCheck className='text-blue-500 h-4 w-4 ml-auto' />
        )}
        {member.role === 'ADMIN' && (
          <ShieldAlert className='text-green-500 h-4 w-4 ml-auto' />
        )}
      </div>
    </>
  )
}
