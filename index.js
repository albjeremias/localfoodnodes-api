import 'dotenv/config';
import express from 'express';
import v1_0 from './src/v1.0/router';

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-CSRF-Token');
  next();
});

app.get('/', (req, res) => {
  res.redirect('/v1.0/'); // Redirect to current version of the API
});

// Api endpoints
app.use('/v1.0', v1_0);

// Api documentation
app.use('/v1.0/', express.static(__dirname + '/public'));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Local Food Nodes API running on port ${process.env.PORT}...`)
});