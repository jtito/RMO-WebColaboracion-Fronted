import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import CustomTextField from '@core/components/mui/TextField'

const SendTokenEmail = ({ open, onClose }) => {
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
				Validar Token
			</DialogTitle>
      <DialogContent>
        {/* Aquí puedes colocar tu formulario para verificar el token */}
        <CustomTextField 
					InputLabelProps={{
						style: { fontSize: '1rem' }
					}}
					fullWidth
					label='Correo Electrónico' 
					placeholder='Ingrese su correo electrónico'
				/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='secondary'>
          Cancelar
        </Button>
        <Button onClick={onClose} color='primary' variant='contained'>
          Solicitar Token
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SendTokenEmail
