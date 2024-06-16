'use client'

import { Check, Copy, RefreshCw } from 'lucide-react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useModal } from '@/hooks/use-modal-store'
import { useState, useEffect } from 'react'

export const InviteModal = () => {
  const params = useParams()
  const { isOpen, onClose, type, data } = useModal()
  const serverId = params.serverId
  const [url, seturl] = useState('')
  const { server } = data
  useEffect(() => {
    seturl(`http://localhost:3000/invite/${server?.inviteCode}`)
  }, [server])

  const isModalOpen = isOpen && type === 'invite'

  const refresh = async () => {
    const res = await axios.patch(`/api/servers/${serverId}/invite-code`)
    const link = res.data.inviteCode
    const invitelink = `http://localhost:3000/invite/${link}`
    seturl(invitelink)
  }
  const copyText = () => {
    navigator.clipboard.writeText(url)
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Invite members
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Invite link
          </DialogDescription>
          <div>
            <Input value={url} className='justify-center mt-4'></Input>
          </div>
        </DialogHeader>

        <DialogFooter className='bg-gray-100 px-6 py-4'>
          <Copy
            onClick={copyText}
            className='bg-blue-500 text-white p-1 rounded hover:bg-blue-400 active:bg-blue-600 focus:outline-none'
          />

          <RefreshCw
            onClick={refresh}
            className='bg-blue-500 text-white p-1 rounded hover:bg-blue-400 active:bg-blue-600 focus:outline-none'
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
