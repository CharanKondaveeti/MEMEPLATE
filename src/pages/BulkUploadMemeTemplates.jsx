import { useState } from 'react';
import axios from 'axios';
import './css/BulkUploadMemeTemplates.css'; // Create your own CSS file for styling

const BulkUploadMemeTemplates = () => {
  const [files, setFiles] = useState([]);
  const [memeData, setMemeData] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setMemeData(selectedFiles.map(() => ({
      description: '',
      emotion: '',
      movieName: '',
      actors: [],
    })));
  };

  const handleInputChange = (index, field, value) => {
    const newMemeData = [...memeData];
    newMemeData[index][field] = value;
    setMemeData(newMemeData);
  };

  const addActor = (index, actor) => {
    const newMemeData = [...memeData];
    if (actor && !newMemeData[index].actors.includes(actor)) {
      newMemeData[index].actors.push(actor);
    }
    setMemeData(newMemeData);
  };

  const removeActor = (index, actorToRemove) => {
    const newMemeData = [...memeData];
    newMemeData[index].actors = newMemeData[index].actors.filter(actor => actor !== actorToRemove);
    setMemeData(newMemeData);
  };

  const removeImage = (index) => {
    const newFiles = files.filter((_, fileIndex) => fileIndex !== index);
    const newMemeData = memeData.filter((_, dataIndex) => dataIndex !== index);
    setFiles(newFiles);
    setMemeData(newMemeData);
  };

  const handleSave = async () => {
    const formData = new FormData();
    
    // Append all files
    files.forEach((file) => {
      formData.append('memeImages', file);
    });
  
    // Create a structured array of templates
    const templates = memeData.map(data => ({
      description: data.description,
      emotion: data.emotion,
      movieName: data.movieName,
      actors: data.actors.join(', '),
    }));
  
    // Append the templates as a JSON string
    formData.append('templates', JSON.stringify(templates));
  
    try {
      const response = await axios.post('http://localhost:5050/api/templates/bulkUpload', formData);
      console.log('Upload successful:', response.data);
      alert('All templates uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload some templates.');
    }
  };
  

  return (
    <div className="bulk-upload">
      <h2>Bulk Upload Meme Templates</h2>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="image-preview">
        {files.map((file, index) => (
          <div key={index} className="image-item" style={{ position: 'relative' }}>
            <img src={URL.createObjectURL(file)} alt={file.name} className="preview-image" />
            <button className="remove-image-button" onClick={() => removeImage(index)}>
              x
            </button>
            <div>
              <input
                type="text"
                placeholder="Description"
                value={memeData[index]?.description}
                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
              />
              <input
                type="text"
                placeholder="Emotion"
                value={memeData[index]?.emotion}
                onChange={(e) => handleInputChange(index, 'emotion', e.target.value)}
              />
              <input
                type="text"
                placeholder="Movie Name"
                value={memeData[index]?.movieName}
                onChange={(e) => handleInputChange(index, 'movieName', e.target.value)}
              />
              {/* Actor Input */}
              <div className="actor-input">
                <input
                  type="text"
                  placeholder="Add Actor"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addActor(index, e.target.value);
                      e.target.value = ''; // Clear input after adding
                    }
                  }}
                />
              </div>
              {/* Display Added Actors */}
              <div className="people-list">
                {memeData[index]?.actors.map((actor, actorIndex) => (
                  <div key={actorIndex} className="actor-item">
                    {actor}
                    <button onClick={() => removeActor(index, actor)}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save All</button>
    </div>
  );
};

export default BulkUploadMemeTemplates;
