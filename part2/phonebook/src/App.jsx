import { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm'
import SearchFilter from './components/SearchFilter'
import PersonList from './components/PersonList'
import personsService from './service/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState({ message: null, isError: false })

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
          alert(`Information of '${person}' has already been removed from server`);
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
            setNotification({ message:`Added '${existingPerson.name}''s number to the Phonebook`, isError: false})
            setTimeout(() => {
              setNotification({message: null, isError: false})
            }, 5000)
          })
          .catch(error => {
            setNotification({ message:`Information of '${existingPerson.name}' has already been removed from server`,  isError: true})
            setTimeout(() => {
              setNotification({message: null, isError: false})
            }, 5000)
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
          setNotification({ message: `Added '${returnedName.name}' to the Phonebook`, isError: false})
          setTimeout(() => {
            setNotification({message: null, isError: false})
          }, 5000)
        })
        .catch(error => {
          setNotification({ message: `Error adding '${returnedName.name}' to the Phonebook`, isError: true})
          setTimeout(() => {
            setNotification({message: null, isError: false})
          }, 5000)
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
      <Notification message={notification.message} isError={notification.isError} />
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