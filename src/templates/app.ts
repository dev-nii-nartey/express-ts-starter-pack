//GLOBAL MODULES
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

//LOCAL MODULES
const { apiDocsPage } = require('./routes/api.route');
const errorRoute = require('../../routes/errors.route');

//INITIALIZATION
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

//ROUTES AND MIDDLEWARES
app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works. Happy Coding🚀' });
});

app.use('/api', apiDocsPage);

//ERROR HANDLING ROUTE
app.use(errorRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
