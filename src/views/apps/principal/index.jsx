// MUI Imports
import { Button, Card, CardActions, CardContent, CardMedia, Typography, } from '@mui/material'
import Grid from '@mui/material/Grid'

import LinkIcon from '@mui/icons-material/Link';

import LikeButton from './LikeButton'

import Documentos from './Documentos'

const Principal = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
 <Documentos></Documentos>
      </Grid>

    </Grid>
  )
}

export default Principal
