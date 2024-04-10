import { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm'
import SearchFilter from './components/SearchFilter'
import PersonList from './components/PersonList'
import personsService from './service/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          console.error('Error deleting the person:', error);
          alert('There was a problem deleting the person.');
        })
    }
  }

  const addInfo = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      // Person exists, ask to update their number
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService.update(existingPerson.id, { ...existingPerson, number: newNum })
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName('') // Clear the name field
            setNewNum('')  // Clear the number field
          })
          .catch(error => {
            console.error('Error updating the person:', error)
          })
      }
    } else {
      // Person doesn't exist, proceed by adding
      const nameObj = {
        name: newName,
        number: newNum
      }
      personsService.create(nameObj)
        .then(returnedName => {
          setPersons(persons.concat(returnedName));
          setNewName('') // Clear the name field
          setNewNum('')  // Clear the number field
        })
        .catch(error => {
          console.error('Error adding the person:', error)
        })
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
      <PersonList persons={filteredPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App