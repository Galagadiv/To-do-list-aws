# 📝 To-Do List — Serverless Web App

Це повнофункціональний вебзастосунок для управління особистими завданнями. Проєкт побудований з використанням стеку **React + TypeScript + AWS** та реалізує сучасну архітектуру **Serverless**.

## 🔗 Демо

🌐 [Відкрити застосунок](https://us-east-1atoghhejc.auth.us-east-1.amazoncognito.com/login?client_id=16jtunov7n5jlg34414vi7p84u&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fubu9jz8e3f.execute-api.us-east-1.amazonaws.com%2Fdev%2Fcallback)

[Бекенд репозиторій](https://github.com/Galagadiv/To-do-list-aws-backend)

## 📦 Технології

### Frontend

- **React + TypeScript**
- **React Router** — маршрутизація між сторінками
- **MUI (Material UI)** — стильова система та компоненти
- **Fetch API** — запити до бекенду через API Gateway
- **LocalStorage** — зберігання access токена

### Backend (Serverless на AWS)

- **AWS Lambda** — обробка запитів
- **AWS API Gateway** — HTTP API-інтерфейс
- **AWS DynamoDB** — зберігання завдань
- **AWS Cognito** — автентифікація користувачів
- **AWS Amplify** — хостинг фронтенду

## 🔐 Авторизація

- Реєстрація та логін через AWS Cognito
- Після логіну sub частина accessToken зберігається у `localStorage`
- Токен передається до Lambda-функцій через заголовки

## 📋 Функціонал

- 📌 **Список завдань** — перегляд, фільтрація за статусом
- ➕ **Додавання завдань** — через форму
- ✏️ **Редагування завдань** — за унікальним ID
- ✅ **Позначення як виконане** - через подвійний клік
- ❌ **Видалення завдання** - через модалку

## 📂 Структура

```
public/
  404.html
  vite.svg
node_modules
src/
  assets/
    react.svg
  components/
    Header/
      Header.tsx
  global-styles/
    index.css
    reset.css
  pages/
    App/
      App.css
      App.tsx
    ManageTaskPage/
      ManageTaskPage.css
      ManageTaskPage.tsx
    ToDoPage/
      ToDoPage.css
      ToDoPage.tsx
  main.tsx
  vite-env.d.ts
  .env
  eslint.config.js
  index.html
  package-lock.json
  package.json
  tsconfig.app.json
  tsconfig.json
  tsconfig.node.json
```

## ⚙️ Деплой

- Фронтенд: деплой через AWS Amplify. Достатньо закомітити dev гілку, а далі вона автоматично зблідиться та задеплоїться на сайт.
- Бекенд: деплой через `serverless framework`:
  ```bash
  npx serverless deploy
  ```
