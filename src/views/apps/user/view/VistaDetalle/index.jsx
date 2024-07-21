import { Grid } from "@mui/material"

import UserDetalle from './UserDetalle'



const VistaDetalle = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserDetalle />
      </Grid>

    </Grid>
  )
}

export default VistaDetalle
