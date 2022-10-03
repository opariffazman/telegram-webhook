const { Telegraf } = require('telegraf')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const bot = new Telegraf(process.env.BOT_TOKEN)

const botFunctions = (reqBody) => {
  const json = reqBody
  const chatId = json.message.chat.id
  const text = json.message.text

  if (text == 'hello') {
    bot.telegram.sendMessage(chatId, 'hello', {})

  }

  if (text == 'salam') {
    bot.telegram.sendMessage(chatId, 'wasalam', {})
  }

  bot.telegram.sendMessage(chatId, 'yo', {})

  console.log(`text: ${text} chatId: ${chatId} `)
}

app.post('/', (req, res) => {
  botFunctions(req.body)
  res.status(200).json('webhook received')
})

const port = 443 || 80 || 88 || 8443 // only ports for telegram webhooks
app.listen(port, () => {
  console.log(`telegram webhook listening on ${port}`)
})
