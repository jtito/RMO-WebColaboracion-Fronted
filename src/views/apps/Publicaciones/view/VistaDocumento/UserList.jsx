import React, { useEffect, useState } from 'react';


import {
  TextField, List, ListItem, Typography, FormControl, InputLabel, Select, MenuItem, Button, Divider, Grid
} from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';


import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { createPerfil, obtnerUsuarios, usuariosAsignados } from '@/Service/axios.services';


const UserList = ({ perfiles }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProfile, setSelectedProfile] = useState({});
  const [perfilIds, setPerfilIds] = useState([]);
  const [asigUsuarios, setAsigUsuarios] = useState([]);
  const [addedProfiles, setAddedProfiles] = useState(new Set());
  const [maxUsersToShow, setMaxUsersToShow] = useState(3);
  const [maxAsigUsuariosToShow, setMaxAsigUsuariosToShow] = useState(2);


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





  const handleButtonClick = (userId, perfilId) => async () => {

    console.log(`Datos enviados: userId=${userId}, perfilId=${perfilId}`);

    // const data = (userId, perfilId)
    const data = {
      user: userId,
      perfil: perfilId

    }

    console.log(data)

    try {

      const response = await createPerfil(data);

      console.log(data);

      if (response.status === 201) {

        const newPerfilId = response.data.id;

        console.log('Perfil creado con éxito:', response.data);

        setPerfilIds(prevIds => [...prevIds, newPerfilId]);
        setAddedProfiles(prevSet => new Set(prevSet.add(userId)));

        console.log('IDs guardados:', perfilIds);

        alert('Perfil creado con éxito');
      } else {
        console.error('Error al crear perfil:', response.data);
        alert('Error al crear perfil');
      }
    } catch (error) {
      console.error('Error al crear perfil:', error);
      alert('Error al crear perfil');
    }
  };

  console.log(perfilIds)



  const ListarUsuariosAsignados = async (ids) => {
    const nuevosUsuariosAsignados = [];

    for (const id of ids) {
      try {
        const response = await usuariosAsignados(id);

        if (response.status === 200) {
          // Verifica si response.data es un array
          const usuarios = Array.isArray(response.data) ? response.data : [response.data];

          // Agrega usuarios al array si no están ya presentes
          for (const usuario of usuarios) {
            if (!asigUsuarios.some(u => u.id === usuario.id)) {
              nuevosUsuariosAsignados.push({
                ...usuario,
                perfilDescription: perfiles.find(perfil => perfil.id === usuario.perfilId)?.description || 'Sin descripción'
              });
            }
          }

          console.log('Usuarios asignados para perfil ID:', id, usuarios);

        } else {
          console.error('Error en la solicitud para ID:', id, 'Estado:', response.status);
        }
      } catch (error) {
        console.error('Error en la solicitud para ID:', id, error);
      }
    }

    setAsigUsuarios(prevUsuarios => [...prevUsuarios, ...nuevosUsuariosAsignados]);

    console.log(setAsigUsuarios);
  };

  useEffect(() => {
    if (perfilIds.length > 0) {
      ListarUsuariosAsignados(perfilIds);
    }
  }, [perfilIds]);


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
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        <ListSubheader>Usuarios Filtrados</ListSubheader>
        {filteredUsers.slice(0, maxUsersToShow).map(user => (
          <ListItem key={user.id} sx={{ padding: '0.5rem 0' }}>
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
              variant="outlined"
              color="primary"
              onClick={handleButtonClick(user.id, selectedProfile[user.id])}
              disabled={addedProfiles.has(user.id)}
            >
              <AddIcon />
            </Button>
          </ListItem>
        ))}
        {filteredUsers.length > maxUsersToShow && (
          <ListItem>
            <Button
              variant="outlined"
              onClick={() => setMaxUsersToShow(prev => prev + 5)}
            >
              Mostrar más
            </Button>
          </ListItem>
        )}
      </List>
      <Divider />
      {/* <Typography variant="h6" gutterBottom>
        Usuarios Asignados
      </Typography> */}
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        <ListSubheader>Usuarios Asignados</ListSubheader>
        {asigUsuarios.slice(0, maxUsersToShow).map(usuario => (
          <ListItem disablePadding key={usuario.id} sx={{ padding: '0.5rem 0' }}>
            <Typography>{usuario.user.name} {usuario.user.last_nameF} {usuario.user.last_nameS}</Typography>
            <Typography>{usuario.perfil.description}</Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={() => console.log(`Eliminar usuario con ID: ${usuario.id}`)}
            >
              <DeleteIcon style={{ color: "#ff0000" }} />
            </Button>
          </ListItem>
        ))}
        {asigUsuarios.length > maxUsersToShow && (
          <ListItem>
            <Button

              // variant="outlined"

              onClick={() => setMaxUsersToShow(prev => prev + 5)}
            >
              Mostrar más
            </Button>
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default UserList;
