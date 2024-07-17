// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports


// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const getData = async () => {
  const res = await fetch(`${process.env.API_URL}/apps/invoice`)

  if (!res.ok) {
    throw new Error('Failed to fetch invoice data')
  }

  return res.json()
}

const DashboardECommerce = async () => {
  // Vars
  const invoiceData = await getData()
  const serverMode = getServerMode()

  return (
    <Grid container spacing={6}>
      <h1>Hola Mundo</h1>
      
    </Grid>
  )
}

export default DashboardECommerce
