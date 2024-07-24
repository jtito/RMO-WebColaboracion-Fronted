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

  const actualizaUsuario = async () => {
    if (id) {
      await obtenerUsuarioPorId(id);
      setLoading(true)
    }
  }

  console.log('useridx', id)

  if (!usuario) {
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
        {
          <CardContent className='flex flex-col pbs-12 gap-6'>
            <div className='flex flex-col gap-6'>
              <div className='flex items-center justify-center flex-col gap-4'>
                <div className='flex flex-col items-center gap-4'>
                  <CustomAvatar alt='user-profile' src='' variant='rounded' size={120} />
                  <Typography variant='h5'></Typography>
                </div>
                <Chip label={usuario?.role?.description} color='secondary' size='small' variant='tonal' />
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
                  <Typography>{usuario?.name}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5'>
                  <Typography className='font-medium' color='text.primary'>
                    Apellido Paterno:
                  </Typography>
                  <Typography>{usuario?.last_nameF}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5'>
                  <Typography className='font-medium' color='text.primary'>
                    Apellido Materno:
                  </Typography>
                  <Typography>{usuario?.last_nameS}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5'>
                  <Typography className='font-medium' color='text.primary'>
                    Email:
                  </Typography>
                  <Typography>{usuario?.email}</Typography>
                </div>
                {/* <div className='flex items-center flex-wrap gap-x-1.5'>
                  <Typography className='font-medium' color='text.primary'>
                    Rol:
                  </Typography>
                  <Typography>{usuario?.role?.description}</Typography>
                </div> */}
                <div className='flex items-center flex-wrap gap-x-1.5'>
                  <Typography className='font-medium' color='text.primary'>
                    Estado:
                  </Typography>
                  <Typography>{usuario?.is_active ? 'Activo' : 'Inactivo'}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5'>
                  <Typography className='font-medium' color='text.primary'>
                    Fecha de Creación:
                  </Typography>
                  <Typography>
                    {usuario?.create_at
                      ? format(new Date(usuario?.create_at), 'dd/MM/yyyy', { locale: es })
                      : 'Fecha no disponible'}
                  </Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5'>
                  <Typography className='font-medium' color='text.primary'>
                    Última Actualización:
                  </Typography>
                  <Typography>
                    {' '}
                    {usuario?.updated_at
                      ? format(new Date(usuario?.updated_at), 'dd/MM/yyyy', { locale: es })
                      : 'Fecha no disponible'}
                  </Typography>
                </div>
              </div>
            </div>
            <div className='flex gap-4 justify-center'>
              <Button {...buttonProps('Editar', 'primary', 'contained')} onClick={() => setEditUserOpen(true)} />
              {/* <Button {...buttonProps('Suspender', 'error', 'tonal')} /> */}
            </div>
          </CardContent>
        }
      </Card>

      <AddUserDrawer
        open={addUserOpen}
        setOpen={setAddUserOpen}
      />
      <EditUserDrawer
        open={editUserOpen}
        setOpen={setEditUserOpen}
        handleClose={() => {
          setEditUserOpen(false);
          actualizaUsuario();
        }}
        userData={usuario}
      />
    </>
  )
}

export default UserDetalle
