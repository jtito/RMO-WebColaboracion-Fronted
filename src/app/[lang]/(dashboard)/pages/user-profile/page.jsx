// Next Imports
import dynamic from 'next/dynamic'

import { getSession } from 'next-auth/react'

// Component Imports
import UserProfile from '@views/pages/user-profile'

const ProfileTab = dynamic(() => import('@views/pages/user-profile/profile'))
const TeamsTab = dynamic(() => import('@views/pages/user-profile/teams'))
const ProjectsTab = dynamic(() => import('@views/pages/user-profile/projects'))
const ConnectionsTab = dynamic(() => import('@views/pages/user-profile/connections'))

// Vars
const tabContentList = data => ({
  profile: <ProfileTab data={data?.users.profile} />,
  teams: <TeamsTab data={data?.users.teams} />,
  projects: <ProjectsTab data={data?.users.projects} />,
  connections: <ConnectionsTab data={data?.users.connections} />
})

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/pages/profile`)

  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL} user/usuarios/${userId}/`)


  console.log('getdata', res)

  if (!res.ok) {
    throw new Error('Failed to fetch profileData')
  }

  return res.json()
}

const ProfilePage = async () => {
  // Vars
  const data = await getData()

  // // Get the session to obtain the user ID
  // const session = await getSession()

  // console.log('getdata', res)

  // if (!session) {
  //   // Handle the case where the user is not logged in
  //   return <p>User not logged in</p>
  // }

  // const userId = session.user.id // Adjust this according to how your session stores the user ID
  // const data = await getData(userId)

  return <UserProfile data={data} tabContentList={tabContentList(data)} />
}

export default ProfilePage
