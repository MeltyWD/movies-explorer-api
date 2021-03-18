const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 3000,
  },
  director: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 3000,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30000,
  },
  image: {
    type: String,
    required: true,
    validate(value) {
      const urlPattern = /(http|https):\/\/(www\.)?([\w-])+(\.\w{2,6})\/?([\w-._~:/?#[\]@!$&'()*+,;=])*#?/;
      const urlRegExp = new RegExp(urlPattern);
      return value.match(urlRegExp);
    },
    message: (props) => `${props.value} не действительный URL`,
  },
  trailer: {
    type: String,
    required: true,
    validate(value) {
      const urlPattern = /(http|https):\/\/(www\.)?([\w-])+(\.\w{2,6})\/?([\w-._~:/?#[\]@!$&'()*+,;=])*#?/;
      const urlRegExp = new RegExp(urlPattern);
      return value.match(urlRegExp);
    },
    message: (props) => `${props.value} не действительный URL`,
  },
  thumbnail: {
    type: String,
    required: true,
    validate(value) {
      const urlPattern = /(http|https):\/\/(www\.)?([\w-])+(\.\w{2,6})\/?([\w-._~:/?#[\]@!$&'()*+,;=])*#?/;
      const urlRegExp = new RegExp(urlPattern);
      return value.match(urlRegExp);
    },
    message: (props) => `${props.value} не действительный URL`,
  },
  owner: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  }],
  nameRU: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 3000,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 3000,
  },
  movieId: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
