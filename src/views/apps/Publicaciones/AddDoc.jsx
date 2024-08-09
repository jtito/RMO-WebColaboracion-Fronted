import React, { useState, useEffect } from 'react'


import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { useSession } from 'next-auth/react'

import { crearDocumento, obtenertiposDoc } from '@/Service/axios.services'

const AddDoc = ({ open, handleClose, handleNext }) => {
  const { data: session } = useSession() // Obtener datos de la sesión
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTypeDoc, setSelectedTypeDoc] = useState('')
  const [tipodoc, settipodoc] = useState([])
  const [error, setError] = useState('') // Estado para el mensaje de error

  const iduser = session?.user?.id.id

  useEffect(() => {
    obtenerTypDoc()
  }, [])

  const obtenerTypDoc = async () => {
    try {
      const response = await obtenertiposDoc()

      if (response.status === 200) {
        settipodoc(response.data)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!title || !selectedTypeDoc) {
      setError('Por favor, complete todos los campos')

      return
    }

    const data = {

      typeDoc: selectedTypeDoc,

      state: 1,
      title,

      description,

      usuario_creador: iduser,
      change_state: new Date().toISOString().split('T')[0]
    }

    try {
      const response = await crearDocumento(data)

      if (response.status === 201) {
        handleClose()
        handleNext()
      } else {
        console.log('Error al crear Documento')
      }
    } catch (error) {
      console.error('Error al crear documento:', error)

      // setError('Error al crear el documento')
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle>Agregar Documento</DialogTitle>
      <DialogContent>
        {error && <div style={{ color: 'red', marginBottom: '1em' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin='normal' label='Título' value={title} onChange={e => setTitle(e.target.value)} />
          <TextField
            fullWidth
            margin='normal'
            label='Descripción'
            value={description}
            onChange={e => setDescription(e.target.value)}
            multiline
            rows={5}
          />
          <FormControl fullWidth margin='normal'>
            <InputLabel>Tipo de Documento</InputLabel>
            <Select
              value={selectedTypeDoc}
              onChange={e => setSelectedTypeDoc(e.target.value)}
              label='Tipo de Documento'
            >
              {tipodoc.map(tipo => (
                <MenuItem key={tipo.id} value={tipo.id}>
                  {tipo.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DialogActions>
            <Button type='submit' color='primary'>
              Guardar
            </Button>
            <Button onClick={handleClose} color='secondary'>
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddDoc
