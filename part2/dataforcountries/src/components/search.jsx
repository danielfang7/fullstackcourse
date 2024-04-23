const Search = ({ searchTerm, handleSearchChange }) => (
    <div>
      Find countries: <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  )
  
  export default Search