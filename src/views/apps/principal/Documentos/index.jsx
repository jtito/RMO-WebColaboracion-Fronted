import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'

import Grid from '@mui/material/Grid'

import LinkIcon from '@mui/icons-material/Link'

import LikeButton from '../LikeButton'

const Documentos = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <CardMedia
              component='img'
              image='https://via.placeholder.com/150' // Reemplaza con la URL de tu imagen
              alt='Descripción de la imagen'
              style={{ width: '50%', height: 'auto' }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant='h5' component='div'>
              Título del Contenido
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Esta es una breve descripción del contenido. Puedes agregar aquí más detalles para complementar la imagen.
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className='card-actions-dense'>
        <LikeButton count={123} />
      </CardActions>
    </Card>
  )
}

export default Documentos
