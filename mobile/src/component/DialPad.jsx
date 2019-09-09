
import React, {useState} from 'react'

const keyPad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['#', 0, '*'],
]

const DialPad = props => {
  const allowed = new Set(props.allowed)
  const [number, setNumber] = useState('')

  const handleDigitClick = n => {
    if (allowed.has(n)) updateNumber(n)
  }

  const submitNumber = () => {
    props.onSend(number)
    setNumber('')
  }

  const updateNumber = n => {
    const num = `${number}${n}`
    let valid = false

    props.goals.forEach(goal => {
      if (goal.substr(0, num.length) === num) valid = true
    })

    if (valid) setNumber(num)
  }

  return (
    <div className="dialpad cover">
      <div className="number">{number}</div>
      <div className="digits">
        {keyPad.map((row, idx) => {
          return (
            <div className="flex-row margin-bottom" key={idx}>
              {row.map(col => (
                <div className={`digit${allowed.has(col) ? ' active' : ''}`} key={`${col}`}>
                  <a href="#" onClick={() => handleDigitClick(col)}>
                    {col}
                  </a>
                </div>
              ))}
            </div>
          )
        })}
        <div className="flex-row">
          <div className="digit active send">
            <a href="#" onClick={submitNumber}>Send</a>
          </div>
          <div className="digit active reset">
            <a href="#" onClick={() => setNumber('')}>Reset</a>
          </div>
        </div>
        <div className="flex-row">
          <div className="digit active close">
            <a href="#" onClick={props.onClose}>Close</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DialPad
