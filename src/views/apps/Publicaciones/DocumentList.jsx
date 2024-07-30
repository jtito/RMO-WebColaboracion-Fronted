'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import IconButton from '@mui/material/IconButton'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Dialog,
  Fab
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

import { useSession } from 'next-auth/react'

import AddDoc from './AddDoc'
import SelectUsers from './SelectUsers'
import { obtenerDocumentos, obtenerDocumentosid, obtenerperfil } from '@/Service/axios.services'

const DocumentList = ({ type }) => {
  const [openAddDoc, setOpenAddDoc] = useState(false)
  const [openSelectUsers, setOpenSelectUsers] = useState(false)
  const [coverImage, setCoverImage] = useState(null)
  const [openImageDialog, setOpenImageDialog] = useState(false)
  const [perfil, setperfil] = useState([])
  const [docperf, setdocperf] = useState([])
  const [filteredDocs, setFilteredDocs] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const router = useRouter()

  const { data: session, status } = useSession()

  const idrol = session?.user?.id.id

  console.log('lgorol', idrol)

  const obtenerperfildoc = async () => {
    try {
      const response = await obtenerperfil()

      if (response.status === 200) {
        setperfil(response.data)
      } else {
        console.error('Error al obtener los perfiles:', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  const obtenerDocumentosperf = async idrol => {
    console.log('rolid', idrol)

    try {
      const response = await obtenerDocumentosid(idrol)

      console.log('rolid', idrol)

      if (response.status === 200) {
        setdocperf(response.data)
        console.log('documentos', response.data)
      } else {
        console.error('Error al obtener los documentos:', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  useEffect(() => {
    obtenerperfildoc()

    // obtenerDocumentosperf(idrol);
  }, [type])

  useEffect(() => {
    if (idrol) {
      obtenerDocumentosperf(idrol)
    }
  }, [idrol])

  useEffect(() => {
    const filterDocs = () => {
      let documentsArray = Array.isArray(docperf) ? docperf : [docperf]

      let filtered = []

      if (type === 'publicados') {
        filtered = documentsArray.filter(doc => doc.state.description === 'Publicado')
      } else if (type === 'borradores') {
        filtered = documentsArray.filter(doc => doc.state.description === 'Borrador')
      }

      if (startDate) {
        filtered = filtered.filter(doc => new Date(doc.updated_at) >= new Date(startDate))
      }

      if (endDate) {
        filtered = filtered.filter(doc => new Date(doc.updated_at) <= new Date(endDate))
      }

      setFilteredDocs(filtered)
    }

    filterDocs()
  }, [docperf, type, startDate, endDate])

  const handleClickOpenAddDoc = () => {
    setOpenAddDoc(true)
  }

  const handleCloseAddDoc = () => {
    setOpenAddDoc(false)
  }

  const handleNext = docData => {
    setCoverImage(docData.file)
    setOpenSelectUsers(true)
  }

  const handleCloseSelectUsers = () => {
    setOpenSelectUsers(false)
  }

  const handleConfirm = userData => {
    // Maneja los datos de usuarios, roles y permisos aquí
  }

  const handleImageClick = () => {
    setOpenImageDialog(true)
  }

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false)
  }

  const handleCardClick = id => {
    router.push(`${type}/${id}`)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Grid container spacing={8} alignItems='center'>
          <Grid item xs={12} md={8} container spacing={12}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth variant='outlined' label='Buscar' placeholder='Buscar...' />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                variant='outlined'
                type='date'
                label='Fecha de Inicio'
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                variant='outlined'
                type='date'
                label='Fecha de Fin'
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {filteredDocs.length > 0 ? (
          filteredDocs.map(documento => (
            <Card key={documento.id} sx={{ mb: 2, cursor: 'pointer' }} onClick={() => handleCardClick(documento.id)}>
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
                  <Grid item xs={12} sm={10}>
                    <Grid container alignItems='center'>
                      <Grid item xs>
                        <Typography variant='h4' component='div'>
                          {documento.title}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton>
                          <i className='tabler-trash text-[26px] text-textSecondary' />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Typography variant='body2' color='text.secondary' sx={{ maxWidth: '35vw' }}>
                      {documento.description}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='body2' color='text.secondary'>
                          Fecha de creación: {new Date(documento.create_at).toLocaleDateString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant='body2' color='text.secondary' textAlign='right'>
                          Última modificación: {new Date(documento.updated_at).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant='body2' color='text.secondary'>
                      {documento.typeDoc.description}
                    </Typography>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      {documento.state.description === 'Borrador' && (
                        <Button
                          variant='contained'
                          color='primary'
                          startIcon={<i className='bi bi-send' />}
                          sx={{ padding: '2px 10px', fontSize: '0.9rem' }}
                        >
                          Publicar
                          <IconButton>
                            <i className='tabler-send text-[22px] text-textSecondary' />
                          </IconButton>
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
              {/*<CardActions className='card-actions-dense'>
                <Button>Acción</Button>
              </CardActions>*/}
            </Card>
          ))
        ) : (
          <Typography variant='body2' color='text.secondary'>
            No se encontraron documentos.
          </Typography>
        )}
        <Fab
          color='primary'
          aria-label='add'
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          onClick={handleClickOpenAddDoc}
        >
          <AddIcon />
        </Fab>

        <AddDoc open={openAddDoc} handleClose={handleCloseAddDoc} handleNext={handleNext} />
        {/* <SelectUsers
          perfil={perfil}
          open={openSelectUsers}
          handleClose={handleCloseSelectUsers}
          handleConfirm={handleConfirm}
        /> */}
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
  )
}

export default DocumentList
