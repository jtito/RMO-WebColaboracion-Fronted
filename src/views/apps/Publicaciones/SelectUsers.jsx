import React, { useState, useEffect } from 'react'

import axios from 'axios'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Checkbox
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import Swal from 'sweetalert2'

import { obtnerUsuarios } from '@/Service/axios.services'

// Método para agregar perfil de usuario
const agregarPerfilUsuario = async data => {
  return axios.post('http://127.0.0.1:8000/docs/perfil/user/', data, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

const SelectUsers = ({ open, handleClose, handleConfirm, perfiles, iduser }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [assignedUsers, setAssignedUsers] = useState([])
  const [userProfiles, setUserProfiles] = useState({})
  const [selectedUsers, setSelectedUsers] = useState(new Set())

  // Función para obtener usuarios
  const fetchUsers = async () => {
    try {
      const response = await obtnerUsuarios()

      const filteredUsers = response.data.filter(
        user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_nameF.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_nameS.toLowerCase().includes(searchTerm.toLowerCase())
      )

      setSearchResults(filteredUsers)
    } catch (error) {
      console.error('Error al buscar usuarios:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [searchTerm])

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const handlePerfilChange = (userId, event) => {
    setUserProfiles({
      ...userProfiles,
      [userId]: event.target.value
    })
  }

  const handleAddUserProfile = userId => {
    const selectedUser = searchResults.find(user => user.id === userId)

    if (selectedUser) {
      const updatedUser = {
        ...selectedUser,
        perfil: userProfiles[userId] || null
      }

      if (updatedUser.perfil) {
        setAssignedUsers(prevAssignedUsers => {
          const updatedAssignedUsers = [...prevAssignedUsers]
          const userIndex = updatedAssignedUsers.findIndex(user => user.id === userId)

          if (userIndex === -1) {
            updatedAssignedUsers.push(updatedUser)
          } else {
            updatedAssignedUsers[userIndex] = updatedUser
          }

          return updatedAssignedUsers
        })
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Seleccione un perfil para el usuario',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  }

  const handleConfirmSelection = async () => {
    try {
      const promises = Array.from(selectedUsers).map(async userId => {
        const user = assignedUsers.find(u => u.id === userId)

        if (user) {
          await agregarPerfilUsuario({
            user: user.id,
            perfil: user.perfil,
            usuario_perfil_agregado: iduser // Agregar el ID del usuario que agrega el perfil
          })
        }
      })

      await Promise.all(promises)

      Swal.fire({
        title: 'Éxito',
        text: 'Usuarios añadidos correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      handleConfirm(assignedUsers)
      handleClose()
    } catch (error) {
      console.error('Error al agregar usuarios:', error)
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al agregar los usuarios',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  const handleCheckboxChange = userId => {
    setSelectedUsers(prev => {
      const updated = new Set(prev)

      if (updated.has(userId)) {
        updated.delete(userId)
      } else {
        updated.add(userId)
      }

      return updated
    })
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle>Seleccionar Usuarios</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <TextField
            label='Buscar usuario por nombre o apellido'
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: <SearchIcon />
            }}
          />
        </FormControl>
        <List>
          {searchResults.map(user => (
            <ListItem key={user.id}>
              <ListItemText primary={`${user.name} ${user.last_nameF} ${user.last_nameS}`} />
              <FormControl fullWidth>
                <InputLabel>Perfil</InputLabel>
                <Select
                  value={userProfiles[user.id] || ''}
                  onChange={event => handlePerfilChange(user.id, event)}
                  label='Perfil'
                >
                  {perfiles.map(perfil => (
                    <MenuItem key={perfil.id} value={perfil.id}>
                      {perfil.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton edge='end' onClick={() => handleAddUserProfile(user.id)}>
                <AddIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <List>
          {assignedUsers.map(user => (
            <ListItem key={user.id}>
              <Checkbox checked={selectedUsers.has(user.id)} onChange={() => handleCheckboxChange(user.id)} />
              <ListItemText
                primary={`${user.name} ${user.last_nameF} ${user.last_nameS}`}
                secondary={`Perfil: ${perfiles.find(p => p.id === user.perfil)?.description || 'N/A'}`}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancelar
        </Button>
        <Button onClick={handleConfirmSelection} color='primary'>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SelectUsers
