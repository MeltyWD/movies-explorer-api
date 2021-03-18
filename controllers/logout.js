module.exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('jwt');
    res.end();
  } catch (err) {
    next(err);
  }
};
