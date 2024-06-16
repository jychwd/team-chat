'use client'

import { Member, MemberRole, Server, Channel, Profile } from '@prisma/client'
import { Settings } from 'lucide-react'
import { ActionTooltip } from '@/components/action-tooltip'
import { useModal } from '@/hooks/use-modal-store'
import { ServerWithMembersWithProfiles } from '@/types'


export const ServerMemberSection = ({servers} :{servers:any}) => {
  const { onOpen, data, type } = useModal()
  

  const handleClick = () => {
    onOpen('manageMember', { server: servers })
  }

  return (
    <>
      <div className='flex items-center justify-between p-2'>
        <div className='text-xs font-semibold uppercase text-zinc-500'>
          members
        </div>
        <ActionTooltip label='Manage Members'>
          <button
            onClick={handleClick}
            className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'
          >
            <Settings className='text-zinc-500 h-4 w-4' />
          </button>
        </ActionTooltip>
      </div>
    </>
  )
}
