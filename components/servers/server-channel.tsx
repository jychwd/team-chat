'use client'

import { Channel, ChannelType, MemberRole, Server } from '@prisma/client'
import { Edit, Hash, Lock, Mic, Trash, Video, Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { ActionTooltip } from '@/components/action-tooltip'
import { ModalType, useModal } from '@/hooks/use-modal-store'
import { Button } from '../ui/button'

interface ServerChannelProps {
  server: Server
  channel: Channel
  role?: MemberRole
}
export const ServerChannel = ({
  server,
  channel,
  role,
}: ServerChannelProps) => {
  const { onOpen } = useModal()
  const params = useParams()
  const router = useRouter()
  const channelId = params.channelId

  const handleclick = () => {
    router.push(`/servers/${server.id}/channels/${channel.id}`)
  }

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation()
    onOpen(action, { channel, server })
  }
  return (
    <div>
      <div
        className={cn(
          'text-zinc-600',
          'my-1',
          channel.id === channelId && 'bg-zinc-300',
          'font-bold',
          'rounded-lg',
          'p-2',
          'mx-3',
          'hover:bg-zinc-200',
          'transition',
          'group'
        )}
        onClick={handleclick}
      >
        <div className='flex items-center'>
          <Hash className='text-zinc-500 h-4 w-4 mr-1' />
          {channel.name}

          {channel.name === 'general' && (
            <Lock className='text-zinc-500 h-4 w-4 ml-auto' />
          )}
          {channel.name !== 'general' && role !== MemberRole.GUEST && (
            <div className='flex ml-auto items-center gap-x-2'>
              <ActionTooltip label='edit'>
                <Edit
                  onClick={(e) => onAction(e, 'editChannel')}
                  className='hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'
                />
              </ActionTooltip>
              <ActionTooltip label='delete'>
                <Trash
                  onClick={(e) => onAction(e, 'deleteChannel')}
                  className='hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'
                />
              </ActionTooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
