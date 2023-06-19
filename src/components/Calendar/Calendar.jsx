import Year from '../Year/Year.jsx'
import './Calendar.css'

function Calendar() {
  const today = new Date()
  const now = today.toLocaleDateString('fr-FR')

  return (
    <>
      <header className='calendar'>
        Calendar
      </header>
      <div className='now'>
        {now}
      </div>
      <Year today={today} />
    </>
  )
}

export default Calendar
