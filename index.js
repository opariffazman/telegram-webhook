const { Telegraf } = require('telegraf')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// {
//   "update_id": 648021215,
//   "message": {
//     "message_id": 32,
//     "from": {
//       "id": 1092869389,
//       "is_bot": false,
//       "first_name": "opariffazman",
//       "username": "opariffazman",
//       "language_code": "en"
//     },
//     "chat": {
//       "id": 1092869389,
//       "first_name": "opariffazman",
//       "username": "opariffazman",
//       "type": "private"
//     },
//     "date": 1664748492,
//     "text": "helo"
//   }
// }

const bot = new Telegraf(process.env.BOT_TOKEN)

const secretUrl = process.env.SECRET_URL
app.post(`/${secretUrl}`, (req, res) => {
  const chatJson = req.body

  bot.telegram.sendMessage(chatJson.chat.id, 'hello there! Welcome to my new telegram bot.', {})
  console.log('webhook received')
  res.status(200).json('webhook received')
})



const port = process.env.PORT || 443 || 80 || 88 || 8443
app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
