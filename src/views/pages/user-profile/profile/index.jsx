'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import { useSession } from 'next-auth/react'

// Component Imports
import AboutOverview from './AboutOverview'

const ProfileTab = () => {
  const { data: session } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>Please log in</div>
  }

<<<<<<< HEAD
  console.log('log', session.user)
=======
 console .log ('log',session.user)
>>>>>>> 5fd2fa9 (Se diseño DocPublicados/Borrador)

  return (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <AboutOverview data={session.user} />
      </Grid>
      <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}></Grid>
      </Grid>
    </Grid>
  )
}

export default ProfileTab
