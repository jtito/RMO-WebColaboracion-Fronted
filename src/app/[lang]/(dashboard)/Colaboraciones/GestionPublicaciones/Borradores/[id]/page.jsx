import { Grid } from '@mui/material'

import VistaDocumento from '../../../../../../../views/apps/Publicaciones/view/VistaDocumento'

const editpage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <VistaDocumento></VistaDocumento>
      </Grid>
    </Grid>
  )
}

export default editpage
