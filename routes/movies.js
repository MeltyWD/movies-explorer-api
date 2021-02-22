const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getFilms, createFilm, deleteFilm } = require('../controllers/movies');

router.get('/', getFilms);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(57),
    director: Joi.string().required().min(1).max(300),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(100),
    description: Joi.string().required().min(1).max(3000),
    image: Joi.string().required().regex(/(http|https):\/\/(www\.)?([\w-])+(\.\w{2,6})\/?([\w-._~:/?#[\]@!$&'()*+,;=])*#?/),
    trailer: Joi.string().required().regex(/(http|https):\/\/(www\.)?([\w-])+(\.\w{2,6})\/?([\w-._~:/?#[\]@!$&'()*+,;=])*#?/),
    thumbnail: Joi.string().required().regex(/(http|https):\/\/(www\.)?([\w-])+(\.\w{2,6})\/?([\w-._~:/?#[\]@!$&'()*+,;=])*#?/),
    nameRU: Joi.string().required().min(1).max(300),
    nameEN: Joi.string().required().min(1).max(300),
    movieId: Joi.string().required().hex().length(24),
  }),
}), createFilm);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteFilm);

module.exports = router;
