'use client'

// Next Imports
import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'

import VistaDetalle from '@views/apps/user/view/VistaDetalle'

import UserPermisos from '@views/apps/user/view/UserPermisos'
import { obtenerUsuarioPorId } from '@/Service/axios.services'

const NotificationsTab = dynamic(() => import('@views/apps/user/view/UserPermisos/notifications'))
const PermisoUsuario = dynamic(() => import('@views/apps/user/view/UserPermisos/permisos'))

const VerPage = ({ params }) => {
  // Vars
  const { id } = params

  console.log('id', id)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [usuario, setUsuario] = useState()

  const obtenerUsuarioid = async id => {
    console.log('userid', id)

    try {
      const response = await obtenerUsuarioPorId(id)

      console.log('userid', id)

      if (response.status === 200) {
        setUsuario(response.data)

        console.log('dat', response.data)
      } else {
        console.error('Error al obtener los usuarios:', response.status)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  useEffect(() => {
    obtenerUsuarioid(id)
  }, [id])

  // useEffect(() => {
  //   obtenerUsuarioid(id)
  // }, [id])

  const tabContentList = {
    notifications: <NotificationsTab id={id} usuario={usuario} />,
    permisosRol: <PermisoUsuario id={id} usuario={usuario} />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4} md={5}>
        <VistaDetalle usuario={usuario} id={id}></VistaDetalle>
      </Grid>
      <Grid item xs={12} lg={8} md={7}>
        <UserPermisos usuario={usuario} tabContentList={tabContentList} />
      </Grid>
    </Grid>
  )
}

export default VerPage
