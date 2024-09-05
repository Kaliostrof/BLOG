Области хранения данных:

-   база данных на json-server
-   BFF
-   Redux Store

Сущности приложения:

-   пользователь: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
-   роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), стор (использование на клиенте)
-   статья: БД (список статей), стор (отображение в браузере)
-   комментарииЖ БД (список комментов), стор (отображение в браузере)

Таблицы БД:

-   пользователи - users: id / login / password / registred_at / role_id
-   роли - roles: id / name
-   статья - posts: id / title / image_url / content / published_at
-   комментарии - comments: id / author_id / post_id / content

Схема состояния на BFF:

-   сессия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте):

-   user: id / login / roleId / session
-   posts: id / title / imageUrl / content / publishedAt / comments: массив comment: author / content / publishedAt
-   users: массив user: id / login / registeredAt / role
