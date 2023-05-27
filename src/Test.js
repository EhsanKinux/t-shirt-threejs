import React, { useState } from 'react';
import axios from 'axios';


const TestComponent = () => {

    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Create a new FormData object
      const formData = new FormData();

      // Append the selected file to the FormData object
      formData.append('file', selectedFile);

      // Make a POST request to your CDN endpoint with the FormData
      axios.post('https://cdn.droplinked.com/uploadFile', formData)
        .then((response) => {
          console.log('File uploaded successfully:', response.data.url);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    } else {
      console.log('No file selected');
    }
  };


  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default TestComponent;
