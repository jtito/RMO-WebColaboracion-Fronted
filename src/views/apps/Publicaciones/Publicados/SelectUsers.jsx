'use client'

<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
=======
import React, { useState } from 'react'
>>>>>>> 5fd2fa9 (Se diseño DocPublicados/Borrador)

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemText,
<<<<<<< HEAD
  Grid,
  IconButton
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import Swal from 'sweetalert2'

import {
  obtnerUsuarios,
  agregarPerfilUsuario,
  obtenerUsuariosAsignados,
  eliminarPerfilUsuario
} from '@/Service/axios.services'

const SelectUsers = ({ perfil, open, handleClose, handleConfirm }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [userProfiles, setUserProfiles] = useState({})
  const [assignedUsers, setAssignedUsers] = useState([])

  useEffect(() => {
    if (open) {
      const fetchAssignedUsers = async () => {
        try {
          const response = await obtenerUsuariosAsignados()

          if (response.status === 200) {
            setAssignedUsers(response.data)
          } else {
            console.error('Error al obtener usuarios asignados:', response.status)
          }
        } catch (error) {
          console.error('Error al obtener usuarios asignados:', error)
        }
      }

      fetchAssignedUsers()
    }
  }, [open])

  const handleSearchChange = event => setSearchTerm(event.target.value)

  const handleSearch = async () => {
    try {
      const response = await obtnerUsuarios()

      if (response.status === 200) {
        const filteredResults = response.data.filter(
          user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.last_nameF.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.last_nameS.toLowerCase().includes(searchTerm.toLowerCase())
        )

        setSearchResults(filteredResults)

        const initialProfiles = filteredResults.reduce((acc, user) => {
          acc[user.id] = ''

          return acc
        }, {})

        setUserProfiles(initialProfiles)
      } else {
        console.error('Error al obtener los usuarios:', response.status)
      }
    } catch (error) {
      console.error('Error al buscar usuarios:', error)
    }
  }

  const handlePerfilChange = (userId, event) => {
    setUserProfiles(prevProfiles => ({
      ...prevProfiles,
      [userId]: event.target.value
    }))
  }

  const handleAddUserProfile = async userId => {
    if (userId && userProfiles[userId]) {
      try {
        const response = await agregarPerfilUsuario({
          user: userId,
          perfil: userProfiles[userId]
        })

        if (response.status === 201) {
          // Asegúrate de que `response.data` tenga la estructura adecuada
          const newUserProfile = response.data

          // Actualiza la lista de usuarios asignados en el estado
          setAssignedUsers(prevAssignedUsers => {
            // Verifica si el usuario ya está en la lista
            const userExists = prevAssignedUsers.some(user => user.id === newUserProfile.id)

            if (!userExists) {
              return [...prevAssignedUsers, newUserProfile]
            }

            return prevAssignedUsers
          })

          Swal.fire({
            title: 'Éxito',
            text: 'Usuario agregado correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          })

          // Actualiza los resultados de búsqueda después de agregar el usuario
          handleSearch()
        } else {
          console.error('Error al agregar usuario:', response.status)
        }
      } catch (error) {
        console.error('Error al agregar usuario:', error)
      }
    }
  }

  const handleRemoveUserProfile = async userId => {
    try {
      const response = await eliminarPerfilUsuario(userId)

      if (response.status === 204) {
        setAssignedUsers(prevAssignedUsers => prevAssignedUsers.filter(user => user.id !== userId))
        Swal.fire({
          title: 'Éxito',
          text: 'Usuario eliminado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      } else {
        console.error('Error al eliminar usuario:', response.status)
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
    }
  }

  const handleConfirmChanges = () => {
    handleConfirm(assignedUsers.map(user => user.id))
    console.log(
      'log',
      assignedUsers.map(user => user.id)
    )
    handleClose()
  }

  useEffect(() => {
    console.log('Usuarios asignados actualizados:', assignedUsers)
  }, [assignedUsers])
=======
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Grid
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

const SelectUsers = ({ perfil, open, handleClose, handleConfirm }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState(['Usuario 1', 'Usuario 2', 'Usuario 3']) // Reemplaza estos valores con la lista real de usuarios
  const [selectedUsers, setSelectedUsers] = useState([])
  const [roles, setRoles] = useState({})

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleRoleChange = (user, role) => {
    setRoles(prev => ({
      ...prev,
      [user]: role
    }))
  }

  const handleAddUser = user => {
    if (!selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  const handleRemoveUser = user => {
    setSelectedUsers(selectedUsers.filter(u => u !== user))
    setRoles(prev => {
      const updatedRoles = { ...prev }

      delete updatedRoles[user]

      return updatedRoles
    })
  }

  const handleSubmit = () => {
    handleConfirm(selectedUsers.map(user => ({ user, role: roles[user] })))
    handleClose()
  }

  const filteredUsers = users.filter(user => user.toLowerCase().includes(searchTerm.toLowerCase()))
>>>>>>> 5fd2fa9 (Se diseño DocPublicados/Borrador)

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle>Seleccionar Usuarios y Permisos</DialogTitle>
      <DialogContent>
        <TextField
          label='Buscar Usuario'
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          margin='dense'
          variant='outlined'
          sx={{ mb: 2 }}
        />
<<<<<<< HEAD
        <Button onClick={handleSearch}>Buscar</Button>
        <List>
          {searchResults.map(user => (
            <ListItem key={user.id} button onClick={() => setSelectedUser(user)}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={6}>
                  <ListItemText primary={`${user.name} ${user.last_nameF} ${user.last_nameS}`} />
=======
        <List>
          {filteredUsers.map(user => (
            <ListItem key={user} sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={6}>
                  <ListItemText primary={user} />
>>>>>>> 5fd2fa9 (Se diseño DocPublicados/Borrador)
                </Grid>
                <Grid item xs={5}>
                  <FormControl variant='outlined' fullWidth>
                    <InputLabel>Tipo de Perfil</InputLabel>
                    <Select
<<<<<<< HEAD
                      label='Tipo de perfil'
                      value={userProfiles[user.id] || ''}
                      onChange={event => handlePerfilChange(user.id, event)}
=======
                      value={roles[user] || ''}
                      onChange={e => handleRoleChange(user, e.target.value)}
                      label='Rol'
>>>>>>> 5fd2fa9 (Se diseño DocPublicados/Borrador)
                    >
                      {perfil.map(tipo => (
                        <MenuItem key={tipo.id} value={tipo.id}>
                          {tipo.description}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
<<<<<<< HEAD
                  <IconButton onClick={() => handleAddUserProfile(user.id)}>
=======
                  <IconButton edge='end' onClick={() => handleAddUser(user)}>
>>>>>>> 5fd2fa9 (Se diseño DocPublicados/Borrador)
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
<<<<<<< HEAD
        <DialogTitle>Usuarios Asignados</DialogTitle>
        <List>
          {assignedUsers.map(user => (
            <ListItem key={user.id}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={8}>
                  <ListItemText primary={`${user.user.name} ${user.user.last_nameF} ${user.user.last_nameS}`} />
                </Grid>
                <Grid item xs={4} textAlign='right'>
                  <IconButton color='error' onClick={() => handleRemoveUserProfile(user.id)}>
=======
        <Typography variant='h6' gutterBottom>
          Usuarios Seleccionados
        </Typography>
        <List>
          {selectedUsers.map(user => (
            <ListItem key={user} sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={6}>
                  <ListItemText primary={user} />
                </Grid>
                <Grid item xs={5}>
                  <FormControl variant='outlined' fullWidth>
                    <InputLabel>Rol</InputLabel>
                    <Select
                      value={roles[user] || ''}
                      onChange={e => handleRoleChange(user, e.target.value)}
                      label='Rol'
                    >
                      <MenuItem value=''>
                        <em>Seleccionar Rol</em>
                      </MenuItem>
                      {/* Reemplaza estos valores con la lista real de roles */}
                      <MenuItem value='Rol 1'>Rol 1</MenuItem>
                      <MenuItem value='Rol 2'>Rol 2</MenuItem>
                      <MenuItem value='Rol 3'>Rol 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <IconButton edge='end' onClick={() => handleRemoveUser(user)}>
>>>>>>> 5fd2fa9 (Se diseño DocPublicados/Borrador)
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancelar
        </Button>
<<<<<<< HEAD
        <Button onClick={handleConfirmChanges} color='primary'>
=======
        <Button onClick={handleSubmit} color='primary'>
>>>>>>> 5fd2fa9 (Se diseño DocPublicados/Borrador)
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SelectUsers
