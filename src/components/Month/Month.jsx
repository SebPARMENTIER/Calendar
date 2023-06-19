import { useState } from 'react'
import PropTypes from 'prop-types'

import Day from '../Day/Day.jsx'
import './Month.css'
import allMonthes from '../../assets/data/monthes.js'

function Month({
  year,
  isSelectingYear,
  setIsSelectingYear,
  today
}) {
  // Set februray days at 29 days in case of leap year
  if (year % 4 === 0) {
    allMonthes[1].maxDay = 29
  }

  // Display current month when the app starts
  const currentMonth = allMonthes.filter(month => month.id == today.getMonth())
  let [getMonthToDisplay, setGetMonthToDisplay] = useState(currentMonth)

  const selectMonth = (event) => {
    setGetMonthToDisplay(allMonthes.filter((month) => month.id == event.target.value))
    setIsSelectingYear(true)
  }

  return (
    <>
      <div className='monthes'>
        {allMonthes.map(m => (
          <button
            key={m.id}
            className='month'
            onClick={selectMonth}
            value={m.id}
          >
            {m.month}
          </button>
        ))}
      </div>
      {isSelectingYear && (
        <Day
          getMonthToDisplay={getMonthToDisplay}
          year={year}
          today={today}
        />
      )}
    </>
  )
}

Month.propTypes = {
  year: PropTypes.number.isRequired,
  isSelectingYear: PropTypes.bool.isRequired,
  setIsSelectingYear: PropTypes.func.isRequired,
  today: PropTypes.shape({
    getMonth: PropTypes.func.isRequired
  }).isRequired
}

export default Month
