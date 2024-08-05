'use client'

// React Imports
import { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'

import Swal from 'sweetalert2'

import { useTheme } from '@emotion/react'

// MUI Imports
import { CircularProgress } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

//Component Imports
import CustomTextField from '@core/components/mui/TextField'
import ValidateToken from './ValidateToken'

import { solicitarTokenEmail, reseteoContraseña } from '@/Service/axios.services'


const ChangePasswordCard = () => {
  // Estados del componente
  const { data: session } = useSession() // Obtener Sesión
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValidateTokenModalOpen, setIsValidateTokenModalOpen] = useState(false);
  
  const theme = useTheme();

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
      // console.log('Data de la sesion: ', session);
      // console.log('User Email: ', session.user?.email);
    }
    
  }, [session]);

  // Handlers
  const handleRequestToken = async () => {
    const titleColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000'
    const backgroundColor = theme.palette.background.paper
    const confirmButtonColor = theme.palette.primary.main

    if (!email) {
      Swal.fire({
        title: 'Error',
        text: 'No se encontró el correo electrónico del usuario.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: confirmButtonColor,
      });
      return;
    }
  
    setLoading(true);
  
    Swal.fire({
      title: 'Solicitando código...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    try {
      const response = await solicitarTokenEmail(email);
  
      Swal.close();
  
      if (response && response.status >= 200 && response.status < 300) {
        Swal.fire({
          html: `<span style="font-family: Arial, sans-serif; font-size: 28px; color: ${titleColor};">Código enviado</span>`,
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: confirmButtonColor,
          timer: 6000,
          background: backgroundColor
        });
      } else {
        Swal.fire({
          html: `<span style="font-family: Arial, sans-serif; font-size: 20px; color: ${titleColor};">Correo inválido</span>`,
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: confirmButtonColor,
        });
      }
    } catch (error) {
      console.error('Error al solicitar el token:', error); // Agregar más información del error para depuración
      Swal.close();
      Swal.fire({
        title: 'Error',
        text: 'Error al solicitar el token, por favor intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: confirmButtonColor,
      });
    } finally {
      setLoading(false);
    }
  };
  

  const handleOpenValidateTokenModal = () => setIsValidateTokenModalOpen(true)
  const handleCloseValidateTokenModal = () => setIsValidateTokenModalOpen(false)

  return (
    <>
      <Card>
        <CardHeader title='Cambiar Contraseña' titleTypographyProps={{ variant: 'h4' }} />
        <CardContent>
          <form>
            <Grid item xs={12} className='flex flex-col gap-4'>
              <Typography variant='h5'>Pasos para cambiar su contraseña:</Typography>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2.5'>
                  SOLICITAR CÓDIGO
                </div>
                <div className='flex items-center gap-2.5'>
                  1. Dar clic en Solicitar Aprobación (se enviará el código al correo registrado por el usuario).
                </div>
                <div style={{ marginTop: '20px' }} className='flex items-center gap-2.5'>
                  ACTUALIZAR CONTRASEÑA
                </div>
                <div className='flex items-center gap-2.5'>
                  1. Revisa tu correo (incluyendo la carpeta de Spam) para encontrar el código necesario para cambiar tu contraseña.
                </div>
                <div className='flex items-center gap-2.5'>
                  2. Una vez recibido el código dar clic en Cambiar Contraseña.
                </div>
                <div className='flex items-center gap-2.5'>
                  3. Ingresar los campos correspondientes más la contraseña a la que desea cambiar.
                </div>
              </div>
            </Grid>
            <Grid item xs={12} className='flex gap-4' style={{ marginTop: '20px' }}>
              <Button variant='contained' onClick={handleRequestToken} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Solicitar Código'}
              </Button>
              <Button variant='contained' onClick={handleOpenValidateTokenModal}>
                Actualizar Contraseña
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Modal Component */}
      <ValidateToken 
        open={isValidateTokenModalOpen} 
        onClose={handleCloseValidateTokenModal} 
        email={email}
      />
    </>
  )
}

export default ChangePasswordCard
