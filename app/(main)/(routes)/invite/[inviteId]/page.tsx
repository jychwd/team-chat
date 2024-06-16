import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation"


import { db } from "@/lib/db";



export default async function InvitePage( {params} : {params:{inviteId:string}} ){

 const profile = await currentProfile();
 
 const existingserver = await db.server.findFirst({
  where:{
   inviteCode: params.inviteId,
   members:{
    some:{
     profileId: profile.id
    }
   }
  }
 });

 if(existingserver) redirect(`/servers/${existingserver.id}`);

 const server = await db.server.update({
  where:{
   inviteCode:params.inviteId,
  },
  data:{
   members:{
    create:{
     profileId: profile.id
    }
   }
  }
 });

 if(server) redirect(`/servers/${server.id}`)
 
 
 






 return 1;
}