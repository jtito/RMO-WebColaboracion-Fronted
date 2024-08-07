'use client'

import React, { useState } from 'react'

// import dynamic from 'next/dynamic' // Importar dinámicamente para evitar el problema del lado del servidor

// import { Grid, Typography, Button, Box } from '@mui/material'
// import 'react-quill/dist/quill.snow.css' // Importa el estilo de Quill
import dynamic from 'next/dynamic'

// const CustomEditor = dynamic(() => import('./CustomEditor'), { ssr: false })

import App from './CustomEditor'

const VistaDocumento = () => {
  return <App />
}

export default VistaDocumento
