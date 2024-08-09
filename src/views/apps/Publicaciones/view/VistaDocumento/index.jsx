'use client'

import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { Button, Grid, useTheme, Modal, Box, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import UserList from './UserList'; // Ajusta la ruta de importación según sea necesario
import { obtenerperfil, obtenertiposDoc } from '@/Service/axios.services';

const CustomEditor = dynamic(() => import('./CustomEditor'), { ssr: false });

const VistaDocumento = () => {
  const [showUserList, setShowUserList] = useState(false);
  const theme = useTheme();
  const [tipodoc, settipodoc] = useState([])

  const toggleUserList = () => {
    setShowUserList(!showUserList);
  };

  useEffect(() => {
    obtenerTypDoc()
  }, [])

  const obtenerTypDoc = async () => {
    try {
      const response = await obtenerperfil()

      console.log(response.data)

      if (response.status === 200) {
        settipodoc(response.data)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  return (
    <Grid container sx={{ paddingTop: 1, backgroundColor: theme.palette.background.default }}>
      <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={toggleUserList}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            marginBottom: '1rem',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          {showUserList ? 'Ocultar Usuarios' : 'Invitar Usuarios'}
        </Button>
      </Grid>

      <Grid>
        <div
          style={{
            flex: '3',
            backgroundColor: theme.palette.background.paper,
            padding: '1rem',
            borderRadius: '1px',
          }}
        >
          <CustomEditor />
        </div>
      </Grid>

      {/* Modal for UserList */}
      <Modal
        open={showUserList}
        onClose={toggleUserList}
        aria-labelledby="user-list-modal"
        aria-describedby="user-list-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            border: '1px solid #ccc',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
            position: 'relative', // Añadido para posicionar el ícono de cierre
          }}
        >
          <IconButton
            onClick={toggleUserList}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <UserList perfiles={tipodoc} />
         
        </Box>
      </Modal>
    </Grid>
  );
};

export default VistaDocumento;
