'use strict';

module.exports = (err, req, res, next) => {
  res.status(500).json({
    error: 500,
    query: req.query,
    body: req.body,
    route: req.originalUrl,
    message: `SERVER ERROR: ${err.message}`,
  });
};