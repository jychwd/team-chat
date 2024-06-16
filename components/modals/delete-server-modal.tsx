'use client'
import { useParams } from 'next/navigation'
import axios from 'axios'
import qs from 'query-string'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Server, Channel } from '@prisma/client'
import { useRouter, redirect } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'

export const DeleteServerModal = () => {
  const params = useParams()
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()
  const serverId = params.serverId
  const channelId = params.channelId

  const isModalOpen = isOpen && type === 'deleteServer'

  const handleClose = () => {
    onClose()
  }
  const handleDelete = async () => {
    try {
      const channelIdSelected = data?.channel?.id
      const url = qs.stringifyUrl({
        url: `/api/servers/${serverId}`,
      })

      const res = await axios.delete(url)
      onClose()

      router.refresh()

      router.push(`/`)
    } catch (error) {}
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Delete the server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500 text-lg'>
            <div> Are you sure you want to do this?</div>

            <div>
              <span className='text-indigo-500 font-semibold'>
                #{data?.server?.name}
              </span>{' '}
              will be permanently deleted.
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex items-center justify-between w-full bg-zinc-200 p-2'>
          <Button
            className='bg-inherit text-black hover:bg-inherit  ml-auto'
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className='bg-red-500 hover:bg-red-700'
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
