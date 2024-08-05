'use client'

// MUI Imports
import Image from 'next/image'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'

const UserProfileHeader = ({ data }) => {
  const coverImg = '/images/pages/LogoSGCAN (horizontal).png'
  const ImgAvatar = '/images/avatars/1.png'

  return (
    <Card>
      <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '100%',

            border: '2px solid rgba(245, 245, 245, 0.10)',
            backgroundColor: 'rgba(245, 245, 245, 0.8)',

            borderRadius: 1,
            overflow: 'hidden'
          }}
        >
          <Image src={coverImg} alt='Profile Banner' layout='responsive' width={300} height={100} objectFit='contain' />
        </Box>
      </CardMedia>
      <CardContent className='flex gap-5 justify-center flex-col items-center md:items-end md:flex-row !pt-0 md:justify-start'>
        <div className='flex rounded-bs-md mbs-[-40px] border-[5px] mis-[-5px] border-be-0  border-backgroundPaper bg-backgroundPaper'>
          <img height={120} width={120} src={ImgAvatar} className='rounded' alt='Profile Background' />
        </div>
        <div className='flex is-full justify-start self-end flex-col items-center gap-6 sm-gap-0 sm:flex-row sm:justify-between sm:items-end '>
          <div className='flex flex-col items-center sm:items-start gap-2'>
            <Typography variant='h4'>{data?.fullName}</Typography>
            <div className='flex flex-wrap gap-6 justify-center sm:justify-normal'>
              <div className='flex items-center gap-2'>
                {data?.designationIcon && <i className={data?.designationIcon} />}
                <Typography className='font-medium'>{data?.designation}</Typography>
              </div>
              {/* <div className='flex items-center gap-2'>
                <i className='tabler-map-pin' />
                <Typography className='font-medium'>{data?.country_display}</Typography>
              </div>
              <div className='flex items-center gap-2'>
                <i className='tabler-calendar' />
                <Typography className='font-medium'>{data?.joiningDate}</Typography>
              </div> */}
            </div>
          </div>
          {/* <Button variant='contained' className='flex gap-2'>
            <i className='tabler-user-check !text-base'></i>
            <span>Connected</span>
          </Button> */}
        </div>
      </CardContent>
    </Card>
  )
}

export default UserProfileHeader
