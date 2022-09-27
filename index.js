'use strict';

const { sequelizeDB } = require('./src/models');
const { app } = require('./src/server');
const PORT = process.env.PORT || 3002;
require('dotenv').config();

sequelizeDB
  .sync()
  .then(() => console.log('Database connection successful.'))
  .catch(err => console.error(err.message));

app.listen(PORT, () => {
  console.log(`Server started. Listening on port ${PORT}`);
});