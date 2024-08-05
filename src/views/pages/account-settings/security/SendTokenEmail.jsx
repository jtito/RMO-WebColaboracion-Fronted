import React, { useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import CustomTextField from '@core/components/mui/TextField'

// Importar servicio
import { solicitarTokenEmail } from '@/Service/axios.services'

const SendTokenEmail = ({ open, onClose }) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    try {
      const response = await solicitarTokenEmail(email)

      if (response.status >= 200 && response.status < 300) {
        setMessage(response.data.message)
        setError('')
      } else {
        setMessage('')
        setError(`Error: ${response.statusText}`)
      }
    } catch (error) {
      setMessage('')
      setError('Error al solicitar el token, por favor intenta nuevamente.')
    }
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-5 sm:pbe-6 sm:pli-20'>
				Validar Código
			</DialogTitle>
      <DialogContent>
        <CustomTextField 
					InputLabelProps={{
						style: { fontSize: '1rem' }
					}}
					fullWidth
					label='Correo Electrónico' 
					placeholder='Ingrese su correo electrónico'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
				/>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='secondary'>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color='primary' variant='contained'>
          Solicitar Código
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SendTokenEmail
