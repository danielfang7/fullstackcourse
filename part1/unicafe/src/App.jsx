import { useState } from 'react'

const Header = ({ text }) => (
  <div>
    <h1>
      {text}
    </h1>
  </div>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button> 
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    console.log(good)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    console.log(neutral)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    console.log(bad)
  }

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Header text='statistics' />
      good {good}
      neutral {neutral}
      bad {bad}
    </div>
  )
}



export default App