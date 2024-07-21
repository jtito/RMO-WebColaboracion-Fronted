

import { Grid } from "@mui/material"

import UserDetalle from './UserDetalle'





const VistaDetalle =({ id }) => {



  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserDetalle  id={id}  />
      </Grid>

    </Grid>
  )
}

export default VistaDetalle
