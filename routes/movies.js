const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getFilms, createFilm, deleteFilm } = require('../controllers/movies');

router.get('/', getFilms);
router.post('/', createFilm);
router.delete('/:movieId', deleteFilm);

module.exports = router;
