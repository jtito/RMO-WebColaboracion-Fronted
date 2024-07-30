'use client'

import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material'

import { obtenerperfil, obtenertiposDoc } from '@/Service/axios.services'

const AddDoc = ({ open, handleClose, handleNext }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [tipodoc, settipodoc] = useState([])


  const handleFileChange = event => {
    setFile(event.target.files[0])
  }


  const obtenerTypoDoc = async () => {
    try {
      const response = await obtenertiposDoc()

      console.log(response, 'respuestadoc')

      if (response.status === 200) {
        settipodoc(response.data)

        console.log('obtenidodoc')
      } else {
        console.error('Error al obtener los roles:', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  useEffect(() => {
    obtenerTypoDoc()
  }, [])

  const handleSubmit = event => {
    event.preventDefault()

    // Aquí puedes manejar el envío del formulario, subir el archivo, etc.
    handleNext({ title, description, file })
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle>Agregar Contenido</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin='dense'
            label='Título'
            type='text'
            fullWidth
            variant='outlined'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <TextField
            margin='dense'
            label='Descripción'
            type='text'
            fullWidth
            variant='outlined'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <Grid container spacing={2} alignItems='center' sx={{ mt: 2 }}>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Documento</InputLabel>
                <Select defaultValue='' label='Tipo de Documento'>
                  {tipodoc.map(tipo => (
                    <MenuItem key={tipo.id} value={tipo.id}>
                      {tipo.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Button variant='contained' component='label' fullWidth>
                Subir Documento
                <input type='file' hidden onChange={handleFileChange} />
              </Button>
            </Grid>
          </Grid>
          {file && (
            <Box sx={{ mt: 2 }}>
              <Typography variant='body2'>{file.name}</Typography>
            </Box>
          )}
          <DialogActions>
            <Button onClick={handleClose} color='secondary'>
              Cancelar
            </Button>
            <Button type='submit' color='primary'>
              Agregar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddDoc
