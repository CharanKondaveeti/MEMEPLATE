import axios from 'axios';
import './css/uploadMemePlate.css';
import { useState } from 'react';

export default function UploadMemePlate() {
  const [formData, setFormData] = useState({
    memeImage: null,
    description: '',
    emotion: '',
    movieName: '',
    peopleInMeme: '',
  });

  const [people, setPeople] = useState([]); // State for tracking individual people in the meme

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'memeImage') {
      setFormData({ ...formData, memeImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle the addition of a new person to the list
  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = formData.peopleInMeme.trim();
    if (newPerson && !people.includes(newPerson)) {
      setPeople([...people, newPerson]);
      setFormData({ ...formData, peopleInMeme: '' }); // Clear input field after adding
    }
  };

  // Remove a person from the list
  const removePerson = (personToRemove) => {
    setPeople(people.filter((person) => person !== personToRemove));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('memeImage', formData.memeImage);
    data.append('description', formData.description);
    data.append('emotion', formData.emotion);
    data.append('movieName', formData.movieName);
    data.append('peopleInMeme', people.join(', ')); // Convert array to comma-separated string

    try {
      const response = await axios.post('http://localhost:5050/api/templates/uploadTemplate', data);
      console.log('Upload successful:', response.data);
      alert('Template uploaded successfully!');
    } catch (err) {
      console.error('Upload failed:', err.response ? err.response.data : err);
      alert('Failed to upload the template.');
    }
  };

  return (
    <div className="upload-meme-plate">
      <h2>Upload Meme Template</h2>
      <form onSubmit={handleSubmit}>
        {/* Image Upload Field */}
        <div className="form-group">
          <label htmlFor="memeImage">Upload Image:</label>
          <input
            type="file"
            id="memeImage"
            name="memeImage"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        {/* Description Field */}
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="e.g., Funny meme about crying"
            onChange={handleChange}
            required
          />
        </div>

        {/* Emotion Field */}
        <div className="form-group">
          <label htmlFor="emotion">Emotion:</label>
          <input
            type="text"
            id="emotion"
            name="emotion"
            placeholder="e.g., Sad, Happy"
            value={formData.emotion}
            onChange={handleChange}
            required
          />
        </div>

        {/* Movie Name Field */}
        <div className="form-group">
          <label htmlFor="movieName">Movie Name:</label>
          <input
            type="text"
            id="movieName"
            name="movieName"
            placeholder="e.g., Manam, Gabbar Singh"
            value={formData.movieName}
            onChange={handleChange}
            required
          />
        </div>

        {/* People in the Meme Field */}
        <div className="form-group">
          <label htmlFor="peopleInMeme">People in the Meme:</label>
          <div className="actor-input">
            <input
              type="text"
              id="peopleInMeme"
              name="peopleInMeme"
              placeholder="e.g., Brahmanandam, Ali"
              value={formData.peopleInMeme}
              onChange={handleChange}
            />
            <button className="add-actor-button" onClick={addPerson}>
              Add
            </button>
          </div>
        </div>

        {/* Display Added People */}
        <div className="people-list">
          {people.map((person, index) => (
            <div className="person-item" key={index}>
              {person}
              <button className="remove-person" onClick={() => removePerson(person)}>
                x
              </button>
            </div>
          ))}
        </div>

        {/* Upload Button */}
        <button type="submit">Upload Template</button>
      </form>
    </div>
  );
}
