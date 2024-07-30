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
  Box,
  List,
  ListItem
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { obtenerperfil, obtenertiposDoc, crearDocumento } from '@/Service/axios.services'
import SelectUsers from './SelectUsers'

const AddDoc = ({ open, handleClose, handleNext }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [selectedTypeDoc, setSelectedTypeDoc] = useState('') // Estado para el tipo de documento seleccionado
  const [tipodoc, settipodoc] = useState([])
  const [userProfiles, setUserProfiles] = useState([])
  const [perfil, setperfil] = useState([])
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)

  useEffect(() => {
    obtenerTypoDoc()
    obtenerperfildoc()
  }, [])

  const handleFileChange = event => {
    setFile(event.target.files[0])
  }

  const obtenerTypoDoc = async () => {
    try {
      const response = await obtenertiposDoc()

      if (response.status === 200) {
        settipodoc(response.data)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  const obtenerperfildoc = async () => {
    try {
      const response = await obtenerperfil()

      if (response.status === 200) {
        setperfil(response.data)
      } else {
        console.error('Error al obtener los perfiles:', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  const handleAddUserProfile = userProfile => {
    setUserProfiles(prevProfiles => [...prevProfiles, userProfile])
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!title || !description || !selectedTypeDoc || !file) {
      console.error('Por favor, complete todos los campos')

      return
    }

    const data = {
      typeDoc: selectedTypeDoc,
      state: 1, // Estado por defecto
      user_perfil: userProfiles.map(profile => profile.id),
      title,
      description,
      change_state: new Date().toISOString().split('T')[0],
      usuario_creador: 1 // Ajusta según corresponda
    }

    try {
      const response = await crearDocumento(data)

      if (response.status === 201) {
        console.log('Documento creado exitosamente:', response.data)
        handleNext(response.data)
        handleClose()
      } else {
        console.error('Error al crear el documento:', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
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
                <Select
                  value={selectedTypeDoc}
                  onChange={e => setSelectedTypeDoc(e.target.value)}
                  label='Tipo de Documento'
                >
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
          <List>
            {userProfiles.map((profile, index) => (
              <ListItem key={index}>
                {profile.name} - {profile.typeDoc}
              </ListItem>
            ))}
          </List>
          <Button variant='outlined' onClick={() => setSearchDialogOpen(true)} startIcon={<AddIcon />}>
            Asignar Perfiles
          </Button>
          <DialogActions>
            <Button onClick={handleClose} color='secondary'>
              Cancelar
            </Button>
            <Button type='submit' color='primary'>
              Guardar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>

      <SelectUsers
        perfil={perfil}
        open={searchDialogOpen}
        handleClose={() => setSearchDialogOpen(false)}
        handleConfirm={handleAddUserProfile}
      />
    </Dialog>
  )
}

export default AddDoc
