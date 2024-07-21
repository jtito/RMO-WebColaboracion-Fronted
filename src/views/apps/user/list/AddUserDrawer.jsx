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

import { toast } from 'react-toastify'

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
  country: ''
}

const AddUserDrawer = ({ open, setOpen, handleClose, data }) => {
  const [error, setError] = useState(null)
  const [roles, setRoles] = useState([])

  const [paises, setPaises] = useState([])
  const [Doc, setDoc] = useState([])

  const [formData, setFormData] = useState(initialData)

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await AgregarUsuario(formData)

      console.log('Data enviada:', formData)

      if (response.status === 201) {
        toast.success('Usuario Registrado')
        handleClose()
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

        console.log('obtenido')
      } else {
        console.error('Error al obtener los paises:', response.status)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  const ObtenerCuntries = async () => {
    try {
      const response = await obtenerPaises()

      console.log(response, 'respuesta')

      if (response.status === 200) {
        setPaises(response.data)

        console.log('obtenido')
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

      console.log(response, 'respuestaR')

      if (response.status === 200) {
        setRoles(response.data)

        console.log('obtenidoR')
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
                placeholder='Diaz'
                value={formData.last_nameF}
                onChange={e => setFormData({ ...formData, last_nameF: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label='Segundo Apellido'
                fullWidth
                placeholder='Doe'
                value={formData.last_nameS}
                onChange={e => setFormData({ ...formData, last_nameS: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Nombre Completo'
                fullWidth
                placeholder='John Doe'
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Email'
                fullWidth
                placeholder='johndoe@gmail.com'
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                id='select-role'
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                label='Seleccionar rol'
              >
                {roles.map(role => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.description}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                id='select-Doc'
                value={formData.type_doc}
                onChange={e => setFormData({ ...formData, type_doc: e.target.value })}
                label='Seleccionar Tipo de Documento'
              >
                {Doc.map(Doc => (
                  <MenuItem key={Doc.value} value={Doc.value}>
                    {Doc.display_name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label='Número de Documento'
                type='text'
                fullWidth
                placeholder='57456487'
                value={formData.doc_num}
                onChange={e => setFormData({ ...formData, doc_num: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                id='select-pais'
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
                label='Seleccionar Pais'
              >
                {paises.map(country => (
                  <MenuItem key={country.value} value={country.value}>
                    {country.display_name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            {error && <Typography color='error'>{error}</Typography>}
          </Grid>
        </DialogContent>

        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit'>
            Guardar
          </Button>
          <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddUserDrawer
