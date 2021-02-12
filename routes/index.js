const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/signin', require('./signin'));
router.use('/signup', require('./signup'));

router.use(require('../middlewares/auth'));

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
