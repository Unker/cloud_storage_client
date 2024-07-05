FROM node:20.5.0

# Отключаем Husky
ENV HUSKY=0

ENV APP_HOME=/app

# Устанавливаем рабочую директорию
WORKDIR $APP_HOME

# Копируем файлы проекта
COPY . $APP_HOME

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости и собираем проект
RUN npm install

# Копируем остальные файлы проекта
COPY .env .

# Собираем проект
RUN npm run build

# Устанавливаем сервер для статических файлов
RUN npm install -g serve

# Запускаем приложение
CMD ["serve", "-s", "dist", "-l", "3000", "--no-clipboard"]
