// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint to create a text file
app.post('/createFile', (req, res) => {
  const timestamp = new Date().getTime();
  const filename = `${timestamp}.txt`;
  const content = timestamp.toString();

  const filePath = path.join(__dirname, 'files', filename);

  fs.writeFile(filePath, content, err => {
    if (err) {
      console.error('Error creating file:', err);
      return res.status(500).send('Error creating file');
    }
    console.log('File created successfully:', filePath);
    res.send('File created successfully');
  });
});

// Endpoint to retrieve names of all text files
app.get('/getTextFiles', (req, res) => {
  const folderPath = path.join(__dirname, 'files');

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send('Error reading directory');
    }
    const textFiles = files.filter(file => file.endsWith('.txt'));
    res.json(textFiles);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});