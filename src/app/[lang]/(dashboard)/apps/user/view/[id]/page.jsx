// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'

import VistaDetalle from '@views/apps/user/view/VistaDetalle'

import UserPermisos from '@views/apps/user/view/UserPermisos'

const NotificationsTab = dynamic(() => import('@views/apps/user/view/UserPermisos/notifications'))
const PermisoUsuario= dynamic(()=>import ('@views/apps/user/view/UserPermisos/permisos'))

// Vars
const tabContentList = data => ({
  notifications: <NotificationsTab />,
  permisosRol: <PermisoUsuario />
})

const getPricingData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/pages/pricing`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const verpage = async ({ params }) => {
  // Vars
  const { id } = params

  console.log('id', id)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <VistaDetalle id={id}></VistaDetalle>
      </Grid>
      <Grid item xs={12} lg={8} md={7}>
        <UserPermisos id={id} tabContentList={tabContentList(id)} />
      </Grid>
    </Grid>
  )
}

export default verpage
