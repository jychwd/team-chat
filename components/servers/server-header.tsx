'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react'

import { Button } from "../ui/button"
import { Server } from "@prisma/client"
import { useModal } from "@/hooks/use-modal-store"

interface ServerHeaderProps{
 server: Server,

}

export function ServerHeader({server} : ServerHeaderProps){

 const {onOpen, onClose} = useModal();
 const handleInvite = () => {
  onOpen('invite', {server})
 }

 const editServer = () => {
  onOpen('editServer', {server})
 
 }
 const deleteServer = () => {
  onOpen('deleteServer', { server })
 
 }

 const manageMember = () => {
  onOpen('manageMember', { server })
 }

 const createChannel = () => {
  onOpen('createChannel', { server })
 }

 return (
   <div>
     <DropdownMenu>
       <DropdownMenuTrigger className='focus:outline-none' asChild>
         <button className='w-56 text-md font-semibold px-3 flex items-center h-12 border-neutral-200'>
           {server.name}
           <ChevronDown className='h-5 w-5 ml-auto' />
         </button>
       </DropdownMenuTrigger>
       <DropdownMenuContent className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]'>
         <DropdownMenuItem onClick={handleInvite}>
           Invite members
           <UserPlus className='ml-auto h-5 w-5' />
         </DropdownMenuItem>
         <DropdownMenuItem onClick={editServer}>
           Server settings <Settings className='ml-auto h-5 w-5' />
         </DropdownMenuItem>
         <DropdownMenuItem onClick={manageMember}>
           Manage members <Users className='ml-auto h-5 w-5' />
         </DropdownMenuItem>
         <DropdownMenuItem onClick={createChannel}>
           Create Channel <PlusCircle className='ml-auto h-5 w-5' />
         </DropdownMenuItem>
         <DropdownMenuSeparator />
         <DropdownMenuItem onClick={deleteServer}>
           Delete Server <Trash className='ml-auto h-5 w-5' />
         </DropdownMenuItem>
       </DropdownMenuContent>
     </DropdownMenu>
   </div>
 )

}