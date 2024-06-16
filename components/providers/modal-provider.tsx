'use client'

import { useEffect, useState } from 'react'
import { CreateServerModal } from '../modals/create-server-modal'
import { CreateChannelModal } from '@/components/modals/create-channel-modal'
import { InviteModal } from '../modals/invitation-modal'
import { DeleteChannelModal } from '@/components/modals/delete-channel-modal'
import { ManageMemberModal } from '../modals/manage-member-modal'
import { EditChannelModal } from '../modals/edit-channel-modal'
import {EditServerModal} from '../modals/edit-server-modal'
import { DeleteServerModal } from '../modals/delete-server-modal'
export const ModalProvider = () => {
  const [isMounted, setMount] = useState(false)

  useEffect(() => setMount(true), [])

  if (!isMounted) return null

  return (
    <>
      <CreateServerModal />
      <CreateChannelModal />
      <InviteModal />
      <DeleteChannelModal />
      <ManageMemberModal />
      <EditChannelModal />
      <EditServerModal />
      <DeleteServerModal />
    </>
  )
}
