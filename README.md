# Бекэнд REST API для [Дипломной работы](https://github.com/MeltyWD/movies-explorer-frontend)

## Создана в рамках учебы в [Яндекс.Практикум](https://praktikum.yandex.ru/) на курсе ["Веб-разработчик"](https://praktikum.yandex.ru/web/).

## Описание:

REST API для [Дипломной работы](https://github.com/MeltyWD/movies-explorer-frontend), связанное с базой данных MongoDB. При запуске приложения оно подключается к серверу mongo по адресу: `mongodb://localhost:27017/diploma`.

Страница дипломной работы - [https://api.meltyb.students.nomoredomains.icu/api/](https://api.meltyb.students.nomoredomains.icu/api/) 
Публичный IP адресс - 130.193.40.106

## Функционал:

### Роуты авторизации пользователей:

* POST /signup - создает пользователя с переданными в теле запроса;
* POST /signin - авторизирует пользователя с переданными в теле запроса;

### Роуты для пользователей: 

* GET /users/me - возвращает данные авторизированного пользоователя; 
* PATCH /users/me - редактирует свои данные;

### Роуты для карточек:

* GET /movies - возвращает все сохранённые пользователем фильмы; 
* POST /movies - создаёт фильм с переданными в теле запроса; 
* DELETE /movies/:movieId - удаляет сохранённый фильм по _id; 

## Технологии:

* expressjs
* API REST 
* MongoDB 

## Инструкция по установке:

Клонировать репозиторий:

* `git clone https://github.com/MeltyWD/movies-explorer-api.git`

В директории проекта запустить приложение в режиме разработки:

* `npm install` - устанавливает зависимости; 
* `npm run dev` - запускает сервер; 
* `npm run start` - запускает сервер с hot-reload;

## Языки:

* JavaScript

## Библиотеки:

* expressjs

## База данных: 

* MongoDB (сопоставитель Mongoose)

## Чеклист дипломной работы:

* [Чеклист](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html) 
