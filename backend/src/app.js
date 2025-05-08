const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: 'http://localhost:5173' // URL вашего фронтенда
}))
app.use(express.json())

// Подключаем маршруты
app.use('/api', routes)

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})