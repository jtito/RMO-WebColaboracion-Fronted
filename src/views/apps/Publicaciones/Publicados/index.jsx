import { Button, Card, CardActions, CardContent, CardMedia, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";




const Publicados = () => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>

        {/* Cabecera con botones y controles */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h4">Gestion de Publicaciones</Typography>
          </Grid>


          <Grid item xs={12} md={4} container spacing={2} justifyContent="center">
            <Button variant="contained" color="primary">Agregar</Button>
          </Grid>
          <Grid item xs={12} md={4} container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Filtro</InputLabel>
                <Select defaultValue="" label="Filtro">
                  <MenuItem value="opcion1">Opción 1</MenuItem>
                  <MenuItem value="opcion2">Opción 2</MenuItem>
                  <MenuItem value="opcion3">Opción 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                variant="outlined"
                label="Buscar"
                placeholder="Buscar..."
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Línea divisoria */}
        <Divider sx={{ my: 2 }} />




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

export default Publicados;
