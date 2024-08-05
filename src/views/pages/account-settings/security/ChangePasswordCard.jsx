'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
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
import SendTokenEmail from './SendTokenEmail'
import ValidateToken from './ValidateToken'

import { solicitarTokenEmail, reseteoContraseña } from '@/Service/axios.services'

const ChangePasswordCard = () => {
  // Estados del componente
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isSendTokenModalOpen, setIsSendTokenModalOpen] = useState(false);
  const [isValidateTokenModalOpen, setIsValidateTokenModalOpen] = useState(false);
  const [tokenError, setTokenError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Handlers

  const handleValidateCurrentPassword = async () => {
    try {
      const storedPassword = await fetchCurrentPassword()

      if (currentPassword === storedPassword) {
        setIsValidCurrentPassword(true)
        setPasswordError('')
      } else {
        setIsValidCurrentPassword(false)
        setPasswordError('La contraseña actual es incorrecta')
      }
    } catch (error) {
      setPasswordError('Error al validar la contraseña')
    }
  }

  const handleOpenSendTokenModal  = () => setIsSendTokenModalOpen(true)
  const handleCloseSendTokenModal  = () => setIsSendTokenModalOpen(false)

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
                  1. Dar clic en Solicitar Aprobación.
                </div>
                <div className='flex items-center gap-2.5'>
                  2. Ingresar el email y solicitar el envío del código.
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
              <Button variant='contained' onClick={handleOpenSendTokenModal}>
                Solicitar Código
              </Button>
              <Button variant='contained' onClick={handleOpenValidateTokenModal}>
                Actualizar Contraseña
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Modal Component */}
      <SendTokenEmail open={isSendTokenModalOpen} onClose={handleCloseSendTokenModal} />
      <ValidateToken open={isValidateTokenModalOpen} onClose={handleCloseValidateTokenModal} />
    </>
  )
}

export default ChangePasswordCard
