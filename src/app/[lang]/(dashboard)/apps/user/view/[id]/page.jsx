// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'

import VistaDetalle from '@views/apps/user/view/VistaDetalle'


const verpage = async ({ params }) => {
  // Vars
  const { id } = params

  console.log('id', id)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <VistaDetalle id={id} ></VistaDetalle>
      </Grid>
    </Grid>
  )
}

export default verpage
