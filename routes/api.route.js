const router = require('express').Router();

const apiTest = router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

const apiDocsPage = router.get('/docs', async (req, res, next) => {
  res.send({ message: 'My other page🚀' });
});

module.exports = { apiDocsPage, apiTest };
