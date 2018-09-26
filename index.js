import 'dotenv/config';
import express from 'express';
import v1 from './src/v1/routes';

const app = express();

app.get('/', (req, res) => {
  res.redirect('/v1'); // Redirect to current version of the API
});

// Api documentation
app.use('/v1', express.static(__dirname + '/public'));


// Api endpoints
app.use('/v1', v1);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Local Food Nodes API running on port ${process.env.PORT}...`)
});