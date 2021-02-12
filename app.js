const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  allowlist, mongodbUrl, mongodbSetting, limiterSetting,
} = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();

app.use(rateLimit(limiterSetting));

app.use(cors({
  origin: allowlist,
  credentials: true,
}));

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(mongodbUrl, mongodbSetting);

app.use(requestLogger); // подключаем логгер запросов

app.use('/api/', require('./routes/index'));

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(require('./utils/error-handler'));

app.listen(PORT, () => {});
