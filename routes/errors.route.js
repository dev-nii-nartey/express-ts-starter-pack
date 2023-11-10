const createError = require('http-errors');
const router = require('express').Router();

//ERROR HANDLING
router.use((req, res, next) => {
  next(createError.NotFound());
});

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

module.exports = router;
