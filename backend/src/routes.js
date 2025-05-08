const express = require('express')
const router = express.Router()
const OpenAI = require('openai')

const token = process.env.API_KEY;

// Валидация данных формы
const validateFormData = (req, res, next) => {
  const { ask } = req.body
  if (!ask) {
    return res.status(400).json({ error: 'Отправьте свой вопрос' })
  }
  next()
}

const client = new OpenAI({
    baseURL: "https://models.github.ai/inference",
    apiKey: token
});

// Обработчик POST-запроса
router.post('/submit-form', validateFormData, async (req, res) => {
  const { ask } = req.body
  
  // Здесь можно добавить логику сохранения данных
  console.log('Received form data:', { ask})
  const response = await client.chat.completions.create({
    messages: [
      { role:"system", content: "" },
      { role:"user", content: ask }
    ],
    model: "openai/gpt-4o",
    temperature: 1,
    max_tokens: 4096,
    top_p: 1
  });

  console.log(response.choices[0].message.content);
  const message = response.choices[0].message.content;

  res.status(200).json({
    success: true,
    message: message,
    data: { response }
  })
})

module.exports = router