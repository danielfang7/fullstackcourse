import React, { useState, useEffect } from 'react'
import countriesService from './service/countries'
import Search from './components/search'
import Countries from './components/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <Countries countries={filteredCountries} />
    </div>
  )

}
export default App
