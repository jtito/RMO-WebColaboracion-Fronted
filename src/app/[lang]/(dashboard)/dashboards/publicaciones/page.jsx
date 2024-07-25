'use client' // Agrega esta línea al principio del archivo si estás usando Next.js 12+

// MUI Imports
import { useState } from 'react'

import Grid from '@mui/material/Grid'

// Component Imports

// Server Action Imports
import { obtnerUsuarios } from '../../../../../Service/axios.services'

import { Documentos } from '@views/apps/principal/Documentos'

const Publicacionepage = () => {
  return <>

    <Documentos>

    </Documentos>
  </>
}

export default Publicacionepage
