import { useState } from 'react'

const Button = ( {handleClick, text} ) => (
  <button onClick={handleClick}>
  {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [maxIndex, setmaxIndex] = useState(0)


  function indexOfMax(array) {
    if (array.length === 0) {
        return -1;
    }
    var max = array[0];
    var maxIndex = 0;

    for (var i = 1; i < array.length; i++) {
        if (array[i] > max) {
            maxIndex = i;
            max = array[i];
        }
    }
    return maxIndex;
}

  const handleClick = () => {
     // Get a random index based on the length of the anecdotes array
     const randomIndex = Math.floor(Math.random() * anecdotes.length)
     console.log(randomIndex)
     setSelected(randomIndex)
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    console.log(newVotes)
    const maxIndex = indexOfMax(newVotes)
    setmaxIndex(maxIndex)
    console.log(maxIndex)
 }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <div>
        <Button handleClick={handleVoteClick} text='vote' />
        <Button handleClick={handleClick} text='next anecdote' />
        <div>
          <h1>Anecdote with most votes</h1>
          <p>{anecdotes[maxIndex]}</p>
          <p>has {votes[maxIndex]} votes</p>
        </div>
      </div>
    </div>
  )
}

export default App
