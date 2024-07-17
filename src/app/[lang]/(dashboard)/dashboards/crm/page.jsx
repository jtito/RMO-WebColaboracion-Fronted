'use client' // Agrega esta línea al principio del archivo si estás usando Next.js 12+

// MUI Imports
import { useState } from 'react'

import Grid from '@mui/material/Grid'

// Component Imports

// Server Action Imports
import { obtnerUsuarios } from '../../../../../Service/axios.services'

const DashboardCRM = () => {
  const [usuarios, setUsuarios] = useState([])

  const handleImprime = async () => {
    try {
      const response = await obtnerUsuarios()

      if (response.status === 200) {
        setUsuarios(response.data)
        console.log(response.data)
      } else {
        console.error('Error al obtener los usuarios:', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  return (
    <Grid container spacing={6}>
      <div>
        <button onClick={handleImprime}>Imprime</button>
        <ul>
          {usuarios.map((usuario, index) => (
            <li key={index}>{usuario.name}</li> // Ajusta según la estructura de tus datos
          ))}
        </ul>
      </div>
    </Grid>
  )
}

export default DashboardCRM
