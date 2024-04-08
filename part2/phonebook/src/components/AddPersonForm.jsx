const AddPersonForm = ({ addInfo, newName, handleNameChange, newNum, handleNumChange }) => {
    return (
      <form onSubmit={addInfo}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNum} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  export default AddPersonForm