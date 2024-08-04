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
import TokenVerificationModal from './TokenVerificationModal'

const ChangePasswordCard = () => {
  // States
  const [isCurrentPasswordShown, setIsCurrentPasswordShown] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [isValidCurrentPassword, setIsValidCurrentPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  
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

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <>
      <Card>
        <CardHeader title='Cambiar Contraseña' />
        <CardContent>
          <form>
            <Grid item xs={12} className='flex flex-col gap-4'>
              <Typography variant='h6'>Pasos para cambiar su contraseña:</Typography>
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
            <Grid container spacing={6} className='mbs-5'>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  InputLabelProps={{
                    style: { fontSize: '1.15rem' }
                  }}
                  fullWidth
                  label='Contraseña Actual'
                  type={isCurrentPasswordShown ? 'text' : 'password'}
                  placeholder='Ingrese su contraseña actual'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
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
            </Grid>
            {passwordError && <Typography color='error'>{passwordError}</Typography>}
            <Grid item xs={12} className='flex gap-4' style={{ marginTop: '20px' }}>
              <Button variant='contained' onClick={handleValidateCurrentPassword}>Validar Contraseña</Button>
              <Button variant='contained' onClick={handleOpenModal}>Verificar Token</Button>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Modal Component */}
      <TokenVerificationModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

export default ChangePasswordCard
