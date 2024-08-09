'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Importaciones de fechas
import { format, parseISO, isWithinInterval } from 'date-fns'
import { es } from 'date-fns/locale'

// Material-UI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'
import IconButton from '@mui/material/IconButton'
import { TextField } from '@mui/material'

//Importar DatePicker
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './custom-datepicker.css'

import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import { useTheme } from '@emotion/react'

import OptionMenu from '@core/components/option-menu'

// Nuevas importaciones
import AddUserDrawer from './AddUserDrawer'

// Server Action Imports
import { EliminarUsuario, obtnerUsuarios } from '../../../../Service/axios.services'

import { getLocalizedUrl } from '@/utils/i18n'

const UserListTable = () => {
  const [usuarios, setUsuarios] = useState([])
  const [filteredUsuarios, setFilteredUsuarios] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState('') // Estado para el rol seleccionado
  const [dateRangeCreate, setDateRangeCreate] = useState([null, null]) // Estado para el filtro de fechas de creacion
  const [dateRangeUpdate, setDateRangeUpdate] = useState([null, null]) // Estado para el filtro de fechas de actualizacion
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')

  const theme = useTheme()

  const { lang: locale } = useParams()

  const obtenerUsuarios = async () => {
    try {
      const response = await obtnerUsuarios()

      if (response.status === 200) {
        setUsuarios(response.data)
        setFilteredUsuarios(response.data) // Inicialmente mostrar todos los usuarios
        setIsLoading(false)
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

  useEffect(() => {
    let filtered = usuarios

    if (selectedRole) {
      filtered = filtered.filter(user => user.role?.description === selectedRole)
    }

    if (dateRangeCreate[0] && dateRangeCreate[1]) {
      filtered = filtered.filter(user => {
        const userDateCreate = parseISO(user.create_at)

        return isWithinInterval(userDateCreate, { start: dateRangeCreate[0], end: dateRangeCreate[1] })
      })
    }

    if (dateRangeUpdate[0] && dateRangeUpdate[1]) {
      filtered = filtered.filter(user => {
        if (!user.updated_at) return false // Asegúrate de que user.updated_at no es undefined
        const userDateUpdate = parseISO(user.updated_at) // Aquí se corrige el error

        return isWithinInterval(userDateUpdate, { start: dateRangeUpdate[0], end: dateRangeUpdate[1] })
      })
    }

    // Filtro por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_nameF.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_nameS.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredUsuarios(filtered)
  }, [selectedRole, dateRangeCreate, dateRangeUpdate, searchTerm, usuarios])

  const handleUserAdded = async newUser => {
    try {
      const response = await obtnerUsuarios()

      if (response.status === 200) {
        const updatedUsers = response.data
        const addedUser = updatedUsers.find(user => user.id === newUser.id)

        setUsuarios(prevUsuarios => [...prevUsuarios, addedUser])

        if (selectedRole === addedUser.role?.description) {
          setFilteredUsuarios(prevUsuarios => [...prevUsuarios, addedUser])
        }
      }
    } catch (error) {
      console.error('Error fetching updated user data:', error)
    }
  }

  const deleteProduct = async id => {
    if (id != null) {
      try {
        await EliminarUsuario(id)
        setIsLoading(true)
        await obtenerUsuarios()
      } catch (err) {
        console.log(err.message)
      }
    }
  }

  const mostrarAlertaConfirmacionInactivo = async id => {
    const titleColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000'
    const backgroundColor = theme.palette.background.paper
    const confirmButtonColor = theme.palette.primary.main
    const cancelButtonColor = theme.palette.error.main

    const result = await Swal.fire({
      html: `<span style="font-family: Arial, sans-serif; font-size: 28px; color: ${titleColor};">¿Estás seguro de que deseas eliminar este usuario?</span>`,
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: cancelButtonColor,
      background: backgroundColor
    })

    if (result.isConfirmed) {
      await deleteProduct(id)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }



  return (
    <>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            label='Buscar'
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2.5} style={{ paddingRight: '8px' }}>
          <DatePicker
            selected={dateRangeCreate[0]}
            onChange={dates => setDateRangeCreate(dates)}
            startDate={dateRangeCreate[0]}
            endDate={dateRangeCreate[1]}
            selectsRange
            dateFormat='dd/MM/yyyy'
            locale={es}
            placeholderText='Fecha de Creación'
            className='custom-datepicker'
            isClearable
          />
        </Grid>
        <Grid item xs={12} md={3} style={{ paddingLeft: '8px' }}>
          <DatePicker
            selected={dateRangeUpdate[0]}
            onChange={dates => setDateRangeUpdate(dates)}
            startDate={dateRangeUpdate[0]}
            endDate={dateRangeUpdate[1]}
            selectsRange
            dateFormat='dd/MM/yyyy'
            locale={es}
            placeholderText='Fecha de Actualización'
            className='custom-datepicker'
            isClearable
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            color='secondary'
            variant='tonal'
            startIcon={<i className='tabler-upload' />}
            className='is-full sm:is-auto'
          >
            Exportar
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={() => {
              setAddUserOpen(true)
            }}
            color='primary'
            className='is-full sm:is-auto'
          >
            Agregar Usuario
          </Button>
        </Grid>
        {/*<Grid item xs={12} sm={6} md={4} lg={3}>
          <Select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Role' }}
            fullWidth
          >
            <MenuItem value=''>Todos</MenuItem>
            <MenuItem value='País Miembro (PPMM)'>País Miembro (PPMM)</MenuItem>
            <MenuItem value='Administrador del sistema'>Administrador del sistema</MenuItem>
            <MenuItem value='Secretaria Técnica (SGCAN)'>Secretaria Técnica (SGCAN)</MenuItem>
          </Select>
        </Grid>*/}
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido Paterno</TableCell>
                  <TableCell>Apellido Materno</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Rol</TableCell>
                  {/* <TableCell>Estado</TableCell> */}
                  <TableCell>Numero de Documento</TableCell>
                  <TableCell>Pais</TableCell>
                  <TableCell>Estado</TableCell>
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
                ) : filteredUsuarios.length > 0 ? (
                  filteredUsuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(usuario => (
                    <TableRow key={usuario.id}>
                      <TableCell>{usuario.name}</TableCell>
                      <TableCell>{usuario.last_nameF}</TableCell>
                      <TableCell>{usuario.last_nameS}</TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>{usuario.role?.description}</TableCell>
                      <TableCell>{usuario.doc_num}</TableCell>
                      <TableCell>{usuario.country_display}</TableCell>
                      <TableCell>{usuario.is_active ? 'Activo' : 'Inactivo'}</TableCell>
                      <TableCell>
                        {usuario?.create_at
                          ? format(new Date(usuario?.create_at), 'dd/MM/yyyy', { locale: es })
                          : 'Fecha no disponible'}
                      </TableCell>
                      <TableCell>
                        {usuario?.updated_at
                          ? format(new Date(usuario?.updated_at), 'dd/MM/yyyy', { locale: es })
                          : 'Fecha no disponible'}
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <IconButton onClick={() => mostrarAlertaConfirmacionInactivo(usuario.id)}>
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={filteredUsuarios.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
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
