// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Vars
const tableData = [
  {
    Comite: false,
    Pais: true,
    Permiso: 'Editar'
  },
  {
    Comite: false,
    Pais: true,
    Permiso: 'Crear'
  },
  {
    Comite: false,
    Pais: true,
    Permiso: 'Aprobar'
  },
  {
    Comite: false,
    Pais: true,
    Permiso: 'Archivar'
  },
 
]

const PermisoUsuario = ({ id }) => {
  console.log('hol id', id)

  return (
    <Card>
      <CardHeader title='Asignar permiso' subheader='Asigna permisos específicos a los usuarios' />
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Permiso</th>
              <th>Comité</th>
              <th>Pais</th>
            </tr>
          </thead>
          <tbody className='border-be'>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>
                  <Typography color='text.primary'>{data.Permiso}</Typography>
                </td>
                <td>
                  <Checkbox defaultChecked={data.Pais} />
                </td>
                <td>
                  <Checkbox defaultChecked={data.Comite} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CardActions className='flex items-center gap-2'>
        <Button variant='contained' type='submit'>
          Guardar permisos
        </Button>
        <Button variant='tonal' color='secondary' type='reset'>
          Cancelar
        </Button>
      </CardActions>
    </Card>
  )
}

export default PermisoUsuario
