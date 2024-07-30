"use client";

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { 
  Button, Card, CardActions, CardContent, CardMedia, Divider, FormControl, 
  Grid, InputLabel, MenuItem, Select, TextField, Typography, Dialog
} from '@mui/material';

import AddDoc from './AddDoc';
import SelectUsers from './SelectUsers';
import { obtenerDocumentos, obtenerperfil } from '@/Service/axios.services';

const DocumentList = ({ type }) => {
  const [openAddDoc, setOpenAddDoc] = useState(false);
  const [openSelectUsers, setOpenSelectUsers] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [perfil, setperfil] = useState([]);
  const [docperf, setdocperf] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);

  const router = useRouter();

  const obtenerperfildoc = async () => {
    try {
      const response = await obtenerperfil();

      if (response.status === 200) {
        setperfil(response.data);
      } else {
        console.error('Error al obtener los perfiles:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const obtenerDocumentosperf = async () => {
    try {
      const response = await obtenerDocumentos();

      if (response.status === 200) {
        setdocperf(response.data);
      } else {
        console.error('Error al obtener los documentos:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    obtenerperfildoc();
    obtenerDocumentosperf();
  }, [type]);

  useEffect(() => {
    // Filtra los documentos según el tipo
    const filterDocs = () => {
      if (type === "publicados") {
        setFilteredDocs(docperf.filter(doc => doc.state.description === "Publicado"));
      } else if (type === "borradores") {
        setFilteredDocs(docperf.filter(doc => doc.state.description === "Borrador"));
      }
    };

    filterDocs();
  }, [docperf, type]);

  const handleClickOpenAddDoc = () => {
    setOpenAddDoc(true);
  };

  const handleCloseAddDoc = () => {
    setOpenAddDoc(false);
  };

  const handleNext = docData => {
    setCoverImage(docData.file);
    setOpenSelectUsers(true);
  };

  const handleCloseSelectUsers = () => {
    setOpenSelectUsers(false);
  };

  const handleConfirm = userData => {
    // Maneja los datos de usuarios, roles y permisos aquí
  };

  const handleImageClick = () => {
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  const handleCardClick = id => {
    router.push(`${type}/${id}`);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Grid container spacing={8} alignItems='center'>
          <Grid item xs={12} md={8} container spacing={12}>
            <Grid item xs={12} sm={8}>
              <TextField fullWidth variant='outlined' label='Buscar' placeholder='Buscar...' />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Filtro</InputLabel>
                <Select defaultValue='' label='Filtro'>
                  <MenuItem value='opcion1'>Opción 1</MenuItem>
                  <MenuItem value='opcion2'>Opción 2</MenuItem>
                  <MenuItem value='opcion3'>Opción 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {filteredDocs.length > 0 ? (
          filteredDocs.map(documento => (
            <Card
              key={documento.id}
              sx={{ mb: 2, cursor: 'pointer' }}
              onClick={() => handleCardClick(documento.id)}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <CardMedia
                      component='img'
                      image='https://via.placeholder.com/150'
                      alt='Descripción de la imagen'
                      style={{ width: '50%', height: 'auto', cursor: 'pointer' }}
                      onClick={handleImageClick}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography variant='h5' component='div'>
                      {documento.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {documento.description}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Última modificación: {new Date(documento.updated_at).toLocaleDateString()}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Estado: {documento.state.description}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions className='card-actions-dense'>
                <Button>Acción</Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant='body2' color='text.secondary'>
            No se encontraron documentos.
          </Typography>
        )}

        <AddDoc open={openAddDoc} handleClose={handleCloseAddDoc} handleNext={handleNext} />
        <SelectUsers
          perfil={perfil}
          open={openSelectUsers}
          handleClose={handleCloseSelectUsers}
          handleConfirm={handleConfirm}
        />
        <Dialog open={openImageDialog} onClose={handleCloseImageDialog}>
          <CardMedia
            component='img'
            image={coverImage}
            alt='Descripción de la imagen'
            style={{ width: '100%', height: 'auto' }}
          />
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default DocumentList;
