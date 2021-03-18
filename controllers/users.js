const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const { userCreateConflictMessage, userNotFoundMessage } = require('../utils/messages');
const ConflictError = require('../errors/conflict-error');

module.exports.getUserProfile = async (req, res, next) => {
  try {
    const findUser = await User.findById(req.user._id)
      .orFail(new NotFoundError(userNotFoundMessage));
    res.send(findUser);
  } catch (err) {
    next(err);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const findUser = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
      },
    ).orFail(new NotFoundError(userNotFoundMessage));
    res.send(findUser);
  } catch (err) {
    if (err.code === 11000) {
      const conflictError = new ConflictError(userCreateConflictMessage);
      next(conflictError);
    } else {
      next(err);
    }
  }
};
