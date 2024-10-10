import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import Select from 'react-select';
import './css/memegallery.css'; // Custom CSS for styling
import Homepage from './Homepage';
import { LiaGreaterThanSolid } from "react-icons/lia";

const MemeGallery = () => {
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [allMemes, setAllMemes] = useState([]);
  const [selectedActor, setSelectedActor] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const actorName = searchParams.get('actorname') || '';
    const movieName = searchParams.get('moviename') || '';

    // Set initial state values for actor and movie based on URL params
    setSelectedActor(actorName);
    setSelectedMovie(movieName);

    const fetchMemes = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/templates/getAlltemplates');
        const fetchedMemes = response.data.data || [];
        setAllMemes(fetchedMemes);

        // Apply initial filtering based on the URL params
        const result = fetchedMemes.filter((meme) =>
          actorName ? meme.peopleInMeme.includes(actorName) : meme.movieName === movieName
        );
        setFilteredMemes(result);
      } catch (error) {
        console.error('Error fetching memes:', error);
        setFilteredMemes([]);
      }
    };

    fetchMemes();
  }, [location.search]);

  // Handle Filtering based on dropdown selections
  const handleFilterChange = () => {
    let filtered = allMemes;

    if (selectedActor) {
      filtered = filtered.filter((meme) => meme.peopleInMeme.includes(selectedActor));
    }

    if (selectedMovie) {
      filtered = filtered.filter((meme) => meme.movieName === selectedMovie);
    }

    setFilteredMemes(filtered);
  };

  // Extract unique actors and movies for dropdown options
  const uniqueActors = Array.from(new Set(allMemes.flatMap((meme) => meme.peopleInMeme)));
  const uniqueMovies = Array.from(new Set(allMemes.map((meme) => meme.movieName)));

  // Define options for dropdowns
  const actorOptions = uniqueActors.map((actor) => ({ value: actor, label: actor }));
  const movieOptions = uniqueMovies.map((movie) => ({ value: movie, label: movie }));

  // Define the breakpoints for the masonry layout
  const breakpointColumnsObj = {
    default: 5, // Default to 4 columns
    1100: 4, // 3 columns for screens less than 1100px wide
    700: 3, // 2 columns for screens less than 700px wide
    500: 2, // 1 column for screens less than 500px wide
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: '1.4rem',
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '1.4rem',
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '1.4rem',
    }),
  };

  return (
    <div className="meme-gallery">

      <h2>
        {location.search.includes('actorname')
          ? <p> <span> <Link className='link-a-homepage' to="/homepage">Homepage </Link><LiaGreaterThanSolid style={{fontSize:'1rem', margin:'0rem 1rem'}} /></span> <span className='navi'>{new URLSearchParams(location.search).get('actorname')}</span></p>
          : `Homepage > ${new URLSearchParams(location.search).get('moviename')}`}
      </h2>

      {/* Filter and Sorting Options */}
      <div className="filter-options">
        <div className="select-wrapper">
          <label>Select Actor</label>
          <Select
          styles={customStyles}
            options={actorOptions}
            value={selectedActor ? { value: selectedActor, label: selectedActor } : null}
            onChange={(option) => setSelectedActor(option ? option.value : '')}
            placeholder="Filter by Actor"
          />
        </div>
        <div className="select-wrapper">
          <label>Select Movie</label>
          <Select
            styles={customStyles}
            options={movieOptions}
            value={selectedMovie ? { value: selectedMovie, label: selectedMovie } : null}
            onChange={(option) => setSelectedMovie(option ? option.value : '')}
            placeholder="Filter by Movie"
          />
        </div>
        <button onClick={handleFilterChange} className="filter-button">
          Apply Filters
        </button>
      </div>

      {/* Use Masonry for the image layout */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="meme-grid"
        columnClassName="meme-grid-column"
      >
        {filteredMemes.map((meme) => (
          <div key={meme._id} className="meme-item">
            <img src={meme.memeImage} alt={meme.movieName} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default MemeGallery;
