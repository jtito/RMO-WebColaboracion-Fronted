'use client'

import React, { useState } from 'react'

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
        <List>
          {filteredUsers.map(user => (
            <ListItem key={user} sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={6}>
                  <ListItemText primary={user} />
                </Grid>
                <Grid item xs={5}>
                  <FormControl variant='outlined' fullWidth>
                    <InputLabel>Tipo de Perfil</InputLabel>
                    <Select
                      value={roles[user] || ''}
                      onChange={e => handleRoleChange(user, e.target.value)}
                      label='Rol'
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
                  <IconButton edge='end' onClick={() => handleAddUser(user)}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
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
        <Button onClick={handleSubmit} color='primary'>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SelectUsers
