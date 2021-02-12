const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequest = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const ConflictError = require('../errors/conflict-error');

module.exports.getFilms = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

module.exports.createFilm = async (req, res, next) => {
  try {
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
      const conflictError = new ConflictError('Фильм с таким Id уже существует');
      next(conflictError);
    }
    if (err.name === 'ValidationError') {
      const badRequestError = new BadRequest('Переданы некорректные данные');
      next(badRequestError);
    }
    next(err);
  }
};

module.exports.deleteFilm = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const findMovie = await Movie.findById(movieId).select('+owner')
      .orFail(new NotFoundError('Фильм не найден'));
    if (findMovie.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Нет прав на удаление');
    } else {
      const deleteElem = await Movie.findByIdAndDelete(movieId).select('-owner');
      res.send(deleteElem);
    }
  } catch (err) {
    next(err);
  }
};
