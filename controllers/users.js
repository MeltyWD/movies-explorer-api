const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};
