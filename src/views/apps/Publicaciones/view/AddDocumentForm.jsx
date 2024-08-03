import { useState, useEffect } from 'react'

import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Dialog,
  Autocomplete,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { useSession } from 'next-auth/react'

import {
  
  obtenerperfil,
  obtenertiposDoc,
  agregarPerfilUsuario,
  eliminarPerfilUsuario,
  obtnerUsuarios
} from '@/Service/axios.services'

const AddDocumentForm = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    typeDoc: '1',
    state: '1', // Estado por defecto
    user_perfil: [], // Aquí se almacenarán temporalmente las asignaciones de usuario y perfil
    title: '',
    description: '',
    change_state: new Date().toISOString().split('T')[0] // Fecha actual
  })

  const [perfiles, setPerfiles] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [tiposDoc, setTiposDoc] = useState([])
  const [assignUserDialogOpen, setAssignUserDialogOpen] = useState(false)
  const [selectedUsuario, setSelectedUsuario] = useState(null)
  const [selectedPerfil, setSelectedPerfil] = useState(null)
  const [tempAssignments, setTempAssignments] = useState([])

  const { data: session } = useSession()
  const id = session?.user?.id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const perfilesResponse = await obtenerperfil() // Obtener perfiles desde la API
        const usuariosResponse = await obtnerUsuarios() // Obtener usuarios desde la API
        const tiposDocResponse = await obtenertiposDoc() // Obtener tipos de documento desde la API

        if (perfilesResponse.status === 201) {
          setPerfiles(perfilesResponse.data)
        } else {
          console.error('Error al obtener perfiles:', perfilesResponse.status)
        }

        if (usuariosResponse.status === 201) {
          setUsuarios(usuariosResponse.data)
          console.log(data)
        } else {
          console.error('Error al obtener usuarios:', usuariosResponse.status)
        }

        if (tiposDocResponse.status === 201) {
          setTiposDoc(tiposDocResponse.data)
        } else {
          console.error('Error al obtener tipos de documento:', tiposDocResponse.status)
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }

    fetchData()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUsuarioChange = (event, value) => {
    setSelectedUsuario(value)
  }

  const handlePerfilChange = event => {
    setSelectedPerfil(event.target.value)
  }

  const handleOpenAssignUserDialog = () => {
    setAssignUserDialogOpen(true)
  }

  const handleCloseAssignUserDialog = () => {
    setAssignUserDialogOpen(false)
    setSelectedUsuario(null)
    setSelectedPerfil(null)
  }

  const handleAddAssignment = () => {
    if (selectedUsuario && selectedPerfil) {
      setTempAssignments(prev => [...prev, { user: selectedUsuario.id, perfil: selectedPerfil }])
      handleCloseAssignUserDialog()
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (tempAssignments.length === 0) {
      alert('Debes asignar al menos un usuario con su perfil.')

      return
    }

    // Asegúrate de que el ID del usuario sea un número y no un objeto
    const dataToSend = {
      ...formData,
      usuario_creador: id,
      user_perfil: tempAssignments
    }

    try {
      const response = await enviarDocumento(dataToSend)

      if (response.status === 200) {
        alert('Documento creado con éxito')
        handleClose() // Cerrar el formulario
        setTempAssignments([]) // Limpiar asignaciones temporales
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
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3, padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Documento</InputLabel>
                <Select name='typeDoc' value={formData.typeDoc} onChange={handleChange} required>
                  {tiposDoc.map(tipo => (
                    <MenuItem key={tipo.id} value={tipo.id}>
                      {tipo.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label='Título'
                name='title'
                value={formData.title}
                onChange={handleChange}
                required
              />
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
            <Grid item xs={12} md={6}>
              <Button variant='contained' onClick={handleOpenAssignUserDialog}>
                Asignar Usuario
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <ul>
                {tempAssignments.map((assignment, index) => (
                  <li key={index}>
                    Usuario ID: {assignment.user}, Perfil ID: {assignment.perfil}
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained'>
                Agregar Documento
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>

      <Dialog open={assignUserDialogOpen} onClose={handleCloseAssignUserDialog} fullWidth maxWidth='sm'>
        <DialogTitle>Asignar Usuario y Perfil</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={usuarios}
            getOptionLabel={option => `${option.firstName} ${option.lastName}`}
            value={selectedUsuario}
            onChange={handleUsuarioChange}
            renderInput={params => <TextField {...params} label='Seleccionar Usuario' required />}
          />
          <FormControl fullWidth>
            <InputLabel>Perfiles</InputLabel>
            <Select value={selectedPerfil} onChange={handlePerfilChange} required>
              {perfiles.map(perfil => (
                <MenuItem key={perfil.id} value={perfil.id}>
                  {perfil.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignUserDialog} color='secondary'>
            Cancelar
          </Button>
          <Button onClick={handleAddAssignment} color='primary'>
            Asignar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddDocumentForm
