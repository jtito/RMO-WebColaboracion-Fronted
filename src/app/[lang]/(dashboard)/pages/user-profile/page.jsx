'use client'

// Next Imports
import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import { getSession } from 'next-auth/react'

// Component Imports
import UserProfile from '@views/pages/user-profile'

const ProfileTab = dynamic(() => import('@views/pages/user-profile/profile'))
const TeamsTab = dynamic(() => import('@views/pages/user-profile/teams'))
const ProjectsTab = dynamic(() => import('@views/pages/user-profile/projects'))
const ConnectionsTab = dynamic(() => import('@views/pages/user-profile/connections'))

const ProfilePage = () => {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (session) {
      // Here you can fetch additional user data if necessary
      setUserData(session.user) // or fetch from an API
    }
  }, [session])

  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL} user/usuarios/${userId}/`)


  console.log('getdata', res)

  if (!res.ok) {
    throw new Error('Failed to fetch profileData')
  }

  if (!session) {
    return <div>Please log in</div>
  }

  const tabContentList = {
    profile: <ProfileTab data={userData} />,
    teams: <TeamsTab data={userData?.teams} />,
    projects: <ProjectsTab data={userData?.projects} />,
    connections: <ConnectionsTab data={userData?.connections} />
  }

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
