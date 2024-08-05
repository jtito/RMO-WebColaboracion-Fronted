import React, { useState, useEffect } from 'react'

import axios from 'axios'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'

import SelectUsers from './SelectUsers'
import { crearDocumento, obtenerperfil, obtenertiposDoc, obtnerUsuarios } from '@/Service/axios.services'

const AddDoc = ({ open, handleClose, handleNext }) => {
  const { data: session } = useSession() // Obtener datos de la sesión
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTypeDoc, setSelectedTypeDoc] = useState('')
  const [tipodoc, settipodoc] = useState([])
  const [userProfiles, setUserProfiles] = useState([])
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedUsers, setSelectedUsers] = useState(new Set())
  const [error, setError] = useState('') // Estado para el mensaje de error

  const [perfiles, setPerfiles] = useState([])
  const iduser = session?.user?.id.id

  console.log(iduser)

  useEffect(() => {
    obtenerTypDoc()
    obtenerPerfilDoc()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      fetchUsers(searchTerm)
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  const fetchUsers = async term => {
    try {
      const response = await obtnerUsuarios()

      const filteredUsers = response.data.filter(user =>
        `${user.name} ${user.last_nameF} ${user.last_nameS}`.toLowerCase().includes(term.toLowerCase())
      )

      setSearchResults(filteredUsers)
    } catch (error) {
      console.error('Error al buscar usuarios:', error)
    }
  }

  const obtenerTypDoc = async () => {
    try {
      const response = await obtenertiposDoc()

      if (response.status === 200) {
        settipodoc(response.data)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  const obtenerPerfilDoc = async () => {
    try {
      const response = await obtenerperfil()

      if (response.status === 200) {
        setPerfiles(response.data)
      } else {
        console.error('Error al obtener los perfiles:', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleUserSelect = userId => {
    setSelectedUsers(prevSelected => {
      const newSelected = new Set(prevSelected)

      if (newSelected.has(userId)) {
        newSelected.delete(userId)
      } else {
        newSelected.add(userId)
      }

      return newSelected
    })
  }

  const handleAddUserProfiles = selectedUserProfiles => {
    setUserProfiles(prevProfiles => [...prevProfiles, ...selectedUserProfiles])
    setSearchDialogOpen(false)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!title || !description || !selectedTypeDoc) {
      setError('Por favor, complete todos los campos')

      return
    }

    const validUserProfiles = userProfiles.filter(profile => profile !== undefined && profile !== null)

    const data = {
      typeDoc: selectedTypeDoc,
      state: 1,
      user_perfil: validUserProfiles.map(profile => profile.id),
      title,
      description,
      usuario_creador: iduser, // Añadir userId de la sesión actual
      change_state: new Date().toISOString().split('T')[0]
    }

    console.log(iduser)

    try {
      const response = await crearDocumento(data)

      if (response.status === 201) {
        handleClose()
        handleNext()
      } else {
        setError('Error al crear el documento')
      }
    } catch (error) {
      console.error('Error al crear documento:', error)
      setError('Error al crear el documento')
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle>Agregar Documento</DialogTitle>
      <DialogContent>
        {error && <div style={{ color: 'red', marginBottom: '1em' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin='normal' label='Título' value={title} onChange={e => setTitle(e.target.value)} />
          <TextField
            fullWidth
            margin='normal'
            label='Descripción'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <FormControl fullWidth margin='normal'>
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
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12}>
              <Button variant='contained' color='primary' onClick={() => setSearchDialogOpen(true)}>
                Seleccionar Usuarios
              </Button>
            </Grid>
          </Grid>
          <List>
            {userProfiles.map((profile, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${profile.name} ${profile.last_nameF} ${profile.last_nameS}`}
                  secondary={`Perfil: ${perfiles.find(p => p.id === profile.perfil)?.description || 'N/A'}`}
                />
                <IconButton
                  edge='end'
                  onClick={() => setUserProfiles(prevProfiles => prevProfiles.filter(p => p !== profile))}
                ></IconButton>
              </ListItem>
            ))}
          </List>
          <DialogActions>
            <Button type='submit' color='primary'>
              Guardar
            </Button>
            <Button onClick={handleClose} color='secondary'>
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      <SelectUsers
        open={searchDialogOpen}
        handleClose={() => setSearchDialogOpen(false)}
        handleConfirm={handleAddUserProfiles}
        perfiles={perfiles}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        searchResults={searchResults}
        selectedUsers={selectedUsers}
        onUserSelect={handleUserSelect}
        iduser={iduser}
      />
    </Dialog>
  )
}

export default AddDoc
