import { Button } from '@/components/ui/button'
import { ChatHeader } from '@/components/chat/chat-header'
import { db } from '@/lib/db'
import { currentProfile } from '@/lib/current-profile'
import { ChatInput } from '@/components/chat/chat-input'
import { ChatMessages } from '@/components/chat/chat-message'

const SetupPage = async ({
  params,
}: {
  params: {
    serverId: string
    channelId: string
  }
}) => {
  const profile = await currentProfile()

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
    },
  })

  const member = await db.member.findUnique({
    where: {
      id: profile.id,
      serverId: params.serverId,
    },
  })

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  })
  let arr = []
  for (let i = 0; i < 50; i++) {
    arr.push('hello world')
  }

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-screen'>
    
        <ChatHeader server={server} name={channel.name} />
      
      
        <ChatMessages
          member={member}
          apiUrl='/api/messages'
          name={channel.name}
          chatId={channel.id}
          type='channel'
          socketUrl='/api/socket/messages'
          socketQuery={{
            channelId: channel.id,
            serverId: channel.serverId,
          }}
          paramKey='channelId'
          paramValue={channel.id}
        />
     
     
        <ChatInput
          apiUrl='/api/socket/messages'
          query={{ serverId: params.serverId, channelId: params.channelId }}
          name={channel.name}
          type='channel'
        />
      
    </div>
  )
}

export default SetupPage
