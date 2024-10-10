import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/homepage.css';
import Header from "./../features/Header"

const Homepage = () => {
  const [memes, setMemes] = useState([]);
  const [actorCategories, setActorCategories] = useState({});
  const [movieCategories, setMovieCategories] = useState({});
  const [searchActor, setSearchActor] = useState('');
  const [searchMovie, setSearchMovie] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/templates/getAlltemplates');
        const fetchedMemes = response.data.data || [];

        const categorizedByActors = fetchedMemes.reduce((categories, meme) => {
          const actors = meme.peopleInMeme;
          if (actors && actors.length > 0) {
            actors.forEach(actor => {
              if (!categories[actor]) {
                categories[actor] = [];
              }
              categories[actor].push(meme);
            });
          }
          return categories;
        }, {});

        const categorizedByMovies = fetchedMemes.reduce((categories, meme) => {
          const movie = meme.movieName;
          if (!categories[movie]) {
            categories[movie] = [];
          }
          categories[movie].push(meme);
          return categories;
        }, {});

        setMemes(fetchedMemes);
        setActorCategories(categorizedByActors);
        setMovieCategories(categorizedByMovies);
      } catch (error) {
        console.error('Error fetching memes:', error);
        setMemes([]);
      }
    };

    fetchMemes();
  }, []);

  const filteredActors = Object.keys(actorCategories).filter(actor => 
    actor.toLowerCase().includes(searchActor.toLowerCase())
  );

  const filteredMovies = Object.keys(movieCategories).filter(movie => 
    movie.toLowerCase().includes(searchMovie.toLowerCase())
  );

  // Navigate to the filtered view on click
  const handleActorClick = (actor) => {
    navigate(`/memegallery/?actorname=${actor}`);
  };

  const handleMovieClick = (movie) => {
    navigate(`/memegallery/?moviename=${movie}`);
  };

  return (
    <div className="homepage">
      <section className="actor-section">

        <div className='h2--input'>
        <h2>Memes by Actor</h2>
        <input 
          type="text" 
          placeholder="Search Actor..." 
          value={searchActor}
          onChange={(e) => setSearchActor(e.target.value)} 
          className="search-bar"
        />
</div>

        <div className="actor-carousel">
          {filteredActors.map((actor) => (
            <div 
              key={actor} 
              className="actor-card"
              onClick={() => handleActorClick(actor)} // Navigate to the actor-specific memes
            >
              {actorCategories[actor].length > 0 && (
                <img
                src={actorCategories[actor][0].memeImage}
                alt={`Meme from ${actor}`}
                className="actor-image"
                />
              )}
              <h3>{actor}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="movie-section">

      <div className='h2--input'>
        <h2>Memes by Movie</h2>
        <input 
          type="text" 
          placeholder="Search Movie..." 
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)} 
          className="search-bar"
        />
        </div>

        <div className="movie-carousel">
          {filteredMovies.map((movie) => (
            <div 
              key={movie} 
              className="movie-card"
              onClick={() => handleMovieClick(movie)} // Navigate to the movie-specific memes
            >
              {movieCategories[movie].length > 0 && (
                  <img className="actor-image" src={movieCategories[movie][0].memeImage} alt={`Meme from ${movie}`} />
              )}
              <h3>{movie}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
