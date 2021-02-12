const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequest = require('../errors/bad-request-error');

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
    } = req.body;
    const movieElem = await Movie.create({
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
    });
    res.send(movieElem);
  } catch (err) {
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
    const deleteElem = await Movie.findByIdAndDelete(movieId)
      .orFail(new NotFoundError('Карточка не найдена'));
    res.send(deleteElem);
  } catch (err) {
    next(err);
  }
};
