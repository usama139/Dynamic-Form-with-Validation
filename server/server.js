const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const PORT = 5000;

app.use(cors());


app.use(bodyParser.json());


app.post('/save', (req, res) => {
  const formData = req.body;
  
 
  const dataFilePath = path.join(__dirname, 'data.json');

 
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Server error');
    }

    let jsonData = [];

   
    if (data) {
      try {
        jsonData = JSON.parse(data);  
        if (!Array.isArray(jsonData)) {
          jsonData = [];  
        }
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return res.status(500).send('Invalid JSON format in data file');
      }
    }

   
    jsonData.push(formData);

   
    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Server error');
      }

      res.status(200).send('Data saved successfully!');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
