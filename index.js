const express = require('express')
const axios = require('axios')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const token = process.env.TOKEN
const TELEGRAM_API = `https://api.telegram.org/bot${token}`

app.post(`/webhook/${token}`, async (req, res) => {
  console.log(req.body)

  const chatId = req.body.message.chat.id
  const text = req.body.message.text

  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: text
  })

  console.log(`text: ${text} chatId: ${chatId} `)
  return res.send()
})

const port = 8443 //|| 443 || 80 || 88 only ports for telegram
app.listen(port, () => {
  console.log(`telegram-webhook listening on ${port}`)
})
