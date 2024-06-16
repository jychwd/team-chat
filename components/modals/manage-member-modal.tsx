"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from 'lucide-react'
import { useModal } from '@/hooks/use-modal-store'
import { ServerWithMembersWithProfiles } from '@/types'
import { UserAvatar } from '../user-avatar'
import { MemberRole } from '@prisma/client'
import { useRouter } from 'next/navigation'

import qs from 'query-string'
import axios from 'axios'

export const ManageMemberModal = () => {
  const router = useRouter()
  const { isOpen, onClose, type, data, onOpen } = useModal()
  const { server } = data as { server: ServerWithMembersWithProfiles }

  const handleClose = () => {
    onClose()
  }

  const isModalOpen = isOpen && type === 'manageMember'

  const kickMember = async (id: string) => {
    const url = qs.stringifyUrl({
      url: `/api/members/${id}`,
      query: {
        serverId: server?.id
      },
    })
    const res = await axios.delete(url)

    router.refresh()

    onOpen('manageMember', { server: res.data })
  }
  const setRole = async (role: MemberRole, id: string) => {
    const url = qs.stringifyUrl({
      url: `/api/members/${id}`,
      query: {
        serverId: server?.id
      },
    })
    const res = await axios.patch(url, { role: role })

    router.refresh()

    onOpen('manageMember', { server: res.data })



  }

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className='bg-white text-black p-0 overflow-hidden'>
          <DialogHeader className='pt-8 px-6'>
            <DialogTitle className='text-2xl text-center font-bold'>
              Manage Members
            </DialogTitle>
            <DialogDescription className='text-center text-zinc-500 text-lg'>
              <div>{server?.members.length} Members</div>

              {server?.members.map((member) => {
                const { profile, role, id } = member
                const { name, imageUrl, email } = profile

                return (
                  <div className='flex items-center p-5' key={id}>
                    <UserAvatar
                      src={imageUrl}
                      className='h-10 w-10 md:h-8 md:w-8'
                    />
                    <div className='flex flex-col text-sm font-semibold items-start ml-2'>
                      <div className='flex gap-x-1 items-center'>
                        {name}
                        {role === 'MODERATOR' && (
                          <ShieldCheck className='text-blue-500 h-4 w-4 ml-auto' />
                        )}
                        {role === 'ADMIN' && (
                          <ShieldAlert className='text-green-500 h-4 w-4 ml-auto' />
                        )}
                      </div>
                      <div>{email}</div>
                    </div>
                    <div className='ml-auto'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button>
                            {role !== 'ADMIN' && (
                              <MoreVertical className='text-zinc-500 h-4 w-4 ml-auto' />
                            )}
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <ShieldQuestion className='h-4 w-4 mr-2' />
                              <span>role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  onClick={() => setRole('GUEST', id)}
                                >
                                  <Shield className='mr-2 h-4 w-4' />
                                  <span className='uppercase'>Guest</span>
                                  {role === 'GUEST' && (
                                    <Check className='ml-auto h-4 w-4' />
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => setRole('MODERATOR', id)}
                                >
                                  <Shield className='mr-2 h-4 w-4' />
                                  <span>MODERATOR</span>
                                  {role === 'MODERATOR' && (
                                    <Check className='ml-auto h-4 w-4' />
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>

                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => kickMember(id)}>
                            <Gavel className='h-4 w-4 mr-2' />
                            <span>kick</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
