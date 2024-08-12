'use client'

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

import { useSession } from 'next-auth/react';

import { Button, Grid, useTheme, Modal, Box, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import UserList from './UserList'; // Ajusta la ruta de importación según sea necesario
import { obtenerperfil, obtenertiposDoc, obtenerDocumentosid, obtenerRolesMasivo } from '@/Service/axios.services';

const CustomEditor = dynamic(() => import('./CustomEditor'), { ssr: false });

const VistaDocumento = ({ idDoc }) => {
  const [doc, setDoc] = useState();
  const [showUserList, setShowUserList] = useState(false);
  const theme = useTheme();
  const [tipodoc, settipodoc] = useState([]);
  const { data: session, status } = useSession();
  const [roles, setRoles] = useState([]);

  // const [permisos, setPermisos] = useState([]);
  const [userRolePermissions, setUserRolePermissions] = useState([]);
  const [escenarioDescription, setEscenarioDescription] = useState('');
  const [permissionsDescriptions, setPermissionsDescriptions] = useState([]);
  const [roleDescription, setRoleDescription] = useState('');
  
  // const [editorConfig, setEditorConfig] = useState({});

  const toggleUserList = () => {
    setShowUserList(!showUserList);
  };

  const obtenerTyperfil = async () => {
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

  const obtenerDocPorId = async id => {
    console.log('docID: ', id)

    try {
      const response = await obtenerDocumentosid(id);

      if (response.status === 200) {
        setDoc(response.data);
      } else {
        console.error('Error al obtener doc: ', response.status)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error)
    }
  }

  const obtenerRoles = async () => {
    try {
      const response = await obtenerRolesMasivo();

      console.log("Roles: ", response.data);

      if (response.status === 200) {
        setRoles(response.data);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  // const matchPermisosEscenarioRoles = async () => {
  //   try {
  //     const response = await obtenerPermisosPorEscenario();

  //     console.log("Data: ", response.data);

  //     if (response.status === 200) {
  //       setPermisos(response.data);
  //     }
  //   } catch (error) {
  //     console.error('Error en la solicitud:', error);
  //   }
  // }

  const filtroUsuarioRolPermisos = (userRoleId) => {
    return roles.find(role => role.id === userRoleId)?.detail_permisos || [];
  }

  // const filtrarPermisos = (permisos, userPermissions) => {
  //   return permisos.filter(permiso =>
  //     userPermissions.some(userPermiso =>
  //       permiso.escenario_id.id === userPermiso.escenario_id.id &&
  //       permiso.permission_id.id === userPermiso.permission_id.id
  //     )
  //   );
  // };

  useEffect(() => {
    obtenerTyperfil();
    obtenerRoles();

    // matchPermisosEscenarioRoles();

    if (idDoc) {
      obtenerDocPorId(idDoc)
    }
  }, [idDoc]);

  useEffect(() => {
    if (status === 'authenticated') {
      const userRoleId = session.user.role;
      const permissions = filtroUsuarioRolPermisos(userRoleId);

      console.log("datos de usuario: ", session?.user);

      setUserRolePermissions(permissions);
      console.log('Permisos del rol del usuario:', permissions);

      // console.log("permisos: ", userRolePermissions);
      // Buscar el rol del usuario en la lista de roles
      const userRole = roles.find(role => role.id === userRoleId);

      if (userRole) {
        setRoleDescription(userRole.description);
        console.log('Descripción del rol:', userRole.description);
      }
    }
  }, [status, session, roles]);

  useEffect(() => {
    if (userRolePermissions.length > 0) {
      // Obtener el id del escenario a partir de la descripción
      const escenarioId = userRolePermissions[0].escenario_id.id;

      console.log('ID del escenario:', escenarioId);

      // Filtrar permisos para ese escenario
      const filteredPermissions = userRolePermissions.filter(permission => permission.escenario_id.id === escenarioId);

      console.log('Permisos filtrados para el escenario:', filteredPermissions);

      // Extraer descripciones de permisos
      const descriptions = filteredPermissions.map(permission => permission.permission_id.description);

      console.log('Descripciones de permisos:', descriptions);
      setPermissionsDescriptions(descriptions);

      // Extraer la descripción del escenario
      const description = userRolePermissions.find(permission => permission.escenario_id.id === escenarioId)?.escenario_id.description;

      setEscenarioDescription(description);
      console.log('Descripción del escenario:', description);
    }
  }, [userRolePermissions]);

  // useEffect(() => {
  //   if (permisos.length > 0 && userRolePermissions.length > 0) {
  //     const filteredPermissions = filtrarPermisos(permisos, userRolePermissions);

  //     setUserRolePermissions(filteredPermissions);
  //   }
  // }, [permisos, userRolePermissions]);

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
          <CustomEditor 
            idDoc={idDoc}
            permissions={userRolePermissions}
            permissionsDescriptions={permissionsDescriptions}
            escenarioDescription={escenarioDescription}
            roleDescription={roleDescription}
          />
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
