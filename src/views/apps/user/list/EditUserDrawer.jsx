import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import CustomTextField from '@core/components/mui/TextField'
import { obtnerTipoDocIdentidad, ActualizarUsuario, obtenerPaises, obtenerRoles } from '../../../../Service/axios.services'

import DialogCloseButton from '@components/dialogs/DialogCloseButton'

const PrimeraLetraMayusEditar = string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const EditUserDrawer = ({ open, setOpen, handleClose, userData }) => {
  const [error, setError] = useState(null)
  const [roles, setRoles] = useState([])
  const [paises, setPaises] = useState([])
  const [Doc, setDoc] = useState([])
  const [formData, setFormData] = useState(userData)

  useEffect(() => {
    setFormData(userData)
  }, [userData])

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)

    const updatedData = {
      ...formData,
      last_nameF: PrimeraLetraMayusEditar(formData.last_nameF),
      last_nameS: PrimeraLetraMayusEditar(formData.last_nameS),
      name: PrimeraLetraMayusEditar(formData.name),
      role: formData.role.id,
    }

    console.log('Datos enviados:', updatedData)

    try {
      const response = await ActualizarUsuario(formData.id, updatedData)

      console.log('Respuesta del servidor:', response)

      if (response.status === 200) {
        toast.success('Usuario Actualizado')
        handleClose()
      } else {
        if (response.data && response.data.doc_num && Array.isArray(response.data.doc_num) && response.data.doc_num.length > 0) {
          setError(response.data.doc_num[0])
        } else {
          setError('Error al actualizar el usuario')
        }
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error)
      setError('Error al actualizar el usuario')
    }
  }

  const handleReset = () => {
    handleClose()
    setFormData(userData)
    setError(null)
  }

  const ObtenerRoles = async () => {
    try {
      const response = await obtenerRoles()

      setRoles(response.data)
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  const ObtenerCuntries = async () => {
    try {
      const response = await obtenerPaises()

      setPaises(response.data)
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  const Doctype = async () => {
    try {
      const response = await obtnerTipoDocIdentidad()
      
      setDoc(response.data)
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
        Editar Usuario
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Primer Apellido'
                placeholder='Diaz'
                value={formData.last_nameF || ''}
                onChange={e => setFormData({ ...formData, last_nameF: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label='Segundo Apellido'
                fullWidth
                placeholder='Doe'
                value={formData.last_nameS || ''}
                onChange={e => setFormData({ ...formData, last_nameS: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Nombre Completo'
                fullWidth
                placeholder='John Doe'
                value={formData.name || ''}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Email'
                fullWidth
                placeholder='johndoe@gmail.com'
                value={formData.email || ''}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                id='select-role'
                value={formData.role.id || ''}
                onChange={e => setFormData({ ...formData, role: { id: e.target.value } })}
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
                value={formData.type_doc || ''}
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
                value={formData.doc_num || ''}
                onChange={e => setFormData({ ...formData, doc_num: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                id='select-pais'
                value={formData.country || ''}
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

export default EditUserDrawer
