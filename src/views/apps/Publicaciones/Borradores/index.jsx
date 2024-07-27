import { Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material";



const Borrador = () => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>






        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}>
                <CardMedia
                  component="img"
                  image="https://via.placeholder.com/150"
                  alt="Descripción de la imagen"
                  style={{ width: '50%', height: 'auto' }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h5" component="div">
                  Título del Contenido
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Esta es una breve descripción del contenido. Puedes agregar aquí más detalles para complementar la imagen.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className='card-actions-dense'>
            <Button>hola mundo</Button>

          </CardActions>
        </Card>
      </Grid>


    </Grid>
  );
}

export default Borrador;
