'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { useParams, useRouter } from 'next/navigation'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Component Imports
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import { signOut } from 'next-auth/react' // Asegúrate de que `next-auth` esté configurado

import CustomTextField from '@core/components/mui/TextField'
import { updateUser } from '@/Service/axios.services'
import { getLocalizedUrl } from '@/utils/i18n'

const AccountDetails = ({ data }) => {
  const [formData, setFormData] = useState(data.id)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [error, setError] = useState(null)
  const router = useRouter()
  const { lang: locale } = useParams()

  useEffect(() => {
    setFormData(data.id)
  }, [data.id])

  const handleFormChange = (field, value) => {
    setFormData(prevState => ({ ...prevState, [field]: value }))
  }

  const handleFileInputChange = file => {
    const reader = new FileReader()
    const { files } = file.target

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])

      reader.onloadend = () => {
        if (reader.result !== null) {
          setFileInput(reader.result)
        }
      }
    }
  }

  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const iduser = data.id.id

    if (!iduser) {
      setError('No user ID found')

      return
    }

    // Mostrar alerta de confirmación antes de proceder
    const result = await Swal.fire({
      title: 'Confirmación',
      text: 'Para aplicar los cambios, tendrás que volver a iniciar sesión. ¿Deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'No, cancelar'
    })

    if (result.isConfirmed) {
      // Mostrar mensaje de carga
      Swal.fire({
        title: 'Actualizando...',
        text: 'Por favor espera mientras se actualizan los datos.',
        didOpen: () => {
          Swal.showLoading()
        }
      })

      try {
        const updatedData = {
          ...formData
        }

        const response = await updateUser(iduser, updatedData)

        if (response.status === 200) {
          // Esperar un breve periodo antes de redirigir para asegurarse de que el cierre de sesión se complete
          setTimeout(() => {
            Swal.fire({
              title: 'Éxito',
              text: 'Usuario Actualizado',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              signOut({ redirect: false }).then(() => {
                router.replace(getLocalizedUrl('/login', locale)) // Cambia '/login' según la ruta de tu página de inicio de sesión
              })
            })
          }, 500) // Esperar medio segundo antes de redirigir
        } else {
          if (
            response.data &&
            response.data.doc_num &&
            Array.isArray(response.data.doc_num) &&
            response.data.doc_num.length > 0
          ) {
            setError(response.data.doc_num[0])
          } else {
            setError('Error al actualizar el usuario')
          }
        }
      } catch (error) {
        console.error('Error al actualizar el usuario:', error)
        setError('Error al actualizar el usuario')
      }
    } else {
      // Si el usuario cancela, no realizar ninguna acción
      console.log('Actualización cancelada por el usuario')
    }
  }

  return (
    <Card>
      <CardContent className='mbe-4'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          {/* <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Subir Nueva Foto
                <input
                  hidden
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleFileInputReset}>
                Reestablecer
              </Button>
            </div>
            <Typography>Permitido el formato JPG o PNG. Tamaño máximo 800Kb</Typography>
          </div> */}
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Primer Apellido'
                value={formData.last_nameF}
                onChange={e => handleFormChange('last_nameF', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Segundo Apellido'
                value={formData.last_nameS || ''}
                onChange={e => handleFormChange('last_nameS', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Nombre'
                value={formData.name}
                onChange={e => handleFormChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Email'
                value={formData.email || ''}
                onChange={e => handleFormChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label={formData.type_doc_display}
                value={formData.doc_num || ''}
                onChange={e => handleFormChange('doc_num', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit'>
                Guardar Cambios
              </Button>
              {/* <Button variant='tonal' type='reset' color='secondary' onClick={() => setFormData(data.id)}>
                Reestablecer cambios anteriores
              </Button> */}
            </Grid>
          </Grid>
          {error && <Typography color='error'>{error}</Typography>}
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
