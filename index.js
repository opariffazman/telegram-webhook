const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const bot = new Telegraf(process.env.TOKEN)

app.post('/', (req, res) => {
  const json = req.body
  const chatId = json.message.chat.id
  const text = json.message.text

  if (text == 'hello') {
    bot.telegram.sendMessage(chatId, 'hello', {})

  }

  if (text == 'salam') {
    bot.telegram.sendMessage(chatId, 'wasalam', {})
  }

  console.log(`text: ${text} chatId: ${chatId} `)
  res.status(200).json('webhook received')
})

const port = 8443 //|| 443 || 80 || 88 only ports for telegram
app.listen(port, () => {
  console.log(`telegram-webhook listening on ${port}`)
})
