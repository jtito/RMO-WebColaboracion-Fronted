'use client'

// MUI Imports
import { useEffect, useState } from 'react'

import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography
} from '@mui/material'
import Grid from '@mui/material/Grid'
import SearchIcon from '@mui/icons-material/Search'
import LinkIcon from '@mui/icons-material/Link'

import LikeButton from './LikeButton'

import Documentos from './Documentos'
import { obtenerDocumentos, obtenertiposDoc } from '@/Service/axios.services'

const Principal = () => {
  const [Tipodoc, setTipodoc] = useState([])
  const [lisdoc, setLisdoc] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const ListarDocumentos = async () => {
    try {
      const response = await obtenerDocumentos()

      if (response.status === 200) {
        // Filtrar documentos para incluir solo aquellos con estado 'Publicado'
        const documentosPublicados = response.data.filter(doc => doc.state.description === 'Publicado')

        setLisdoc(documentosPublicados)
      } else {
        console.error('Error al obtener los datos')
      }
    } catch (error) {
      console.error('Error en la solicitud', error)
    }
  }

  const FiltroCategorias = async () => {
    try {
      const response = await obtenertiposDoc()

      if (response.status === 200) {
        setTipodoc(response.data)
      } else {
        console.error('Error al obtener los datos')
      }
    } catch (error) {
      console.error('Error en la solicitud', error)
    }
  }

  useEffect(() => {
    ListarDocumentos()
    FiltroCategorias()
  }, [])

  const handleSearch = event => {
    setSearchTerm(event.target.value)
  }

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value)
  }

  const filteredDocuments = lisdoc.filter(
    doc =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || doc.typeDoc.description === selectedCategory)
  )

  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: '70px', // Ajusta este valor según la altura del navbar
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 200, 0.10)',
          padding: '10px',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          marginTop: '20px' // Añadir un margen superior para separar del contenido superior
        }}
      >
        <Grid container spacing={2} alignItems='normal'>
          <Grid item xs={12} md={5}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='search'
              placeholder='Buscar documentos...'
              name='search'
              autoComplete='off'
              autoFocus
              onChange={handleSearch}
              value={searchTerm}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant='outlined' margin='normal'>
              <InputLabel id='category-label'>Categoría</InputLabel>
              <Select
                labelId='category-label'
                id='category'
                value={selectedCategory}
                onChange={handleCategoryChange}
                label='Categoría'
              >
                <MenuItem value=''>
                  <em>Todas</em>
                </MenuItem>
                {Tipodoc.map(tipo => (
                  <MenuItem key={tipo.id} value={tipo.description}>
                    {tipo.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={6} style={{ padding: '20px', marginTop: '20px' }}>
        <Grid item xs={12}>
          <Documentos lisdoc={filteredDocuments} />
        </Grid>
      </Grid>
    </>
  )
}

export default Principal
