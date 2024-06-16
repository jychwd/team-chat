'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client'
import { Edit, Hash, Lock, Mic, Trash, Video, Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { useModal } from '@/hooks/use-modal-store'
interface ServerSectionProps {
  server: Server
}

export function ServerSection({ server }: ServerSectionProps) {
  const { onOpen } = useModal()
  const handleClick = () => {
    onOpen('createChannel', { server })
  }

  return (
    <div className='flex items-center justify-between p-2'>
      <div className='text-xs font-semibold text-zinc-500'>TEXT CHANNELS</div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleClick}
              className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'
            >
              <Plus className='text-zinc-500 h-4 w-4' />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className='font-semibold'>Create Channel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
