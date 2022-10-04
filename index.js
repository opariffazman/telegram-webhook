const express = require('express')
const axios = require('axios')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const token = process.env.TOKEN
const provider_token = process.env.PROVIDER_TOKEN
const TELEGRAM_API = `https://api.telegram.org/bot${token}`

async function sendInvoice(chatId, command) {
  console.log(`sendInvoice command: ${command} chatId: ${chatId} `)

  await axios.post(`${TELEGRAM_API}/sendInvoice`, {
    chat_id: chatId,
    title: `pakej ${command}`,
    description: 'skema markah',
    payload: 'pay',
    provider_token: provider_token,
    currency: 'MYR',
    prices: [{
      label: "Harga",
      amount: 10
    }]
  })
}

app.post(`/webhook/${token}`, async (req, res) => {
  const chatId = req.body.message.chat.id
  const command = req.body.message.text
  console.log(`webhooked command: ${command} chatId: ${chatId} `)

  switch (command) {
    case '/pakej':
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: 'Pilih Pakej',
        reply_markup: {
          keyboard: [
            [
              { text: 'A' },
              { text: 'B' },
              { text: 'C' },
              { text: 'D' },
              { text: 'E' },
              { text: 'F' },
              { text: 'J' },
              { text: 'H' }
            ]
          ]
        }
      }).then(res => { console.log(res.data) })
        .catch(err => { console.error(err) })
      break
    case '/lihat':
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: '*Lihat Pakej*',
        parse_mode: 'MarkdownV2'
      }).then(res => { console.log(res.data) })
        .catch(err => { console.error(err) })
      break
    case '/start':
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: 'Hi /pakej /lihat'
      }).then(res => { console.log(res.data) })
        .catch(err => { console.error(err) })
      break
    case 'A':
      await axios.post(`${TELEGRAM_API}/sendInvoice`, {
        chat_id: chatId,
        title: `pakej ${command}`,
        description: 'skema markah',
        payload: 'pay',
        provider_token: provider_token,
        currency: 'MYR',
        prices: [{
          label: "Harga",
          amount: 10
        }]
      }).then(res => { console.log(res.data) })
        .catch(err => { console.error(err) })
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
