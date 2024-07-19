import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import CustomAvatar from '@core/components/mui/Avatar'

// Props defaults for the component
const defaultUserData = {
  firstName: 'Seth',
  lastName: 'Hallam',
  userName: '@shallamb',
  billingEmail: 'shallamb@gmail.com',
  status: 'active',
  role: 'Subscriber',
  taxId: 'Tax-8894',
  contact: '+1 (234) 464-0600',
  language: ['English'],
  country: 'France',
  useAsBillingAddress: true
}

const UserDetails = ({ userData = defaultUserData }) => {
  // Vars
  const buttonProps = (children, color, variant) => ({
    children,
    color,
    variant
  })

  return (
    <Card>
      <CardContent className='flex flex-col pbs-12 gap-6'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-center flex-col gap-4'>
            <div className='flex flex-col items-center gap-4'>
              <CustomAvatar alt='user-profile' src='/images/avatars/1.png' variant='rounded' size={120} />
              <Typography variant='h5'>{`${userData.firstName} ${userData.lastName}`}</Typography>
            </div>
            <Chip label='Author' color='secondary' size='small' variant='tonal' />
          </div>
        </div>
        <div>
          <Typography variant='h5'>Detalle</Typography>
          <Divider className='mlb-4' />
          <div className='flex flex-col gap-2'>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Nombre:
              </Typography>
              <Typography>{userData.firstName}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Apellido:
              </Typography>
              <Typography>{userData.lastName}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Email:
              </Typography>
              <Typography>{userData.billingEmail}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Rol:
              </Typography>
              <Typography>{userData.role}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Estado:
              </Typography>
              <Typography>{userData.status === 'active' ? 'Activo' : 'Inactivo'}</Typography>
            </div>
            {/* Placeholder for dates, update with actual properties if available */}
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Fecha de Creación:
              </Typography>
              <Typography>{/* Format date if available */}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                Última Actualización:
              </Typography>
              <Typography>{/* Format date if available */}</Typography>
            </div>
          </div>
        </div>
        <div className='flex gap-4 justify-center'>
          <Button {...buttonProps('Editar', 'primary', 'contained')} />
          <Button {...buttonProps('Suspender', 'error', 'tonal')} />
        </div>
      </CardContent>
    </Card>
  )
}

export default UserDetails
