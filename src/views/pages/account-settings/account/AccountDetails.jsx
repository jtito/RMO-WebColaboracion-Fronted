'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Vars
/*const initialData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  organization: 'Pixinvent',
  phoneNumber: '+1 (917) 543-9876',
  address: '123 Main St, New York, NY 10001',
  state: 'New York',
  zipCode: '634880',
  country: 'usa',
  language: 'english',
  timezone: 'gmt-12',
  currency: 'usd'
}*/

const languageData = ['English', 'Arabic', 'French', 'German', 'Portuguese']

const AccountDetails = () => {
  // States
  const [formData, setFormData] = useState('')
  const [fileInput, setFileInput] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [language, setLanguage] = useState(['English'])

  const handleDelete = value => {
    setLanguage(current => current.filter(item => item !== value))
  }

  const handleChange = event => {
    setLanguage(event.target.value)
  }

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileInputChange = file => {
    const reader = new FileReader()
    const { files } = file.target

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setFileInput(reader.result)
      }
    }
  }

  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }

  return (
    <Card>
      <CardContent className='mbe-4'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Subir Nueva Foto
                <input
                  hidden
                  type='file'
                  value={fileInput}
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleFileInputReset}>
              Reestablecer
              </Button>
            </div>
            <Typography>Permitido el formato JPG o PNG. Tamaño máximo 800Kb</Typography>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Primer Apellido'
                value={formData.last_nameF}
                onChange={e => handleFormChange('firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Segundo Apellido'
                value={formData.lastName}
                onChange={e => handleFormChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Nombre'
                value={formData.lastName}
                onChange={e => handleFormChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Email'
                value={formData.email}
                onChange={e => handleFormChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Seleccionar Tipo de Documento'
                value={formData.lastName}
                onChange={e => handleFormChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Número de Documento'
                value={formData.lastName}
                onChange={e => handleFormChange('lastName', e.target.value)}
              />
            </Grid>
            {/* {<Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Organization'
                value={formData.organization}
                onChange={e => handleFormChange('organization', e.target.value)}
              />
            </Grid>} */}
            {/* {<Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Phone Number'
                value={formData.phoneNumber}
                onChange={e => handleFormChange('phoneNumber', e.target.value)}
              />
            </Grid>} */}
            {/* {<Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Address'
                value={formData.address}
                onChange={e => handleFormChange('address', e.target.value)}
              />
            </Grid>} */}
            {/* {<Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='State'
                value={formData.state}
                onChange={e => handleFormChange('state', e.target.value)}
              />
            </Grid>} */}
            {/* {<Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='number'
                label='Zip Code'
                value={formData.zipCode}
                onChange={e => handleFormChange('zipCode', e.target.value)}
              />
            </Grid>} */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label='País'
                value={formData.country}
                onChange={e => handleFormChange('country', e.target.value)}
              >
                <MenuItem value='usa'>USA</MenuItem>
                <MenuItem value='uk'>UK</MenuItem>
                <MenuItem value='australia'>Australia</MenuItem>
                <MenuItem value='germany'>Germany</MenuItem>
              </CustomTextField>
            </Grid>
            {/* {<Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label='Language'
                value={language}
                SelectProps={{
                  multiple: true, // @ts-ignore
                  onChange: handleChange,
                  renderValue: selected => (
                    <div className='flex flex-wrap gap-2'>
                      {selected.map(value => (
                        <Chip
                          key={value}
                          clickable
                          onMouseDown={event => event.stopPropagation()}
                          size='small'
                          label={value}
                          onDelete={() => handleDelete(value)}
                        />
                      ))}
                    </div>
                  )
                }}
              >
                {languageData.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>} */}
            {/* {<Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label='TimeZone'
                value={formData.timezone}
                onChange={e => handleFormChange('timezone', e.target.value)}
                SelectProps={{ MenuProps: { PaperProps: { style: { maxHeight: 250 } } } }}
              >
                <MenuItem value='gmt-12'>(GMT-12:00) International Date Line West</MenuItem>
                <MenuItem value='gmt-11'>(GMT-11:00) Midway Island, Samoa</MenuItem>
                <MenuItem value='gmt-10'>(GMT-10:00) Hawaii</MenuItem>
                <MenuItem value='gmt-09'>(GMT-09:00) Alaska</MenuItem>
                <MenuItem value='gmt-08'>(GMT-08:00) Pacific Time (US & Canada)</MenuItem>
                <MenuItem value='gmt-08-baja'>(GMT-08:00) Tijuana, Baja California</MenuItem>
                <MenuItem value='gmt-07'>(GMT-07:00) Chihuahua, La Paz, Mazatlan</MenuItem>
                <MenuItem value='gmt-07-mt'>(GMT-07:00) Mountain Time (US & Canada)</MenuItem>
                <MenuItem value='gmt-06'>(GMT-06:00) Central America</MenuItem>
                <MenuItem value='gmt-06-ct'>(GMT-06:00) Central Time (US & Canada)</MenuItem>
                <MenuItem value='gmt-06-mc'>(GMT-06:00) Guadalajara, Mexico City, Monterrey</MenuItem>
                <MenuItem value='gmt-06-sk'>(GMT-06:00) Saskatchewan</MenuItem>
                <MenuItem value='gmt-05'>(GMT-05:00) Bogota, Lima, Quito, Rio Branco</MenuItem>
                <MenuItem value='gmt-05-et'>(GMT-05:00) Eastern Time (US & Canada)</MenuItem>
                <MenuItem value='gmt-05-ind'>(GMT-05:00) Indiana (East)</MenuItem>
                <MenuItem value='gmt-04'>(GMT-04:00) Atlantic Time (Canada)</MenuItem>
                <MenuItem value='gmt-04-clp'>(GMT-04:00) Caracas, La Paz</MenuItem>
              </CustomTextField>
            </Grid>} */}
            {/* {<Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label='Currency'
                value={formData.currency}
                onChange={e => handleFormChange('currency', e.target.value)}
              >
                <MenuItem value='usd'>USD</MenuItem>
                <MenuItem value='euro'>EUR</MenuItem>
                <MenuItem value='pound'>Pound</MenuItem>
                <MenuItem value='bitcoin'>Bitcoin</MenuItem>
              </CustomTextField>
            </Grid>} */}
            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit'>
                Guardar Cambios
              </Button>
              <Button variant='tonal' type='reset' color='secondary' onClick={() => setFormData(initialData)}>
                Reestablecer cambios anteriores
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
