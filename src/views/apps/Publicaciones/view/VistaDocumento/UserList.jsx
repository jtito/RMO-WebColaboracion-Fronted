import React, { useEffect, useState } from 'react'

import {
  TextField,
  List,
  ListItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

import { toast } from 'react-toastify'

import { useSession } from 'next-auth/react'

import {
  ActualisarDocuemento,
  createPerfil,
  editarDocumentoPorId,
  eliminarPerfilUsuario,
  obtnerUsuarios,
  usuariosAsignados
} from '@/Service/axios.services'

const UserList = ({ perfiles, idDoc, typeDoc, state }) => {


  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedProfile, setSelectedProfile] = useState({})
  const [perfilIds, setPerfilIds] = useState([])
  const [asigUsuarios, setAsigUsuarios] = useState([])
  const [addedProfiles, setAddedProfiles] = useState(new Set())
  const [maxUsersToShow, setMaxUsersToShow] = useState(2)
  const [maxAsigUsuariosToShow, setMaxAsigUsuariosToShow] = useState(2)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [showMore, setShowMore] = useState(false)
  const [showForm, setShowForm] = useState(true) // Nuevo estado
  const { data: session, status } = useSession()
  const iduser = session?.user?.id.id

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await obtnerUsuarios()

        setUsers(response.data)
      } catch (error) {
        setError('Error al buscar usuarios')
        console.error('Error al buscar usuarios:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    if (perfilIds.length > 0) {
      ListarUsuariosAsignados(perfilIds)
    }
  }, [perfilIds])

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleProfileChange = userId => event => {
    setSelectedProfile(prev => ({
      ...prev,
      [userId]: event.target.value
    }))
  }

  const handleButtonClick = (userId, perfilId) => async () => {
    const data = {
      user: userId,
      perfil: perfilId
    }

    try {
      const response = await createPerfil(data)

      if (response.status === 201) {
        const newPerfilId = response.data.id

        setPerfilIds(prevIds => [...prevIds, newPerfilId])
        setAddedProfiles(prevSet => new Set(prevSet.add(userId)))

        toast('Perfil creado con éxito')
      } else {
        console.error('Error al crear perfil:', response.data)
        alert('Error al crear perfil')
      }
    } catch (error) {
      console.error('Error al crear perfil:', error)
      alert('Error al crear perfil')
    }
  }

  const ListarUsuariosAsignados = async ids => {
    const nuevosUsuariosAsignados = []

    for (const id of ids) {
      try {
        const response = await usuariosAsignados(id)

        if (response.status === 200) {
          const usuarios = Array.isArray(response.data) ? response.data : [response.data]

          for (const usuario of usuarios) {
            if (!asigUsuarios.some(u => u.id === usuario.id)) {
              nuevosUsuariosAsignados.push({
                ...usuario,
                perfilDescription:
                  perfiles.find(perfil => perfil.id === usuario.perfilId)?.description || 'Sin descripción'
              })
            }
          }
        } else {
          console.error('Error en la solicitud para ID:', id, 'Estado:', response.status)
        }
      } catch (error) {
        console.error('Error en la solicitud para ID:', id, error)
      }
    }

    setAsigUsuarios(prevUsuarios => [...prevUsuarios, ...nuevosUsuariosAsignados])
  }

  const handleDeleteUser = async () => {
    try {
      await eliminarPerfilUsuario(userToDelete)
      setAsigUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== userToDelete))
      setPerfilIds(prevIds => prevIds.filter(id => id !== userToDelete))
      setOpenConfirmDialog(false)

      alert('Usuario eliminado con éxito')
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
      alert('Error al eliminar usuario')
    }
  }

  const openDeleteConfirmDialog = perfilId => {
    setUserToDelete(perfilId)
    setOpenConfirmDialog(true)
  }

  const closeDeleteConfirmDialog = () => {
    setOpenConfirmDialog(false)
  }

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const sortedAsigUsuarios = [...asigUsuarios].sort((a, b) =>
    (a.user.name + ' ' + a.user.last_nameF + ' ' + a.user.last_nameS).localeCompare(
      b.user.name + ' ' + b.user.last_nameF + ' ' + b.user.last_nameS
    )
  )

  const handleShowMoreClick = () => {
    if (showMore) {
      setMaxAsigUsuariosToShow(2)
      setShowMore(false)
    } else {
      setMaxAsigUsuariosToShow(prev => Math.min(prev + 3, sortedAsigUsuarios.length))
      setShowMore(true)
    }
  }

  const validateData = data => {
    if (!Array.isArray(data.user_perfil)) {
      return 'user_perfil debe ser un array'
    }

    // Agrega más validaciones si es necesario
    return null
  }

  const udatehandleConfirmperfil = async () => {
    const user_perfil = asigUsuarios.map(usuario => usuario.id)

    const data = {
      user_perfil: user_perfil,
      typeDoc: typeDoc,
      state: state,
      usuario_creador: iduser
    }

    try {
      const response = await ActualisarDocuemento(idDoc, data)

      console.log(idDoc)

      if (response.status === 200) {
        toast('Documento actualizado con éxito')
        setShowForm(false) // Oculta el formulario después de la actualización
      } else {
        console.error('Error al actualizar documento:', response.data)
        alert('Error al actualizar documento')
      }
    } catch (error) {
      console.error('Error al actualizar documento:', error)
      alert('Error al actualizar documento')
    }
  }

  return (
    <div style={{ borderRadius: '4px', padding: '1rem' }}>
      {showForm && (
        <>
          <Typography variant='h6' gutterBottom>
            Usuarios
          </Typography>
          <TextField
            fullWidth
            variant='outlined'
            size='small'
            placeholder='Buscar ...'
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ marginBottom: '1rem' }}
          />
          {loading && <Typography>Cargando usuarios...</Typography>}
          {error && <Typography color='error'>{error}</Typography>}
          <List
            sx={{
              width: '100%',
              maxWidth: 500,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 400,
              '& ul': { padding: 0 }
            }}
          >
            {filteredUsers.slice(0, maxUsersToShow).map(user => (
              <ListItem key={user.id} sx={{ padding: '0.5rem 0' }}>
                <Typography style={{ marginRight: '1rem' }}>
                  {user.name} {user.last_nameF} {user.last_nameS}
                </Typography>
                <FormControl variant='outlined' size='small' sx={{ minWidth: 150, marginRight: '1rem' }}>
                  <InputLabel>Tipo de perfil</InputLabel>
                  <Select value={selectedProfile[user.id] || ''} onChange={handleProfileChange(user.id)} label='Perfil'>
                    {perfiles.map(perfil => (
                      <MenuItem key={perfil.id} value={perfil.id}>
                        {perfil.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant='outlined'
                  // color='primary'
                  // startIcon={<AddIcon />}

                  onClick={handleButtonClick(user.id, selectedProfile[user.id])}
                  disabled={!selectedProfile[user.id] || addedProfiles.has(user.id)}
                >
                  <AddIcon />
                </Button>
              </ListItem>
            ))}
          </List>
          {filteredUsers.length > maxUsersToShow && (
            <Button onClick={() => setMaxUsersToShow(prev => prev + 3)}>Mostrar más</Button>
          )}
          <Typography variant='h6' gutterBottom sx={{ marginTop: '2rem' }}>
            Usuarios asignados
          </Typography>
          <List
            sx={{
              width: '100%',
              maxWidth: 500,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 400,
              '& ul': { padding: 0 }
            }}
          >
            {sortedAsigUsuarios.slice(0, maxAsigUsuariosToShow).map(usuario => (
              <ListItem key={usuario.id} sx={{ padding: '0.5rem 0' }}>
                <Typography>
                  {usuario.user.name} {usuario.user.last_nameF} {usuario.user.last_nameS}
                </Typography>
                <Typography style={{ marginRight: '1rem' }}>{usuario.perfil.description}</Typography>
                <Button
                  variant='outlined'
                  color='error'
                  startIcon={<DeleteIcon />}
                  onClick={() => openDeleteConfirmDialog(usuario.id)}
                  sx={{ marginLeft: 'auto' }}
                >
                  Eliminar
                </Button>
              </ListItem>
            ))}
          </List>
          {sortedAsigUsuarios.length > maxAsigUsuariosToShow && (
            <Button onClick={handleShowMoreClick}>{showMore ? 'Mostrar más' : 'Mostrar menos'}</Button>
          )}
          <Divider sx={{ margin: '2rem 0' }} />
          <Button variant='contained' color='primary' onClick={udatehandleConfirmperfil}>
            Confirmar
          </Button>
        </>
      )}
      {!showForm && (
        <Typography variant='h6' gutterBottom>
          El formulario ha sido enviado correctamente.
        </Typography>
      )}
      <Dialog open={openConfirmDialog} onClose={closeDeleteConfirmDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro de que deseas eliminar este usuario asignado?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmDialog} color='primary'>
            Cancelar
          </Button>
          <Button onClick={handleDeleteUser} color='error'>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UserList
