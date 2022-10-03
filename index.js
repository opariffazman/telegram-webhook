const { Telegraf } = require('telegraf')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const bot = new Telegraf(process.env.BOT_TOKEN)

// Set the bot API endpoint
bot.on("text", ctx => ctx.reply("Hello"));

app.post('/', (req, res) => {
  const chatJson = req.body

  bot.telegram.sendMessage(chatJson.message.chat.id, 'test', {})
  console.log('webhook received')
  res.status(200).json('webhook received')
})

const port = process.env.PORT || 443 || 80 || 88 || 8443
app.listen(port, () => {
  console.log(`webhook listening on ${port}`)
})
