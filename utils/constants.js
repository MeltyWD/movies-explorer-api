const allowlist = [
  'https://meltyb.students.nomoredomains.icu',
  'http://meltyb.students.nomoredomains.icu',
  'http://localhost:3000',
];

const mongodbUrl = 'mongodb://localhost:27017/filmsbd_diploma';

const mongodbSetting = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const limiterSetting = {
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
};

module.exports = {
  allowlist,
  mongodbUrl,
  mongodbSetting,
  limiterSetting,
};
