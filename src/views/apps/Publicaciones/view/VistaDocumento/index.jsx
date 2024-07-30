<<<<<<< HEAD
'use client'

import React, { useState } from 'react'

import dynamic from 'next/dynamic' // Importar dinámicamente para evitar el problema del lado del servidor

import { Grid, Typography, Button, Box } from '@mui/material'
import 'react-quill/dist/quill.snow.css' // Importa el estilo de Quill

import Ckeditored from '../Ckeditored'

const VistaDocumento = () => {

  return (
    <Ckeditored />
  )
}



=======


const VistaDocumento = () => {
  const usuario = 'some user' // Define or obtain 'usuario' as needed

  console.log('usuario', usuario)

  return <h1>Esto deve ser un editor de texto para crear documementos agregar tablas y poner texto en negrita </h1>
}

>>>>>>> 5fd2fa9 (Se diseño DocPublicados/Borrador)
export default VistaDocumento
