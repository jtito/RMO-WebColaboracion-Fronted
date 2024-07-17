// Server Action Imports
import { Grid } from '@mui/material'

import { getServerMode } from '@core/utils/serverHelpers'

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/pages/profile`)

  if (!res.ok) {
    throw new Error('Failed to fetch profileData')
  }

  return res.json()
}

const DashboardAnalytics = async () => {
  // Vars
  const data = await getData()
  const serverMode = getServerMode()

  return (
    <Grid container spacing={6}>
      <h1>Publicaciones</h1>
    </Grid>
  )
}

export default DashboardAnalytics
