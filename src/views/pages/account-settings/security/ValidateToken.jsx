import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CustomTextField from '@core/components/mui/TextField';
import { reseteoContraseña } from '@/Service/axios.services';
import Swal from 'sweetalert2';
import { useTheme } from '@emotion/react';

const ValidateTokenModal = ({ open, onClose, email }) => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const theme = useTheme();

  useEffect(() => {
    if (open) {
      setToken('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    }
  }, [open]);

  const handleChangePassword = async () => {
    const titleColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000';
    const backgroundColor = theme.palette.background.paper;
    const confirmButtonColor = theme.palette.primary.main;

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await reseteoContraseña(email, token, newPassword);
      onClose();
      Swal.fire({
        html: `<span style="font-family: Arial, sans-serif; font-size: 28px; color: ${titleColor};">La contraseña se ha cambiado exitosamente</span>`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        background: backgroundColor,
        confirmButtonColor: confirmButtonColor
      });
    } catch (error) {
      setError('Error al cambiar contraseña');
    }
  };

  const isFormValid = () => {
    return token && newPassword && confirmPassword && newPassword === confirmPassword;
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
          onChange={(e) => {
            setToken(e.target.value);
            setError('');
          }}
          error={!!error && !token}
          helperText={!token ? error : ''}
        />
        <CustomTextField
          InputLabelProps={{ style: { fontSize: '1rem', marginTop: '2vw' } }}
          fullWidth
          type='password'
          label='Nueva clave'
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError('');
          }}
          error={!!error && !newPassword}
          helperText={!newPassword ? error : ''}
        />
        <CustomTextField
          InputLabelProps={{ style: { fontSize: '1rem', marginTop: '2vw' } }}
          fullWidth
          type='password'
          label='Confirmar nueva clave'
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError('');
          }}
          error={!!error && !confirmPassword}
          helperText={!confirmPassword ? error : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined'>
          Cancelar
        </Button>
        <Button
          color='primary'
          variant='contained'
          onClick={handleChangePassword}
          disabled={!isFormValid()}
        >
          Actualizar clave
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ValidateTokenModal;
