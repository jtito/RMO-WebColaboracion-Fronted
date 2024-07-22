import { Grid } from '@mui/material'

import UserDetalle from './UserDetalle'

const VistaDetalle = ({ id, usuario }) => {
  console.log('usuario', usuario)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserDetalle usuario={usuario} id={id} />
      </Grid>
    </Grid>
  )
}

export default VistaDetalle
