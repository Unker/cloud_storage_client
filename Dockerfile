FROM node:20.5.0

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY . /app

RUN apt-get update \
    && apt-get install xsel

# Устанавливаем зависимости и собираем проект
RUN npm install
RUN npm run build

# Устанавливаем сервер для статических файлов
RUN npm install -g serve

# Запускаем приложение
CMD ["serve", "-s", "dist", "-l", "3000"]
