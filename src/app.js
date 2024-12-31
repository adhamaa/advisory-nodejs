const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');

require('dotenv').config();
const app = express();

app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api/listing', listingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
