'use client'
import axios from 'axios'
import qs from 'query-string'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'

interface ChatInputProps {
  apiUrl: string
  query: Record<string, any>
  name: string
  type?: 'conversation' | 'channel'
}

export function ChatInput({ apiUrl, query, name, type }: ChatInputProps) {
  const url = qs.stringifyUrl({
    url: apiUrl,
    query,
  })

  const SendMsg = (e: any) => {
    e.preventDefault()
    const content = e.target.msg.value
    axios.post(url, { content })
    e.target.msg.value = ''
  }
  return (
    <div>
      <form onSubmit={SendMsg}>
        <div className='relative p-4 pb-6'>
          <button
            type='button'
            className='absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center'
          >
            <Plus className='text-white dark:text-[#313338]' />
          </button>

          <Input
            type='text'
            name='msg'
            className='px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200'
          />
        </div>
      </form>
    </div>
  )
}
