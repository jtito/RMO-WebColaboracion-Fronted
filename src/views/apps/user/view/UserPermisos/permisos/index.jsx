'use client'

// MUI Imports
import { useEffect, useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { obtenerEscenarios, ObteneridRol, obtenerTodosLosPermisos, obtenerUsuarioPorId } from '@/Service/axios.services'

// Vars
const PermisoUsuario = ({ id, usuario }) => {
  const [permisos, setPermisos] = useState([])
  const [todosPermisos, setTodosPermisos] = useState([])
  const [escenarios, setEscenarios] = useState([])

  // Obtener el ID del rol del usuario
  const idRol = usuario?.role?.id

  const obtenerRolId = async idRol => {
    try {
      const response = await ObteneridRol(idRol)

      if (response.status === 200) {
        const { detail_permisos } = response.data

        setPermisos(Array.isArray(detail_permisos) ? detail_permisos : [])
      } else {
        console.error('Error al obtener los permisos:', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  const obtenerPermisos = async () => {
    try {
      const response = await obtenerTodosLosPermisos()

      if (response.status === 200) {
        setTodosPermisos(response.data)
      } else {
        console.error('Error al obtener los permisos', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  const obtenerTodosEscenarios = async () => {
    try {
      const response = await obtenerEscenarios()

      if (response.status === 200) {
        setEscenarios(response.data)
      } else {
        console.error('Error al obtener los escenarios', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  useEffect(() => {
    if (idRol) {
      obtenerRolId(idRol)
    }

    obtenerPermisos()

    obtenerTodosEscenarios()
  }, [idRol])

  const isPermissionActive = (permissionId, scenarioId) => {
    return permisos.some(
      rolePerm => rolePerm.permission_id.id === permissionId && rolePerm.escenario_id.id === scenarioId
    )
  }

  return (
    <Card>
      <CardHeader title='Permisos Asignados' subheader='' />
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Permisos</th>
              {escenarios.map(scenario => (
                <th key={scenario.id}>{scenario.description}</th>
              ))}
            </tr>
          </thead>
          <tbody className='border-be'>
            {todosPermisos.map((permiso, index) => (
              <tr key={index}>
                <td>
                  <Typography color='text.primary'>{permiso.description}</Typography>
                </td>
                {escenarios.map(scenario => (
                  <td key={scenario.id}>
                    <Checkbox checked={isPermissionActive(permiso.id, scenario.id)} readOnly />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <CardActions className='flex items-center gap-2'>
        <Button variant='contained' type='submit'>
          Guardar permisos
        </Button>
        <Button variant='tonal' color='secondary' type='reset'>
          Cancelar
        </Button>
      </CardActions> */}
    </Card>
  )
}

export default PermisoUsuario
