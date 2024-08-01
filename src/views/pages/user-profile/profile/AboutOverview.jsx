import Image from 'next/image'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

const coverImg = '/images/pages/profile-banner.png'

const AboutOverview = ({ data }) => {
  console.log('log', data)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardMedia>
            <Image src={coverImg} alt='Profile Banner' layout='responsive' width={500} height={250} />
          </CardMedia>
          <CardContent className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <Typography className='uppercase' variant='body2' color='ActiveCaption'>
                Name: {data?.name}
              </Typography>
            </div>
            <div className='flex flex-col gap-4'>
              <Typography className='uppercase' variant='body2' color='ActiveCaption'>
                Rol: {data?.role}
              </Typography>
            </div>
            <div className='flex flex-col gap-4'>
              <Typography className='uppercase' variant='body2' color='ActiveCaption'>
                Email: {data?.email}
              </Typography>
            </div>
            <div className='flex flex-col gap-4'>
              <Typography className='uppercase' variant='body2' color='ActiveCaption'>
                Country: {data?.country_display}
              </Typography>
            </div>
            <div className='flex flex-col gap-4'>
              <Typography className='uppercase' variant='body2' color='ActiveCaption'>
                Document Type: {data?.type_doc_display}
              </Typography>
            </div>
            <div className='flex flex-col gap-4'>
              <Typography className='uppercase' variant='body2' color='ActiveCaption'>
                Document Number: {data?.doc_num}
              </Typography>
            </div>
            <div className='flex flex-col gap-4'>
              <Typography className='uppercase' variant='body2' color='ActiveCaption'>
                Active: {data?.is_active ? 'Yes' : 'No'}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutOverview
