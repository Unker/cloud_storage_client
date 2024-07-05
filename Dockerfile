FROM node:20.5.0

# Отключаем Husky
ENV HUSKY=0

ENV APP_HOME=/app

# Устанавливаем рабочую директорию
WORKDIR $APP_HOME

# Копируем package.json и package-lock.json
COPY package*.json $APP_HOME

# Устанавливаем зависимости и собираем проект
RUN npm install

# Копируем остальной исходный код в рабочий каталог
COPY . $APP_HOME

# Копируем остальные файлы проекта
COPY .env $APP_HOME

# Собираем проект
RUN npm run build

# Устанавливаем сервер для статических файлов
RUN npm install -g serve

# Запускаем приложение
CMD ["serve", "-s", "dist", "-l", "3000", "--no-clipboard"]
