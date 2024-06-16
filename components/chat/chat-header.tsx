import { Server } from '@prisma/client'
import { Hash } from 'lucide-react'
import { SocketIndicator } from '../socket-indicatior'
interface chatHeaderProps {
  server: Server
  name: string
}

export function ChatHeader(props: chatHeaderProps) {
  const name = props.name

  return (
    <div className='text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2'>
      <Hash />
      <p className='font-semibold text-md text-black dark:text-white ml-2'>{name}</p>
      <div className='ml-auto flex items-center'>
        <SocketIndicator />
      </div>
    </div>
  )
}
