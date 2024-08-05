'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import { useSession } from 'next-auth/react'

import AccountDetails from './AccountDetails'

import AccountDelete from './AccountDelete'

const Account = () => {
  const { data: session } = useSession()

  if (!session) {
    return <div>Please log in</div>
  }

  console.log('log', session.user)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AccountDetails data={session.user} />
      </Grid>
      {/* <Grid item xs={12}>
        <AccountDelete />
      </Grid> */}
    </Grid>
  )
}

export default Account
