
![Logo](https://sun9-63.userapi.com/impg/LeeTaghBx2bt8OBfjzjVf_kPGBXO7mp3j0FUeQ/f4AvIz0-l6A.jpg?size=1920x1080&quality=95&sign=c7b60fd56e15ced58bfd838e4460a5ea&type=album)


# Cloud - облачное хранилище

Использованы технологии стека MERN


### Серверная часть: 
Node.js, Express.js, JSON Web Token, bcrypt, MongoDB, Mongoose ...

### Клиентская часть: 
React.js, React-Router, Redux, Redux-Thunk ...


## Что умеет

- Создавать папку
- Можно создавать вложенную структуру
- Загружать файл и показывать прогресс загрузки
- Загружать несколько файлов
- Можно использовать Drop and Drag 
- Фильтровать по имени, типу, дате, размеру
- Поиск папок и файлов
- Отображение памяти
- Вид окна можно менять: плитка и таблица
- Удалять файл
- Скачивать файл
**Админу разрешается:** 
- Получить данные о всех пользователях
- Удалить конткретного пользователя
- Выделить пользователей и удалить их 




## Установить и запустить проект на ПК
*Примечание: Должны быть установлены MongoDB, Node.js*

```bash
  
  server/client: npm i
  server: npm run start
  client: npm build
```
    




## API

#### Регистрация

```http
  POST /api/auth/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Минимум 5 символов |
| `password` | `string` | **Required**. Минимум 5 символов |

#### Авторизация

```http
  POST /api/auth/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Минимум 5 символов |
| `password` | `string` | **Required**. Минимум 5 символов |

#### Получение пользователя авторизованного

```http
  GET /api/auth/me
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` |  |
| `password` | `string` |  |
| `diskSpace` | `Number` | Всего памяти |
| `usedSpace` | `Number` | Использованной памяти |
| `avatar` | `string` | Аватарка |
| `files` | `ObjectId` | Файлы с запрашиваемой директории |
| `roles` | `string` | Заполняется автоматически "USER" |

#### Получение всех пользователей 
 
```http
  GET /api/auth/users
```

Примечание: **Доступно только админу**


#### Удаление указанного пользователя
 
```http
  DELETE /api/auth/users/:username
```

Примечание: **Доступно только админу**


#### Создание папки

```http
  POST /api/files
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. |
| `type` | `string` | **Required**. |
| `parent` | `string` | Указывается директория, по умолчанию корневая |


#### Загрузка файла

```http
  POST /api/files/upload
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `file` | `file` | **Required**. |
| `parent` | `string` | Указывается директория, по умолчанию корневая |


#### Получение файлов и папок 

```http
  GET /api/files
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `sort` | `string` |  |
| `parent` | `string` | Указывается директория, по умолчанию корневая |


#### Поиск файлов и папок 

```http
  GET /api/files/search
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `search` | `string` |  |


#### Удаление папки или файла

```http
  DELETE /api/files
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` |  |


#### Скачивание файла

```http
  GET /api/files/download
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` |  |