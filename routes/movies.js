const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getFilms, createFilm, deleteFilm } = require('../controllers/movies');

router.get('/', getFilms);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(3000),
    director: Joi.string().required().min(1).max(3000),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(100),
    description: Joi.string().required().min(1).max(30000),
    image: Joi.string().required().regex(/(http|https):\/\/(www\.)?([\w-])+(\.\w{2,6})\/?([\w-._~:/?#[\]@!$&'()*+,;=])*#?/),
    trailer: Joi.string().required().regex(/(http|https):\/\/(www\.)?([\w-])+(\.\w{2,6})\/?([\w-._~:/?#[\]@!$&'()*+,;=])*#?/),
    thumbnail: Joi.string().required().regex(/(http|https):\/\/(www\.)?([\w-])+(\.\w{2,6})\/?([\w-._~:/?#[\]@!$&'()*+,;=])*#?/),
    nameRU: Joi.string().required().min(1).max(3000),
    nameEN: Joi.string().required().min(1).max(3000),
    movieId: Joi.number().required(),
  }),
}), createFilm);
router.delete('/', celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
}), deleteFilm);

module.exports = router;
