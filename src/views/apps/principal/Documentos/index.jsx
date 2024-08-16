import { useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography
} from '@mui/material'

import Grid from '@mui/material/Grid'

import LinkIcon from '@mui/icons-material/Link'

import LikeButton from '../LikeButton'
import DislikeButton from '../DislikeButton'

// Función para agrupar documentos por categoría
const groupByCategory = documents => {
  return documents.reduce((groups, document) => {
    const category = document.typeDoc.description

    if (!groups[category]) {
      groups[category] = []
    }

    groups[category].push(document)

    return groups
  }, {})
}

// Definir imágenes en un objeto
const images = {
  Desiciones: '/images/icons/decisiones.png',
  Resoluciones: '/images/icons/resolucion.png',
  'Documentos Técnicos': '/images/icons/docTecnico.png' // Asegúrate de tener la imagen en la ruta correcta
}

const getImageByCategory = category => {
  return images[category] || images['Documentos Técnicos'] // Imagen predeterminada si no se encuentra la categoría
}

const Documentos = ({ lisdoc }) => {
  const router = useRouter()

  const handleCardClick = id => {
    router.push(`GestionPublicaciones/publicados/${id}`)
  }

  const groupedDocuments = groupByCategory(lisdoc)

  const [hoveredCardIndex, setHoveredCardIndex] = useState(null)

  console.log(lisdoc)

  return (
    <>
      {Object.keys(groupedDocuments).map((category, index) => (
        <div key={index}>
          <Divider textAlign='left' style={{ marginBottom: '16px', borderWidth: '2px' }}>
            <Box display='flex' alignItems='center'>
              <img
                src={getImageByCategory(category)}
                alt={category}
                style={{ width: '40px', height: 'auto', marginRight: '8px' }}
              />
              <Typography variant='h4' style={{ fontWeight: 'bold', marginLeft: '7px' }}>
                {category}
              </Typography>
            </Box>
          </Divider>
          {groupedDocuments[category].map((doc, docIndex) => (
            <Card
              key={docIndex}
              sx={{
                mb: 3,
                cursor: 'pointer',
                borderRadius: '5px'
              }}
              onMouseEnter={() => setHoveredCardIndex(docIndex)}
              onMouseLeave={() => setHoveredCardIndex(null)}
            >
              <CardActionArea>
                <CardContent
                  sx={{
                    maxHeight: '180px', // Limitar la altura del contenido
                    overflow: 'hidden' // Ocultar el desbordamiento
                  }}
                  onClick={() => handleCardClick(doc.id)}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <CardMedia
                        component='img'
                        sx={{ width: 130, height: 150, cursor: 'pointer' }}
                        image='https://via.placeholder.com/150'
                        alt='Live from space album cover'
                      />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <Typography variant='h5' component='div'>
                        {doc.title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {doc.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
              <Divider />
              <CardActions className='card-actions-dense'>
                <LikeButton count={45} />
                <DislikeButton count={45} />
              </CardActions>
            </Card>
          ))}
        </div>
      ))}
    </>
  )
}

export default Documentos
