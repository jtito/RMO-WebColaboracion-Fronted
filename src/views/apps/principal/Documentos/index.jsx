import { useState } from 'react'

import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Typography } from '@mui/material'

import Grid from '@mui/material/Grid'

import LinkIcon from '@mui/icons-material/Link'

import LikeButton from '../LikeButton'

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
  const groupedDocuments = groupByCategory(lisdoc)
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null)

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
              style={{
                marginBottom: '16px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transform: hoveredCardIndex === docIndex ? 'scale(1.05)' : 'scale(1)',
                boxShadow:
                  hoveredCardIndex === docIndex ? '0px 4px 20px rgba(0,0,0,0.2)' : '0px 2px 10px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={() => setHoveredCardIndex(docIndex)}
              onMouseLeave={() => setHoveredCardIndex(null)}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <CardMedia
                      component='img'
                      image='https://via.placeholder.com/150' // Replace with your image URL
                      alt='Descripción de la imagen'
                      style={{ width: '50%', height: 'auto' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography variant='h5' component='div'>
                      {doc.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {doc.description}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions className='card-actions-dense'>
                <LikeButton count={123} />
              </CardActions>
            </Card>
          ))}
        </div>
      ))}
    </>
  )
}

export default Documentos
