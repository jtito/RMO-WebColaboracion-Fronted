'use client'

// Next Imports
import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import { useSession, getSession } from 'next-auth/react'

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

  if (status === 'loading') {
    return <div>Loading...</div>
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

  console.log('logd', session.user)

  return <UserProfile tabContentList={tabContentList} />
}

export default ProfilePage
