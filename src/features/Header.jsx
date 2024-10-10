import { useState } from 'react';
import './css/Header.css'; // Import your CSS file

const Header = ({ onSearch }) => {
  // State for inputs: peopleInMeme, emotion, and movieName
  const [peopleInputs, setPeopleInputs] = useState(['']);
  const [simpleSearch, setSimpleSearch] = useState('');
  const [movieName, setMovieName] = useState('');

  // State to toggle between simple and advanced search
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  // Update people input fields dynamically
  const handlePeopleChange = (index, value) => {
    const updatedInputs = [...peopleInputs];
    updatedInputs[index] = value;
    setPeopleInputs(updatedInputs);
  };

  // Add a new person input field (limit to 2)
  const addPeopleInput = () => {
    if (peopleInputs.length < 2) {
      setPeopleInputs([...peopleInputs, '']);
    }
  };

  // Trigger the onSearch function passed down as a prop
  const handleSearch = () => {
    if (isAdvancedSearch) {
      onSearch(peopleInputs, simpleSearch, movieName);
    } else {
      onSearch([], simpleSearch, ''); // Use only emotion for the simple search
    }
  };

  // Toggle between simple and advanced search
  const toggleAdvancedSearch = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
  };

  return (
    <header className="app-header">
      <p>memeplate</p>

      {/* <div className="search-filters"> */}

        {/* <input
          type="text"
          placeholder="search brahmanandham crying..."
          value={simpleSearch}
          onChange={(e) => setSimpleSearch(e.target.value)}
        /> */}

        {/* Conditionally Render Additional Inputs for Advanced Search */}
        {/* {isAdvancedSearch && (
          <>
            <div className="people-inputs">
              {peopleInputs.map((person, index) => (
                <div className="people-input-group" key={index}>
                  <input
                    type="text"
                    placeholder="Person in Meme"
                    value={person}
                    onChange={(e) => handlePeopleChange(index, e.target.value)}
                  />
                  {index === peopleInputs.length - 1 && peopleInputs.length < 2 && (
                    <button className="add-person" onClick={addPeopleInput}>+</button>
                  )}
                </div>
              ))}
            </div>

            <input
              type="text"
              placeholder="Movie Name"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            />
          </>
        )} */}

        {/* Search Button */}
        {/* <button className="search-button" onClick={handleSearch}>Search</button> */}

        {/* Button to Toggle Advanced Search */}
        {/* <button className="toggle-button" onClick={toggleAdvancedSearch}>
          {isAdvancedSearch ? 'Switch to Simple Search' : 'Advanced Search'}
        </button> */}
      {/* </div> */}
    </header>
  );
};

export default Header;
