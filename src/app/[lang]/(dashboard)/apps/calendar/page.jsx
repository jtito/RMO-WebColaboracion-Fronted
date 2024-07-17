// MUI Imports
import Card from '@mui/material/Card'

// Component Imports

async function fetchEvents() {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/calendar-events`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const CalendarApp = async () => {
  // Vars
  const res = (await fetchEvents()) || []

  return (
    <Card className='overflow-visible'>
      <h1>hola mundo</h1>
    </Card>
  )
}

export default CalendarApp
