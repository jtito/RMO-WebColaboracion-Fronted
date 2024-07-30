'use client'

import React, { useState } from 'react'

import dynamic from 'next/dynamic' // Importar dinámicamente para evitar el problema del lado del servidor

import { Grid, Typography, Button, Box } from '@mui/material'
import 'react-quill/dist/quill.snow.css' // Importa el estilo de Quill

// Importa el componente de Quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const VistaDocumento = () => {
  const [editorContent, setEditorContent] = useState('')

  // Maneja el cambio en el contenido del editor
  const handleEditorChange = value => {
    setEditorContent(value)
  }

  // Función para exportar el contenido como documento de Word
  // const exportToWord = () => {
  //   import('docx').then(({ Document, Packer, Paragraph, TextRun }) => {
  //     const doc = new Document({
  //       sections: [
  //         {
  //           properties: {},
  //           children: [
  //             new Paragraph({
  //               children: [
  //                 new TextRun({
  //                   text: 'Contenido del Documento',
  //                   bold: true
  //                 }),
  //                 new TextRun({
  //                   text: editorContent,
  //                   break: 1
  //                 })
  //               ]
  //             })
  //           ]
  //         }
  //       ]
  //     })

  //     Packer.toBlob(doc).then(blob => {
  //       const url = URL.createObjectURL(blob)
  //       const link = document.createElement('a')

  //       link.href = url
  //       link.download = 'documento.docx'
  //       link.click()
  //     })
  //   })
  // }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>
          Editor de Texto para Crear Documentos
        </Typography>
        <Box
          sx={{
            border: '1px solid #ddd',
            padding: 2,
            borderRadius: 1,
            minHeight: 600, // Ajusta la altura según sea necesario
            boxShadow: 1,
            backgroundColor: '#fff'
          }}
        >
          <ReactQuill value={editorContent} onChange={handleEditorChange} theme='snow' modules={editorModules} />
        </Box>
        <Button
        
          // onClick={exportToWord}

          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
        >
          Descargar como Word
        </Button>
      </Grid>
    </Grid>
  )
}

// Configuración del editor de Quill (opcional)
const editorModules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [{ align: [] }],
    ['clean'] // botón para limpiar el contenido
  ]
}

export default VistaDocumento
