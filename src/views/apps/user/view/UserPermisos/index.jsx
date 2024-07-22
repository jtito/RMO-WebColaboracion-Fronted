'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'
import { obtenerUsuarioPorId } from '@/Service/axios.services'

const UserPermisos = ({ id, tabContentList }) => {
  const [activeTab, setActiveTab] = useState('permisosRol')

  const [permisos, setPermisos] = useState([])

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  const cargarUsuario = async () => {
    try {
      const usuarioData = await obtenerUsuarioPorId(id)

      if (usuarioData && usuarioData.role && usuarioData.role.detail_permisos) {
        setPermisos(usuarioData.role.detail_permisos)
        console.log('data', usuarioData.role.detail_permisos)
      } else {
        console.warn('El usuario no tiene roles o permisos definidos.')
        setPermisos([])
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error)
    }
  }

  const handleCheckboxChange = (permiso, event) => {
    // Manejar el cambio de estado del checkbox aquí
    console.log(`Permiso cambiado: ${permiso.permission_id.description}, Checked: ${event.target.checked}`)
  }

  useEffect(() => {
    cargarUsuario()
  }, [id])

  return (
    <>
      <TabContext value={activeTab}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
              <Tab icon={<i className='tabler-lock' />} value='permisosRol' label='Permisos' iconPosition='start' />
              <Tab
                icon={<i className='tabler-bell' />}
                value='notifications'
                label='Notificaciones'
                iconPosition='start'
              />
            </CustomTabList>
          </Grid>

          <Grid item xs={12}>
            <TabPanel value={activeTab} className='p-0'>
              {tabContentList[activeTab]}
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </>
  )
}

export default UserPermisos
