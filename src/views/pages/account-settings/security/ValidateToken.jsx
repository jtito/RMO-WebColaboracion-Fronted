// ValidateToken.jsx
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CustomTextField from '@core/components/mui/TextField';
import { reseteoContraseña } from '@/Service/axios.services';

const ValidateTokenModal = ({ open, onClose, email }) => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setToken('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    }
  }, [open]);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await reseteoContraseña(email, token, newPassword);
      onClose();
    } catch (error) {
      setError('Error al cambiar contraseña');
    }
  };

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
        Cambiar Contraseña
      </DialogTitle>
      <DialogContent>
        <CustomTextField
          InputLabelProps={{ style: { fontSize: '1rem' } }}
          fullWidth
          label='Código de confirmación'
          value={token}
          onChange={(e) => setToken(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <CustomTextField
          InputLabelProps={{ style: { fontSize: '1rem', marginTop: '2vw' } }}
          fullWidth
          type='password'
          label='Nueva clave'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <CustomTextField
          InputLabelProps={{ style: { fontSize: '1rem', marginTop: '2vw' } }}
          fullWidth
          type='password'
          label='Confirmar nueva clave'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined'>
          Cancelar
        </Button>
        <Button color='primary' variant='contained' onClick={handleChangePassword}>
          Actualizar clave
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ValidateTokenModal;
