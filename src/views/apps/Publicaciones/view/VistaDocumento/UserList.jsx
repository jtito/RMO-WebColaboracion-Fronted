import React, { useEffect, useState } from 'react';

import { TextField, List, ListItem, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

import { obtnerUsuarios } from '@/Service/axios.services';


const UserList = ({ perfiles }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProfile, setSelectedProfile] = useState({});




  const fetchUsers = async () => {
    setLoading(true);
    setError(''); // Limpiar errores anteriores

    try {
      const response = await obtnerUsuarios();

      setUsers(response.data);
      console.log(response.data)
    } catch (error) {
      setError('Error al buscar usuarios');
      console.error('Error al buscar usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProfileChange = (userId) => (event) => {
    setSelectedProfile((prev) => ({
      ...prev,
      [userId]: event.target.value,
    }));
  };



  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleButtonClick = (userId) => () => {
    console.log(`Botón clickeado para el usuario con ID: ${userId}`);

    // Aquí puedes implementar la funcionalidad deseada
  };

  return (
    <div style={{ borderRadius: '4px', padding: '1rem' }}>
      <Typography variant="h6" gutterBottom>
        Usuarios
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Buscar ..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: '1rem' }}
      />
      {loading && <Typography>Cargando usuarios...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <ListItem key={user.id} sx={{ padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>
              <Typography>{user.name} {user.last_nameF} {user.last_nameS}</Typography>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Tipo de perfil</InputLabel>
                <Select
                  value={selectedProfile[user.id] || ''}
                  onChange={handleProfileChange(user.id)}
                  label='Perfil'
                >
                  {perfiles.map(perfil => (
                    <MenuItem key={perfil.id} value={perfil.id}>
                      {perfil.description}
                    </MenuItem>
                  ))}
                </Select>

              </FormControl>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleButtonClick(user.id)}
              >
                Acción
              </Button>
            </ListItem>
          ))
        ) : (
          !loading && <Typography>No se encontraron usuarios</Typography>
        )}
      </List>
    </div>
  );
};

export default UserList;
