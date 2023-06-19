import PropTypes from 'prop-types'

import './Day.css'
import weekDays from '../../assets/data/week.js'

function Day({
  getMonthToDisplay,
  year,
  today
}) {
  let eachMonthDays = []
  
  // Fill the month with all days which compose it
  for (const allDays of getMonthToDisplay) {
    // Push each day object in eachMonthDays array
    for (let index = 0; index < allDays.maxDay; index++) {
      eachMonthDays.push({
        id: index,
        numberOfTheDay: index,
        className: 'day'
      })
      // Add 1 to each properties to get the number of the day corresponding
      eachMonthDays[index].id += 1
      eachMonthDays[index].numberOfTheDay += 1
      // Create an object called 'eachDay' and add it to allDays array
      Object.defineProperty(allDays, 'eachDay', {
        value: eachMonthDays,
        writable: true
      })
    }
    eachMonthDays = []
  }

  const monthToDisplay = getMonthToDisplay[0]

  const getFirstDateOfMonth = new Date(year, monthToDisplay.id, monthToDisplay.eachDay[0].numberOfTheDay)
  const getWeekDayIndex = getFirstDateOfMonth.getDay()

  // Add empty entries in monthToDisplay array to start the first day of the month with the weekday corresponding
  for (let index = 0; index < getWeekDayIndex; index++) {
    const emptyCell = ''
    monthToDisplay.eachDay.unshift(emptyCell)
  }

  // Add class to highlight the current day in the calendar
  for (let index = 0; index < monthToDisplay.eachDay.length; index++) {
    const calendarDate = new Date(year, monthToDisplay.id, monthToDisplay.eachDay[index].numberOfTheDay)
    if (today.toLocaleDateString('fr-FR') === calendarDate.toLocaleDateString('fr-FR')) {
      if (today.getDate() === monthToDisplay.eachDay[index].numberOfTheDay) {
        monthToDisplay.eachDay[index].className = 'day red'
      }
    }
  }

  const firstWeekToDisplay = monthToDisplay.eachDay.splice(0, 7)

  let firstWeek = []
  let firstWeekKey = 'a'
  const getNextChar = (char) => {
    return String.fromCharCode(char.charCodeAt(0) + 1)
  }

  // As the first week can start between the day one to seven, the first entries can be remplaced
  // by empty entries (which will no have id so no keys for the mapping array in jsx).
  // So we create an alphabetic keys to solve this problem
  for (let index = 0; index < firstWeekToDisplay.length; index++) {
    firstWeek.push({
      key: getNextChar(firstWeekKey),
      numberOfTheDay: firstWeekToDisplay[index].numberOfTheDay,
      className: firstWeekToDisplay[index].className
    })
    firstWeekKey = firstWeek[index].key
  }

  // Then, we create six weeks in case the first day of the month having 31 days
  // starts at the end of the week
  const secondWeek = monthToDisplay.eachDay.splice(0, 7)
  const thirdWeek = monthToDisplay.eachDay.splice(0, 7)
  const fourthWeek = monthToDisplay.eachDay.splice(0, 7)
  const fifthWeek = monthToDisplay.eachDay.splice(0, 7)
  const sixthWeek = monthToDisplay.eachDay.splice(0, 7)


  return (
    <>
      <div className='days'>
        <div className='content'>
          <table className='table'>
            <thead>
              <tr>
                <th colSpan='7'>{monthToDisplay.month} {year}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {weekDays.map(w => (
                  <td
                    key={w.id}
                    className='week'
                  >
                    {w.weekDay}
                  </td>
                ))}
              </tr>
              <tr>
                {firstWeek.map(first => (
                  <td
                    key={first.key}
                    className={first.className}
                  >
                    {first.numberOfTheDay}
                  </td>
                ))}
              </tr>
              <tr>
                {secondWeek.map(second => (
                  <td
                    key={second.id}
                    className={second.className}
                  >
                    {second.numberOfTheDay}
                  </td>
                ))}
              </tr>
              <tr>
                {thirdWeek.map(third => (
                  <td
                    key={third.id}
                    className={third.className}
                  >
                    {third.numberOfTheDay}
                  </td>
                ))}
              </tr>
              <tr>
                {fourthWeek.map(fourth => (
                  <td
                    key={fourth.id}
                    className={fourth.className}
                  >
                    {fourth.numberOfTheDay}
                  </td>
                ))}
              </tr>
              <tr>
                {fifthWeek.map(fifth => (
                  <td
                    key={fifth.id}
                    className={fifth.className}
                  >
                    {fifth.numberOfTheDay}
                  </td>
                ))}
              </tr>
              <tr>
                {sixthWeek.map(sixth => (
                  <td
                    key={sixth.id}
                    className={sixth.className}
                  >
                    {sixth.numberOfTheDay}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

Day.propTypes = {
  getMonthToDisplay: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    month: PropTypes.string.isRequired,
    maxDay: PropTypes.number.isRequired,
    eachDay: PropTypes.arrayOf(
      PropTypes.number.isRequired,
    ),
  }).isRequired,).isRequired,
  year: PropTypes.number.isRequired,
  today: PropTypes.shape({
    toLocaleDateString: PropTypes.func.isRequired,
    getDate: PropTypes.func.isRequired
  }).isRequired
}

export default Day
