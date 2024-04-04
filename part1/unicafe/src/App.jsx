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

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return <p> No feedback given </p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine text="average" value={props.average.toFixed(1)} />
        <StatisticLine text="positive" value={`${props.positive.toFixed(1)}%`} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    const newGood = good + 1
    setAll(newGood + neutral + bad)
    setAverage((newGood * 1 + neutral * 0 + bad * -1) / (newGood + neutral + bad))
    setPositive(newGood / (newGood + neutral + bad) * 100)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    const newNeutral = neutral + 1
    setAll(good + newNeutral + bad)
    setAverage((good * 1 + newNeutral * 0 + bad * -1) / (good + newNeutral + bad))
    setPositive(good / (good + newNeutral + bad) * 100)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    const newBad = bad + 1
    setAll(good + neutral + newBad)
    setAverage((good * 1 + neutral * 0 + newBad * -1) / (good + neutral + newBad))
    setPositive(good / (good + neutral + newBad) * 100)
  }

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Header text='statistics' />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App