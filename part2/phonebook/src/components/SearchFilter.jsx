const SearchFilter = ({ searchTerm, handleSearchChange }) => {
    return (
      <div>
        Filter Shown With: <input value={searchTerm} onChange={handleSearchChange} />
      </div>
    )
  }

export default SearchFilter
