import { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import { FormControlLabel } from '@mui/material'
import { useTheme } from '@emotion/react'

import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import CustomTextField from '@core/components/mui/TextField'
import { obtnerTipoDocIdentidad, AgregarUsuario, obtenerPaises, obtenerRoles } from '../../../../Service/axios.services'
import DialogCloseButton from '@components/dialogs/DialogCloseButton'

const initialData = {
  last_nameF: '',
  last_nameS: '',
  name: '',
  email: '',
  role: '',
  type_doc: '',
  doc_num: '',
  country: '',
  password:'12345678'
}

const PrimeraLetraMayusCrear = string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

const AddUserDrawer = ({ open, setOpen, handleClose, handleUserAdded, data }) => {
  const [error, setError] = useState(null)
  const [roles, setRoles] = useState([])
  const [paises, setPaises] = useState([])
  const [Doc, setDoc] = useState([])
  const [formData, setFormData] = useState(initialData)
  const [maxDocLength, setMaxDocLength] = useState(Infinity)
  const [isDocNumEnabled, setIsDocNumEnabled] = useState(false)

  const theme = useTheme()

  const mostrarAlertaUsuarioCreado = () => {
    const titleColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000'
    const backgroundColor = theme.palette.background.paper
    const confirmButtonColor = theme.palette.primary.main

    Swal.fire({
      html: `<span style="font-family: Arial, sans-serif; font-size: 28px; color: ${titleColor};">Usuario creado exitosamente</span>`,
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: confirmButtonColor,
      timer: 6000,
      background: backgroundColor
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const capitalizarData = {
      ...formData,
      last_nameF: PrimeraLetraMayusCrear(formData.last_nameF),
      last_nameS: PrimeraLetraMayusCrear(formData.last_nameS),
      name: PrimeraLetraMayusCrear(formData.name)
    }

    try {
      const response = await AgregarUsuario(capitalizarData)

      console.log('Data enviada: ', formData);

      if (response.status === 201) {
        mostrarAlertaUsuarioCreado()
        handleUserAdded(response.data)
        handleClose(response.data)
        handleReset()
      } else {
        if (response.data && response.data.doc_num) {
          setError('El Numero de Documento ya Existe', response.data.doc_num)
        } else if (response.data && response.data.email) {
          setError('Email ya se enceuntra Registrado', response.data.email)
        } else {
          setError('No se pudo Registrar')
        }
      }
    } catch (error) {
      if (error.response) {
        setError(`Error en la solicitud: ${error.response.data}`)
      } else {
        setError(`Error en la solicitud: ${error.message}`)
      }
    }
  }

  const handleReset = () => {
    handleClose()
    setFormData(initialData)
    setError(null)
  }

  const Doctype = async () => {
    try {
      const response = await obtnerTipoDocIdentidad()

      console.log(response, 'respuesta')

      if (response.status === 200) {
        setDoc(response.data)
        console.log('obtenido');
      } else {
        console.error('Error al obtener los tipos de documento:', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  const ObtenerCuntries = async () => {
    try {
      const response = await obtenerPaises()

      if (response.status === 200) {
        setPaises(response.data)
      } else {
        console.error('Error al obtener los paises:', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  const ObtenerRoles = async () => {
    try {
      const response = await obtenerRoles()

      if (response.status === 200) {
        setRoles(response.data)
      } else {
        console.error('Error al obtener los roles:', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  useEffect(() => {
    ObtenerRoles()
    ObtenerCuntries()
    Doctype()
  }, [])

  useEffect(() => {
    if (formData.country) {
      switch (formData.country) {
        case 1: // Bolivia
          setMaxDocLength(11)
          break
        case 2: // Colombia
        case 3: // Ecuador
          setMaxDocLength(10)
          break
        case 4: // Perú
          setMaxDocLength(8)
          break
        default:
          setMaxDocLength(Infinity)
      }
    }
  }, [formData.country])

  useEffect(() => {
    setIsDocNumEnabled(formData.type_doc && formData.country)
  }, [formData.type_doc, formData.country])

  const handleDocNumChange = e => {
    const newValue = e.target.value

    if (/^\d*$/.test(newValue) && newValue.length <= maxDocLength) {
      setFormData({ ...formData, doc_num: newValue })
    }
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleReset}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Agregar Usuario
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Primer Apellido'
                value={formData.last_nameF}
                onChange={e => setFormData({ ...formData, last_nameF: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label='Segundo Apellido'
                fullWidth
                value={formData.last_nameS}
                onChange={e => setFormData({ ...formData, last_nameS: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Nombre Completo'
                fullWidth
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Email'
                fullWidth
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                id='select-Doc'
                value={formData.type_doc}
                onChange={e => {
                  const selectedDoc = e.target.value

                  setFormData({ ...formData, type_doc: selectedDoc })
                }}
                label='Tipo de Documento'
              >
                {Doc.map((tipo) => (
                  <MenuItem key={tipo.id} value={tipo.id}>
                    {tipo.descripcion}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                disabled={!isDocNumEnabled}
                fullWidth
                label='Número de Documento'
                value={formData.doc_num}
                onChange={handleDocNumChange}
                inputProps={{ maxLength: maxDocLength }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                id='select-country'
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
                label='País'
              >
                {paises.map((pais) => (
                  <MenuItem key={pais.id} value={pais.id}>
                    {pais.descripcion}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                id='select-role'
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                label='Rol'
              >
                {roles.map((rol) => (
                  <MenuItem key={rol.id} value={rol.id}>
                    {rol.descripcion}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color='secondary'
            onClick={handleReset}
            variant='contained'
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            color='primary'
            variant='contained'
          >
            Crear Usuario
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddUserDrawer
