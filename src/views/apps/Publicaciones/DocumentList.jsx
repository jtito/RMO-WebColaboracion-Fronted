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
  Fab,
  CardActionArea
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './custom-datepicker.css'
import { useSession } from 'next-auth/react'
import { isWithinInterval, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

import Swal from 'sweetalert2'

import { useSnackbar } from 'notistack'

import AddDoc from './AddDoc'
import SelectUsers from './SelectUsers'
import {
  eliminarDocumentoPorId,
  obtenerDocumentos,
  obtenerDocumentosid,
  obtenerperfil,
  publicarDocumentoPorId
} from '@/Service/axios.services'

const DocumentList = ({ type }) => {
  const [openAddDoc, setOpenAddDoc] = useState(false)
  const [openSelectUsers, setOpenSelectUsers] = useState(false)
  const [coverImage, setCoverImage] = useState(null)
  const [openImageDialog, setOpenImageDialog] = useState(false)

  const [docperf, setdocperf] = useState([])
  const [filteredDocs, setFilteredDocs] = useState([])
  const [dateRangeCreate, setDateRangeCreate] = useState([null, null])
  const [dateRangeUpdate, setDateRangeUpdate] = useState([null, null])
  const [endDate, setEndDate] = useState('')

  const router = useRouter()
  const { data: session, status } = useSession()
  const iduser = session?.user?.id.id
  const { enqueueSnackbar } = useSnackbar()

  const obtenerDocumentosperf = async iduser => {
    try {
      const response = await obtenerDocumentos()

      if (response.status === 200) {
        // Asumimos que `setdocperf` es una función que guarda los documentos en el estado
        const documentos = response.data

        setdocperf(documentos)

        // Buscar el documento específico por `iduser` (ajusta esta lógica según tu estructura de datos)
        const documento = documentos.find(doc => doc.id === iduser)

        if (documento) {
          const documentoId = documento.id // Obtener el ID del documento

          console.log('ID del documento:', documentoId)

          // Puedes realizar otras operaciones con `documentoId` aquí
        } else {
          console.log('Documento no encontrado para el ID de usuario:', iduser)
        }
      } else {
        console.error('Error al obtener los documentos:', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  // useEffect(() => {
  //   obtenerperfildoc()
  // }, [type])

  useEffect(() => {
    if (iduser) {
      obtenerDocumentosperf(iduser)
    }
  }, [iduser])

  useEffect(() => {
    const filterDocs = () => {
      let documentsArray = Array.isArray(docperf) ? docperf : [docperf]
      let filtered = []

      if (type === 'publicados') {
        filtered = documentsArray.filter(doc => doc.state.description === 'Publicado')
      } else if (type === 'borradores') {
        filtered = documentsArray.filter(doc => doc.state.description === 'Borrador')
      }

      if (dateRangeCreate[0] && dateRangeCreate[1]) {
        filtered = filtered.filter(doc => {
          const documentDateCreate = parseISO(doc.create_at)

          return isWithinInterval(documentDateCreate, { start: dateRangeCreate[0], end: dateRangeCreate[1] })
        })
      }

      if (dateRangeUpdate[0] && dateRangeUpdate[1]) {
        filtered = filtered.filter(doc => {
          if (!doc.updated_at) return false
          const documentoDateUpdate = parseISO(doc.updated_at)

          return isWithinInterval(documentoDateUpdate, { start: dateRangeUpdate[0], end: dateRangeUpdate[1] })
        })
      }

      setFilteredDocs(filtered)
    }

    filterDocs()
  }, [docperf, type, dateRangeCreate, dateRangeUpdate])

  const handleClickOpenAddDoc = () => {
    setOpenAddDoc(true)
  }

  const handleCloseAddDoc = () => {
    setOpenAddDoc(false)
  }

  const handleAddDocNext = id => {
    setOpenAddDoc(false)
    handleCardClick(id)
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

  const handleDelete = async (event, documento) => {
    event.stopPropagation()

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      try {
        await eliminarDocumentoPorId(documento.id)
        setdocperf(prevDocs => prevDocs.filter(doc => doc.id !== documento.id))
        enqueueSnackbar('Documento eliminado con éxito', { variant: 'success' })
      } catch (error) {
        console.error('Error al eliminar el documento:', error)
        enqueueSnackbar('Error al eliminar el documento', { variant: 'error' })
      }
    }
  }

  const typeColors = {
    Desiciones: 'rgba(173, 216, 233, 0.5)', // Light blue with transparency
    Resoluciones: 'rgba(144, 238, 148, 0.5)', // Light green with transparency
    'Documentos Técnicos': 'rgba(211, 211, 211, 0.5)' // Light grey with transparency
  }

  const handlePublicar = async documento => {
    // Mostrar alerta de confirmación
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción publicará el documento.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, publicar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      const loadingSnack = enqueueSnackbar('Publicando...', { variant: 'info', persist: true })

      try {
        const data = { state: 2 }

        const response = await publicarDocumentoPorId(documento.id, data)

        console.log(data)

        if (response.status === 200) {
          setdocperf(prevDocs => prevDocs.map(doc => (doc.id === documento.id ? { ...doc, state: 2 } : doc)))
          enqueueSnackbar('Documento publicado con éxito', { variant: 'success' })
        } else {
          console.error('Error al publicar el documento:', response.status)
          enqueueSnackbar('Error al publicar el documento', { variant: 'error' })
        }
      } catch (error) {
        console.error('Error al publicar el documento:', error)
        enqueueSnackbar('Error al publicar el documento', { variant: 'error' })
      } finally {
        if (loadingSnack) {
          loadingSnack.dismiss()
        }
      }
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} md={2.5} style={{ paddingRight: '8px' }}>
            <TextField fullWidth variant='outlined' label='Buscar...' placeholder='Buscar...' />
          </Grid>
          <Grid item xs={12} md={2.5} style={{ paddingRight: '8px' }}>
            <DatePicker
              selected={dateRangeCreate[0]}
              onChange={dates => setDateRangeCreate(dates)}
              startDate={dateRangeCreate[0]}
              endDate={dateRangeCreate[1]}
              selectsRange
              dateFormat='dd/MM/yyyy'
              locale={es}
              placeholderText='Fecha de Creación'
              className='custom-datepicker'
              isClearable
            />
          </Grid>
          <Grid item xs={12} md={3} style={{ paddingLeft: '8px' }}>
            <DatePicker
              selected={dateRangeUpdate[0]}
              onChange={dates => setDateRangeUpdate(dates)}
              startDate={dateRangeUpdate[0]}
              endDate={dateRangeUpdate[1]}
              selectsRange
              dateFormat='dd/MM/yyyy'
              locale={es}
              placeholderText='Fecha de Actualización'
              className='custom-datepicker'
              isClearable
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {filteredDocs.length > 0 ? (
          filteredDocs.map(documento => (
            <Card
              key={documento.id}
              sx={{
                mb: 3,
                cursor: 'pointer',
                backgroundColor: typeColors[documento.typeDoc.description] || 'inherit',
                borderRadius: '8px', // Optional: For rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              <CardActionArea>
                <CardContent onClick={() => handleCardClick(documento.id)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <CardMedia
                        component='img'
                        sx={{ width: 130, height: 200, cursor: 'pointer' }}
                        image='https://via.placeholder.com/150'
                        alt='Live from space album cover'
                      />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <Grid container alignItems='center'>
                        <Grid item xs>
                          <Typography variant='h4' component='div'>
                            {documento.title}
                          </Typography>
                        </Grid>
                        <IconButton
                          onClick={event => {
                            event.stopPropagation()
                            handleDelete(event, documento)
                          }}
                        >
                          <i className='tabler-trash text-[26px] text-textSecondary' />
                        </IconButton>
                      </Grid>
                      <Typography variant='body2' color='text.secondary' sx={{ maxWidth: '35vw' }}>
                        {documento.description}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant='body2' c olor='text.secondary'>
                            Fecha de creación: {new Date(documento.create_at).toLocaleDateString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant='body2' color='text.secondary' textAlign='right'>
                            Última modificación: {new Date(documento.updated_at).toLocaleDateString()}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography
                        variant='body2'
                        color='text.secondary'

                        // sx={{ color: typeColors[documento.typeDoc.description] || 'inherit' }}
                      >
                        {documento.typeDoc.description}
                      </Typography>
                      <Grid item xs={12} sx={{ mt: 2 }}>
                        {documento.state.description === 'Borrador' && (
                          <Button
                            variant='contained'
                            startIcon={<i className='bi bi-send' />} // Usa un ícono relacionado con publicar
                            sx={{ width: 'auto', px: 2 }}
                            onClick={event => {
                              event.stopPropagation()
                              handlePublicar(documento)
                            }}
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
              </CardActionArea>

              {/* <CardActions>
                <Button size='small' color='primary' onClick={() => handleCardClick(documento.id)}>
                  Ver más
                </Button>
              </CardActions> */}
            </Card>
          ))
        ) : (
          <Typography variant='body1'>No hay documentos disponibles</Typography>
        )}
        {type === 'borradores' && (
          <Fab
            color='primary'
            aria-label='add'
            onClick={handleClickOpenAddDoc}
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16
            }}
          >
            <AddIcon />
          </Fab>
        )}

        <AddDoc open={openAddDoc} handleClose={handleCloseAddDoc} handleNext={handleAddDocNext} />

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
