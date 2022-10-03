const { Telegraf } = require('telegraf')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const token = process.env.TOKEN
const bot = new Telegraf(token)

app.post(`/webhook/${token}`, (req, res) => {
  const json = req.body
  const chatId = json.message.chat.id
  const text = json.message.text


  bot.telegram.sendMessage(chatId, 'Welcome', {})

  console.log(`text: ${text} chatId: ${chatId} `)
  res.status(200).json('webhook received')
})

const port = 8443 //|| 443 || 80 || 88 only ports for telegram
app.listen(port, () => {
  console.log(`telegram-webhook listening on ${port}`)
})
