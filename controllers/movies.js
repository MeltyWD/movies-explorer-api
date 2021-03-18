const Movie = require('../models/movie');
const BadRequest = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const {
  movieCreateConflictMessage,
  badRequestMessage,
} = require('../utils/messages');

module.exports.getFilms = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

module.exports.createFilm = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const findMovie = await Movie.find({ movieId });
  if (findMovie.length === 0) {
    try {
      const movieElem = await Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        owner: req.user._id,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
      });
      res.send(movieElem);
    } catch (err) {
      if (err.code === 11000) {
        const conflictError = new ConflictError(movieCreateConflictMessage);
        next(conflictError);
      }
      if (err.name === 'ValidationError') {
        const badRequestError = new BadRequest(badRequestMessage);
        next(badRequestError);
      }
      next(err);
    }
  } else {
    try {
      const addOwner = await Movie.findOneAndUpdate(
        { movieId },
        { $addToSet: { owner: req.user._id } }, // добавить _id в массив, если его там нет
        { new: true },
      );
      res.send(addOwner);
    } catch (err) {
      if (err.code === 11000) {
        const conflictError = new ConflictError(movieCreateConflictMessage);
        next(conflictError);
      }
      if (err.name === 'ValidationError') {
        const badRequestError = new BadRequest(badRequestMessage);
        next(badRequestError);
      }
      next(err);
    }
  }
};

module.exports.deleteFilm = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    const deleteOwner = await Movie.findOneAndUpdate(
      { movieId },
      { $pull: { owner: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    res.send(deleteOwner);
  } catch (err) {
    next(err);
  }
};
