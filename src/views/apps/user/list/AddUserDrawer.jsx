import { useEffect, useState } from 'react'

import { Button, Drawer, IconButton, MenuItem, Typography, Divider } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'
import { AgregarUsuario, obtenerPaises, obtenerRoles } from '../../../../Service/axios.services'

const AddUserDrawer = ({ open, handleClose, onUserAdded }) => {
  const [error, setError] = useState(null)
  const [roles, setRoles] = useState([])

  const [paises, setPaises] = useState([])

  const initialData = {
    id: null,
    role: '',
    name: '',
    last_nameF: '',
    last_nameS: '',
    tipo_doc: '',
    num_doc: '',
    Country: '',
    email: '',
    password: '',
    is_active: ''
  }

  const [formData, setFormData] = useState(initialData)

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await AgregarUsuario(formData)

      if (response.status === 201) {
        onUserAdded(response.data)
        handleClose()
        setFormData(initialData)
        setError(null)
      } else {
        setError(`Error al agregar el usuario: ${response.status} ${response.data}`)
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
  }, [])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Agregar Usuario</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField
            label='Primer Apellido'
            fullWidth
            placeholder='John'
            value={formData.last_nameF}
            onChange={e => setFormData({ ...formData, last_nameF: e.target.value })}
          />
          <CustomTextField
            label='Segundo Apellido'
            fullWidth
            placeholder='Doe'
            value={formData.last_nameS}
            onChange={e => setFormData({ ...formData, last_nameS: e.target.value })}
          />
          <CustomTextField
            label='Nombre Completo'
            fullWidth
            placeholder='John Doe'
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <CustomTextField
            label='Email'
            fullWidth
            placeholder='johndoe@gmail.com'
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <CustomTextField
            select
            fullWidth
            id='TipoDoc'
            value={formData.tipo_doc}
            onChange={e => setFormData({ ...formData, tipo_doc: e.target.value })}
            label='Seleccionar Identidad'
            options={[
              { id: 1, value: 'DNI', display_name: 'DNI' },
              { id: 2, value: 'Carnet', display_name: 'Carnet de Estranjeria' }
            ]}
          />
          <CustomTextField
            label='Número de Documento'
            type='text'
            fullWidth
            placeholder='57456487'
            value={formData.num_doc}
            onChange={e => setFormData({ ...formData, num_doc: e.target.value })}
          />
          <CustomTextField
            select
            fullWidth
            id='select-pais'
            value={formData.Country}
            onChange={e => setFormData({ ...formData, Country: e.target.value })}
            label='Seleccionar Paises'
          >
            {paises.map(Country => (
              <MenuItem key={Country.value} value={Country.value}>
                {Country.display_name}
              </MenuItem>
            ))}
          </CustomTextField>
          <CustomTextField
            select
            fullWidth
            id='select-role'
            value={formData.role}
            onChange={e => setFormData({ ...formData, rol: e.target.value })}
            label='Seleccionar roles'
          >
            {roles.map(role => (
              <MenuItem key={role.value} value={role.value}>
                {role.display_name}
              </MenuItem>
            ))}
          </CustomTextField>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={formData.is_active}
            onChange={e => setFormData({ ...formData, is_active: e.target.value })}
            label='Seleccionar Estado'
            options={[
              { id: 1, value: 'active', display_name: 'Active' },
              { id: 2, value: 'inactive', display_name: 'Inactive' }
            ]}
          />
          {error && <Typography color='error'>{error}</Typography>}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Guardar
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddUserDrawer
