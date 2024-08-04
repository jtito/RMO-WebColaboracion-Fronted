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

const ChangePasswordCard = () => {
  // States
  const [isCurrentPasswordShown, setIsCurrentPasswordShown] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [isValidCurrentPassword, setIsValidCurrentPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [isSendTokenModalOpen, setIsSendTokenModalOpen] = useState(false)
  const [isValidateTokenModalOpen, setIsValidateTokenModalOpen] = useState(false)
  
  // Handlers
  const handleClickShowCurrentPassword = () => setIsCurrentPasswordShown(!isCurrentPasswordShown)

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
        <CardHeader title='Cambiar Contraseña' />
        <CardContent>
          <form>
            <Grid item xs={12} className='flex flex-col gap-4'>
              <Typography variant='h5'>Pasos para cambiar su contraseña:</Typography>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2.5'>1. Validar su contraseña actual.</div>
                <div className='flex items-center gap-2.5'>
                  2. Digitar su email registrado en su cuenta y solicitar el envío del token.
                </div>
                <div className='flex items-center gap-2.5'>
                  3. Revisar su correo y colocar el Token para permitir cambiar a una nueva contraseña.
                </div>
              </div>
            </Grid>
            <Grid item xs={12} className='flex gap-4' style={{ marginTop: '20px' }}>
              <Typography variant='h5'>Contraseña Actual</Typography>
            </Grid>
            <Grid container className='mbs-5'>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  InputLabelProps={{
                    style: { fontSize: '1.10rem' }
                  }}
                  fullWidth
                  type={isCurrentPasswordShown ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={isCurrentPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Button variant='contained' onClick={handleValidateCurrentPassword} style={{ marginLeft: '5vw' }}>
                Validar Contraseña
              </Button>
            </Grid>
            {passwordError && <Typography color='error'>{passwordError}</Typography>}
            <Grid item xs={12} className='flex gap-4' style={{ marginTop: '20px' }}>
              <Button variant='contained' onClick={handleOpenSendTokenModal}>
                Solicitar Token
              </Button>
            </Grid>
            <Grid item xs={12} className='flex gap-4' style={{ marginTop: '20px' }}>
              <Typography variant='h5'>Inserte el token enviado aquí</Typography>
            </Grid>
            <Grid container className='mbs-5'>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  InputLabelProps={{
                    style: { fontSize: '1.10rem' }
                  }}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position='end'></InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={12} className='flex gap-4' style={{ marginTop: '20px' }}>
                <Button variant='contained' onClick={handleOpenValidateTokenModal}>
                  Verificar Token
                </Button>
              </Grid>
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
