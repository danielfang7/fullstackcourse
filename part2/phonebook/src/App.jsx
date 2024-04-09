import { useState, useEffect } from 'react'
import axios from 'axios'
import AddPersonForm from './components/AddPersonForm'
import SearchFilter from './components/SearchFilter'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

const addInfo = (event) => {
  event.preventDefault()
  if (!persons.some(person => person.name === newName)) {
    const nameObj = { name: newName, number: newNum}
    setPersons(persons.concat(nameObj))
    setNewName('') // Clear the name field
    setNewNum('')  // Clear the number field
  }
  else {
    alert(`${newName} is already added to phonebook`)
  }
}

const handleNameChange = (event) => {
  setNewName(event.target.value)
}

const handleNumChange = (event) => {
  setNewNum(event.target.value)
}

const handleSearchChange = (event) => {
  setSearchTerm(event.target.value)
}

const filteredPersons = persons.filter(person =>
  person.name.toLowerCase().includes(searchTerm.toLowerCase())
)

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter
      searchTerm={searchTerm}
      handleSearchChange={handleSearchChange}
      />
      <h3>Add a New Person</h3>
      <AddPersonForm 
        addInfo={addInfo}
        newName={newName}
        handleNameChange={handleNameChange}
        newNum={newNum}
        handleNumChange={handleNumChange}
      />
      <h3>Numbers</h3>
      <PersonList persons={filteredPersons}/>
    </div>
  )
}

export default App