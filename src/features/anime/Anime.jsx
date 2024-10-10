import './Anime.css'; // Make sure to create Anime.css for styling
import one from './logos/one.PNG'
import two from './logos/two.PNG'
import three from './logos/three.PNG'

const Anime = () => {

  return (
    <div className='parent'>
        <div className='child'>
        <div>
      <img
        src={one}
        alt="Loading 1"
        className="loading-image image1"
      />
      </div>
      <div>
      <img
        src={two}
        alt="Loading 2"
        className="loading-image image2"
      />
      </div>
      <div>
      <img
        src={three}
        alt="Loading 3"
        className="loading-image image3"
      />
      </div>

    <main className="text-reveal-container">
        <p className="hidden-text">Intellibotics</p>
      </main>
      </div>
    </div>
  );
};

export default Anime;
