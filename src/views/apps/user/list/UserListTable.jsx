'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { IconButton } from '@mui/material'

import { toast } from 'react-toastify'

import OptionMenu from '@core/components/option-menu'

// Nuevas importaciones
import AddUserDrawer from './AddUserDrawer'

// Server Action Imports
import { EliminarUsuario, obtnerUsuarios } from '../../../../Service/axios.services'

import { getLocalizedUrl } from '@/utils/i18n'

const UserListTable = () => {
  const [usuarios, setUsuarios] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [addUserOpen, setAddUserOpen] = useState(false)

  const { lang: locale } = useParams()

  const obtenerUsuarios = async () => {
    try {
      const response = await obtnerUsuarios()

      if (response.status === 200) {
        setUsuarios(response.data)
        setIsLoading(false)
        console.log(response.data)
      } else {
        console.error('Error al obtener los usuarios:', response.status)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  const handleUserAdded = newUser => {
    setUsuarios(prevUsuarios => [...prevUsuarios, newUser])
  }

  const deleteProduct = async id => {
    if (id != null) {
      try {
        await EliminarUsuario(id)
        toast.success('Usuario eliminado exitosamente')
        setIsLoading(true)
      } catch (err) {
        console.log(err.message)
        toast.error('No se pudo eliminar el usuario')
      }
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            color='secondary'
            variant='tonal'
            startIcon={<i className='tabler-upload' />}
            className='is-full sm:is-auto'
          >
            Export
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            
            // onClick={() => setAddUserOpen(!addUserOpen)

            onClick={() => {
              setAddUserOpen(true)
            }}
            color='primary'
            className='is-full sm:is-auto'
          >
            Agregar Usuario
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido Paterno</TableCell>
                  <TableCell>Apellido Materno</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Numero de Documento</TableCell>
                  <TableCell>Pais</TableCell>
                  <TableCell>Fecha de Creación</TableCell>
                  <TableCell>Última Actualización</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={10} align='center'>
                      Cargando usuarios...
                    </TableCell>
                  </TableRow>
                ) : usuarios.length > 0 ? (
                  usuarios.map(usuario => (
                    <TableRow key={usuario.id}>
                      {/* <TableCell>{usuario.id}</TableCell> */}
                      <TableCell>{usuario.name}</TableCell>
                      <TableCell>{usuario.last_nameF}</TableCell>
                      <TableCell>{usuario.last_nameS}</TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>{usuario.role?.description}</TableCell>
                      <TableCell>{usuario.is_active ? 'Activo' : 'Inactivo'}</TableCell>
                      <TableCell>{usuario.doc_num}</TableCell>
                      <TableCell>{usuario.country_display}</TableCell>

                      <TableCell>{new Date(usuario.create_at).toLocaleString()}</TableCell>
                      <TableCell>{new Date(usuario.updated_at).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <IconButton onClick={() => deleteProduct(usuario.id)}>
                            <i className='tabler-trash text-[22px] text-textSecondary' />
                          </IconButton>
                          <IconButton>
                            <Link href={getLocalizedUrl(`apps/user/view/${usuario.id}`, locale)} className='flex'>
                              <i className='tabler-eye text-[22px] text-textSecondary' />
                            </Link>
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align='center'>
                      No se encontraron usuarios.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <AddUserDrawer
        open={addUserOpen}
        setOpen={setAddUserOpen}
        handleClose={() => setAddUserOpen(!addUserOpen)}
        handleUserAdded={handleUserAdded}
      />
    </>
  )
}

export default UserListTable
