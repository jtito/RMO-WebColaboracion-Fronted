'use client'
import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { Button, Card, CardContent, Chip, Divider, Typography } from '@mui/material'

import CustomAvatar from '@/@core/components/mui/Avatar'

import { obtenerUsuarioPorId } from '../../../../../Service/axios.services'
import AddUserDrawer from '../../list/AddUserDrawer'
import EditUserDrawer from '../../list/EditUserDrawer'

export function UserDetalle({ id, usuario }) {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(usuario)

  const actualizaUsuario = async () => {
    if (id) {
      setLoading(true)
      const response = await obtenerUsuarioPorId(id)
      
      setUserData(response.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      actualizaUsuario()
    }
  }, [id])

  if (loading || !userData) {
    return <div>Cargando...</div>
  }

  const buttonProps = (children, color, variant) => ({
    children,
    color,
    variant
  })

  return (
    <>
      <Card>
        <CardContent className='flex flex-col pbs-12 gap-6'>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-center flex-col gap-4'>
              <div className='flex flex-col items-center gap-4'>
                <CustomAvatar alt='user-profile' src='' variant='rounded' size={120} />
                <Typography variant='h5'>{userData?.name}</Typography>
              </div>
              <Chip label={userData?.role?.description} color='secondary' size='small' variant='tonal' />
            </div>
          </div>
          <div>
            <Typography variant='h5'>Detalle</Typography>
            <Divider className='mlb-4' />
            <div className='flex flex-col gap-2'>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Nombre:
                </Typography>
                <Typography>{userData?.name}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Apellido Paterno:
                </Typography>
                <Typography>{userData?.last_nameF}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Apellido Materno:
                </Typography>
                <Typography>{userData?.last_nameS}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Email:
                </Typography>
                <Typography>{userData?.email}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Estado:
                </Typography>
                <Typography>{userData?.is_active ? 'Activo' : 'Inactivo'}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Fecha de Creación:
                </Typography>
                <Typography>
                  {userData?.create_at
                    ? format(new Date(userData?.create_at), 'dd/MM/yyyy', { locale: es })
                    : 'Fecha no disponible'}
                </Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Última Actualización:
                </Typography>
                <Typography>
                  {userData?.updated_at
                    ? format(new Date(userData?.updated_at), 'dd/MM/yyyy', { locale: es })
                    : 'Fecha no disponible'}
                </Typography>
              </div>
            </div>
          </div>
          <div className='flex gap-4 justify-center'>
            <Button {...buttonProps('Editar', 'primary', 'contained')} onClick={() => setEditUserOpen(true)} />
          </div>
        </CardContent>
      </Card>

      <AddUserDrawer open={addUserOpen} setOpen={setAddUserOpen} />
      <EditUserDrawer
        open={editUserOpen}
        setOpen={setEditUserOpen}
        handleClose={() => {
          setEditUserOpen(false)
          actualizaUsuario()
        }}
        userData={userData}
      />
    </>
  )
}

export default UserDetalle
