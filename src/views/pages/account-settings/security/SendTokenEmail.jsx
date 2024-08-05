import React, { useEffect, useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import { useTheme } from '@emotion/react'

//SweetAlert
import Swal from 'sweetalert2'

import { CircularProgress } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

// Importar servicio
import { solicitarTokenEmail } from '@/Service/axios.services'

const SendTokenEmail = ({ open, onClose }) => {
  //Estados del Modal Envio del Token
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const theme = useTheme();

  const mostrarAlertaEnvioToken = () => {
    const titleColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000'
    const backgroundColor = theme.palette.background.paper
    const confirmButtonColor = theme.palette.primary.main

    Swal.fire({
      html: `<span style="font-family: Arial, sans-serif; font-size: 28px; color: ${titleColor};">Código enviado</span>`,
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: confirmButtonColor,
      timer: 6000,
      background: backgroundColor
    })
  }

  const mostrarAlertaCorreoInvalido = () => {
    const titleColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000'
    const backgroundColor = theme.palette.background.paper
    const confirmButtonColor = theme.palette.primary.main

    Swal.fire({
      html: `<span style="font-family: Arial, sans-serif; font-size: 20px; color: ${titleColor};">Correo inválido</span>`,
      icon: 'error',
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: confirmButtonColor,
      background: backgroundColor
    })
  }

  useEffect(() => {
    if (open) {
      setEmail('')
    }
  }, [open])

  const handleSubmit = async () => {
    setLoading(true)

    Swal.fire({
      title: 'Solicitando código...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    try {
      const response = await solicitarTokenEmail(email)

      Swal.close()

      if (response.status >= 200 && response.status < 300) {
        setLoading(false)
        onClose()
        mostrarAlertaEnvioToken()
      } else {
        setLoading(false)
        onClose()
        mostrarAlertaCorreoInvalido()
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
        {/* {message && <p style={{ color: 'green' }}>{message}</p>} */}
        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='secondary' disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color='primary' variant='contained' disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Solicitar Código'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SendTokenEmail
