// src/middleware/errorHandler.js

function errorHandler(err, req, res, next) {
  // Log the error for debugging
  console.error(err);

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(el => el.message);
      return res.status(422).json({ errors });
  }

  // Handle Mongoose CastError (e.g., invalid ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid ObjectId' });
  }

  // Handle MongoDB duplicate key error
  if (err.code && err.code === 11000) {
      return res.status(409).json({ error: 'Duplicate key error' });
  }

  // Handle unauthorized access errors
  if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Unauthorized access' });
  }

  // Handle syntax errors (e.g., malformed JSON)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({ error: 'Bad request: Malformed JSON' });
  }

  // Handle other types of errors (e.g., custom application errors)
  if (err.status) {
      return res.status(err.status).json({ error: err.message });
  }

  // Handle all other errors with a generic message
  res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = errorHandler;