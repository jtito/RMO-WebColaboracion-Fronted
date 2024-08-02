import { useState, useEffect } from 'react'

import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
  Grid,
  Dialog
} from '@mui/material'
import { useSession } from 'next-auth/react'

import { enviarDocumento, obtenerperfil } from '@/Service/axios.services'

const AddDocumentForm = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    typeDoc: '1',
    state: '1', // Estado por defecto
    user_perfil: [],
    title: '',
    description: '',
    change_state: new Date().toISOString().split('T')[0] // Fecha actual
  })

  const [perfiles, setPerfiles] = useState([])

  const { data: session } = useSession()
  const id = session?.user?.id.id

  console.log(id)

  useEffect(() => {
    const fetchPerfiles = async () => {
      try {
        const response = await obtenerperfil() // Obtener perfiles desde la API

        console.log(response)

        if (response.status === 201) {
          setPerfiles(response.data)
        } else {
          console.error('Error al obtener perfiles:', response.status)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }

    fetchPerfiles()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePerfilChange = event => {
    setFormData(prev => ({
      ...prev,
      user_perfil: event.target.value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Asegúrate de que el ID del usuario sea un número y no un objeto
    const dataToSend = {
      ...formData,
      usuario_creador: id
    }

    try {
      const response = await enviarDocumento(dataToSend)

      console.log(dataToSend)

      if (response.status === 200) {
        alert('Documento creado con éxito')
        handleClose() // Cerrar el formulario
      } else {
        console.error('Error al crear el documento:', response.status)
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error en la solicitud:', error.response.data)
      } else {
        console.error('Error en la solicitud:', error)
      }
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3, padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label='Título' name='title' value={formData.title} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Descripción'
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Fecha de Cambio'
              type='date'
              name='change_state'
              value={formData.state}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid> */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Perfiles</InputLabel>
              <Select
                multiple
                value={formData.user_perfil}
                onChange={handlePerfilChange}
                renderValue={selected => selected.join(', ')}
              >
                {perfiles.map(perfil => (
                  <MenuItem key={perfil.id} value={perfil.id}>
                    <Checkbox checked={formData.user_perfil.indexOf(perfil.id) > -1} />
                    <ListItemText primary={perfil.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained'>
              Agregar Documento
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}

export default AddDocumentForm
