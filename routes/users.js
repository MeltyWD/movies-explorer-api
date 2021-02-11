const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserId, getUserProfile, updateProfile,
} = require('../controllers/users');

router.get('/me', getUserProfile);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.get('/', getUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserId);

module.exports = router;
