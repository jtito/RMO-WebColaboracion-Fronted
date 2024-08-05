import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import CustomTextField from '@core/components/mui/TextField'

const ValidateTokenModal = ({ open, onClose }) => {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      maxWidth='sm'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle variant='h4' className='text-center'>
        Validar Token
      </DialogTitle>
      <DialogContent>
        <CustomTextField
          InputLabelProps={{
            style: { fontSize: '1rem' }
          }}
          fullWidth
          label='Token'
          placeholder='Ingrese el token enviado por correo'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined'>
          Cancelar
        </Button>
        <Button color='primary' variant='contained'>
          Validar Token
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ValidateTokenModal
