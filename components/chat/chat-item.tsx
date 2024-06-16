'use client'

import { Member, MemberRole, Profile } from '@prisma/client'

import { UserAvatar } from '@/components/user-avatar'

interface ChatItemProps {
  key: string
  id: string
  currentMember: Member
  member: Member & {
    profile: Profile
  }
  content: string
  fileUrl: string | null
  deleted: boolean
  timestamp: string
  isUpdated: boolean
  socketUrl: string
  socketQuery: Record<string, string>
}

export function ChatItem({
  id,
  currentMember,
  member,
  content,
  fileUrl,
  deleted,
  timestamp,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) {
  return (
    <div>
      <div className='flex items-start w-full p-4'>
        <div>
          <UserAvatar src={member.profile.imageUrl} className='' />
        </div>
        <div className='flex flex-col ml-2'>
          <div className='flex gap-x-2 font-semibold text-sm hover:underline cursor-pointer'>
            <p>{member.profile.name}</p>
            <span className='"text-xs text-zinc-500 dark:text-zinc-400'>
              {timestamp}
            </span>
          </div>
          <div>
            <p className=''>{content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
