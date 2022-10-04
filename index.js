const express = require('express')
const axios = require('axios')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const token = process.env.TOKEN
const provider_token = process.env.PROVIDER_TOKEN
const TELEGRAM_API = `https://api.telegram.org/bot${token}`

async function sendInvoice(chatId) {
  console.log(`sendInvoice chatId: ${chatId} `)

  await axios.post(`${TELEGRAM_API}/sendInvoice`, {
    chat_id: chatId,
    title: 'pakej',
    description: 'skema markah',
    payload: 'pay',
    provider_token: '284685063:TEST:NzA2M2JjMDUwNGQ2',
    currency: 'MYR',
    prices: [
      [
        {
          label: 'Harga',
          amount: 10
        }
      ]
    ]
  }).then(res => { console.log(res.data) })
    .catch(err => { console.error(err) })
}

app.post(`/webhook/${token}`, async (req, res) => {
  const chatId = req.body.message.chat.id
  const username = req.body.message.chat.first_name
  const command = req.body.message.text
  console.log(`webhooked command: ${command} chatId: ${chatId} username: ${username} `)

  switch (command) {
    case '/start':
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: 'Selamat datang',
        reply_markup: {
          keyboard: [
            [
              {
                text: 'Lihat Semua Pakej',
                web_app: { url: 'https://opariffazman.github.io/telegram-web-app/' }
              }
            ]
          ]
        }
      }).then(res => { console.log(res.data) })
        .catch(err => { console.error(err) })
      break
    case '/invoice':
      sendInvoice(chatId)
      break
    default:
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: 'Fungsi tiada'
      }).then(res => { console.log(res.data) })
        .catch(err => { console.error(err) })
      break
  }

  return res.send()
})

const port = 8443 //|| 443 || 80 || 88 only ports for telegram
app.listen(port, () => {
  console.log(`telegram-webhook listening on ${port}`)
})
