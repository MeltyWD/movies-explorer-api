const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequest = require('../errors/bad-request-error');

module.exports.getFilms = (req, res, next) => {
  Movie.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.createFilm = (req, res, next) => {
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

  Movie.create({
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
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const badRequestError = new BadRequest('Переданы некорректные данные');
        next(badRequestError);
      }
      next(err);
    });
};

module.exports.deleteFilm = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then(() => {
      Movie.findByIdAndDelete(movieId)
        .populate(['owner', 'likes'])
        .then((data) => res.send(data));
    })
    .catch(next);
};
