// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'

import VistaDetalle from '@views/apps/user/view/VistaDetalle'

const verpage = async () => {
  // Vars

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <VistaDetalle></VistaDetalle>
      </Grid>
    </Grid>
  )
}

export default verpage
