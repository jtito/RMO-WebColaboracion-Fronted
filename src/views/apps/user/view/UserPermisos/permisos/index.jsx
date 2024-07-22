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
import { ObteneridRol, obtenerUsuarioPorId } from '@/Service/axios.services'

// Vars
const tableData = [
  {
    Comite: false,
    Pais: true,
    Permiso: 'Editar'
  },
  {
    Comite: false,
    Pais: true,
    Permiso: 'Crear'
  },
  {
    Comite: false,
    Pais: true,
    Permiso: 'Aprobar'
  },
  {
    Comite: false,
    Pais: true,
    Permiso: 'Archivar'
  }
]

const PermisoUsuario = ({ id, usuario }) => {
  console.log('hol id', id)

  console.log('dataUsuarios', usuario)

  const [permisos, setPermisos] = useState([])

  // Obtener el ID del rol del usuario
  const idRol = usuario?.role?.id

  console.log(idRol)

  const obtenerRolId = async idRol => {
    console.log('userid', idRol)

    try {
      const response = await ObteneridRol(idRol)

      console.log('userid', idRol)

      if (response.status === 200) {
        setPermisos(response.data)

        console.log('datRol', response.data)
      } else {
        console.error('Error al obtener los usuarios:', response.status)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  useEffect(() => {
    obtenerRolId(idRol)
  }, [idRol])

  console.log('usuario', permisos?.description)

  return (
    <Card>
      <CardHeader title='Asignar permiso' subheader='Asigna permisos específicos a los usuarios' />
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Permiso</th>
              <th>Comité</th>
              <th>Pais</th>
            </tr>
          </thead>
          <tbody className='border-be'>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>
                  <Typography color='text.primary'>{data.Permiso}</Typography>
                </td>
                <td>
                  <Checkbox defaultChecked={data.Pais} />
                </td>
                <td>
                  <Checkbox defaultChecked={data.Comite} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CardActions className='flex items-center gap-2'>
        <Button variant='contained' type='submit'>
          Guardar permisos
        </Button>
        <Button variant='tonal' color='secondary' type='reset'>
          Cancelar
        </Button>
      </CardActions>
    </Card>
  )
}

export default PermisoUsuario
