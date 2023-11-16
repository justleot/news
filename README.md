## Конфигурация проекта
В файле `.env` указываются URI для подключения к MySQL, настройки для JWT token и JWT refresh token

### Параметры подключения к MySQL:

- `MYSQL_HOST` - хост
- `MYSQL_PORT` - порт
- `MYSQL_DB` - база данных (создается автоматически)
- `MYSQL_USER` - имя пользователя
- `MYSQL_PASSWORD` - пароль пользователя

### Параметры JWT:
- `JWT_SECRET` - секретный ключ для token
- `JWT_EXPIRATION_TIME` - время жизни для token
- `JWT_REFRESH_SECRET` - секретный ключ для refresh token
- `JWT_REFRESH_EXPIRATION_TIME` - время жизни для refresh token


## Запуск в Docker Compose
Для запуска необходимы установленные Docker и Docker Compose

Скрипт установки и запуска:
```bash
$ docker-compose up
```

## Endpoints:
- регистрация: http://localhost:3000/auth/sign-up
- логин: http://localhost:3000/auth/sign-in
- новости: http://localhost:3000/news
- документация к api: http://localhost:3000/docs/
