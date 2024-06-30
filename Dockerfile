FROM node:20.5.0

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY . /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости и собираем проект
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# Устанавливаем сервер для статических файлов
RUN npm install -g serve

# Запускаем приложение
CMD ["serve", "-s", "dist", "-l", "3000", "--no-clipboard"]
