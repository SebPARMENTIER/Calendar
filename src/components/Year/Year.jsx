import { useState } from 'react'
import PropTypes from 'prop-types'

import Month from '../Month/Month.jsx'
import './Year.css'

function Year({ today }) {
  let [year, setYear] = useState(today.getFullYear())
  let [isSelectingYear, setIsSelectingYear] = useState(true)

  const previousYear = () => {
    setYear(year -= 1)
    setIsSelectingYear(false)
  }
  const nextYear = () => {
    setYear(year += 1)
    setIsSelectingYear(false)
  }

  return (
    <>
      <main className='year'>
        <button onClick={previousYear} className='buttons'>-</button>
        <div>
          {year}
        </div>
        <button onClick={nextYear} className='buttons'>+</button>
      </main>
      <Month
        year={year}
        isSelectingYear={isSelectingYear}
        setIsSelectingYear={setIsSelectingYear}
        today={today}
      />
    </>
  )
}

Year.propTypes = {
  today: PropTypes.shape({
    getFullYear: PropTypes.func.isRequired
  }).isRequired
}

export default Year
