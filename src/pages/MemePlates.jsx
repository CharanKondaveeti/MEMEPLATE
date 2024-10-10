import axios from 'axios';
import './css/memePlates.css';
import { useEffect, useState } from 'react';
import Header from '../features/Header';
import Masonry from 'react-masonry-css';

const MemePlatesGallery = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movieCategories, setMovieCategories] = useState({});

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/templates/getAlltemplates');
        const fetchedTemplates = response.data.data;
        setTemplates(fetchedTemplates);
        setFilteredTemplates(fetchedTemplates);
        setLoading(false);

        // Grouping templates by movie
        const categorizedByMovies = fetchedTemplates.reduce((categories, template) => {
          const movie = template.movieName.trim(); // Get the movie name and trim any extra whitespace
          
          if (!categories[movie]) {
            categories[movie] = []; // Create an array for the movie if it doesn't exist
          }
          categories[movie].push(template); // Push the template into the corresponding movie array
          return categories;
        }, {});

        setMovieCategories(categorizedByMovies); // Set the categorized movies
      } catch (error) {
        console.error('Error fetching templates:', error);
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleSearch = (peopleInMeme, description, movieName) => {
    const lowerCasedescription = description.toLowerCase();
    const lowerCaseMovieName = movieName.toLowerCase();
    const lowerCasePeople = peopleInMeme.map(person => person.toLowerCase());
  
    const filtered = templates.filter(template => {
      const templatedescription = template.description.toLowerCase();
      const templateMovieName = template.movieName.toLowerCase();
      const templatePeople = template.peopleInMeme.map(person => person.toLowerCase());
  
      const descriptionMatches = lowerCasedescription ? templatedescription.includes(lowerCasedescription) : true;
      const movieMatches = lowerCaseMovieName ? templateMovieName.includes(lowerCaseMovieName) : true;
      const peopleMatch = lowerCasePeople.every(person => templatePeople.includes(person));
  
      return descriptionMatches && movieMatches && peopleMatch;
    });
    console.log(filtered);
    setFilteredTemplates(filtered);
  };

  if (loading) {
    return <div className="loading">Loading templates...</div>;
  }

  // Breakpoints for responsive masonry layout
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  const getLowQualityImage = (url) => {
    return url.replace('/upload/', '/upload/q_auto:low,w_300/'); // Adjust quality and width as needed
  };

  return (
    <main>
      <Header onSearch={handleSearch} />

      {/* Memes by Movie Section */}
      <section className="movie-section">
        <h2>Memes by Movie</h2>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="template-gallery"
          columnClassName="template-gallery-column"
        >
          {Object.keys(movieCategories).map(movie => (
            <div className="template-card" key={movie}>
              <h3>{movie}</h3>
              {movieCategories[movie].length > 0 && (
                <img
                  src={getLowQualityImage(movieCategories[movie][0].memeImage)} // Get the first meme image for the movie
                  alt={`Meme from ${movie}`}
                  className="template-image"
                />
              )}
              <p>{movieCategories[movie].length} memes</p> {/* Display the count of memes for this movie */}
            </div>
          ))}
        </Masonry>
      </section>

      {/* Templates Section */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="template-gallery"
        columnClassName="template-gallery-column"
      >
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <div className="template-card" key={template._id}>
              <img src={getLowQualityImage(template.memeImage)} alt={template.description} className="template-image" />
              <div className="template-info">
                <h3>{template.description}</h3>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No templates found matching your criteria</div>
        )}
      </Masonry>
    </main>
  );
};

export default MemePlatesGallery;
