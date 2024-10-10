import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'

const __dirname = dirname(fileURLToPath(import.meta.url))

import {
  createAckEvent,
  createDoneEvent,
  createTextEvent
} from '@copilot-extensions/preview-sdk'

const app = express()

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

app.get('/authorize', (req, res) => {
  res.sendFile(join(__dirname, 'authorized.html'))
})

app.post('/', (req, res) => {
  const ackEvent = createAckEvent()
  const textEvent = createTextEvent('Hello, world!')
  const doneEvent = createDoneEvent()

  res.write(ackEvent)
  res.write(textEvent)
  res.write(doneEvent)

  res.end()
})

app.listen(9000, () => {
  console.log('Server listening on port 9000')
})
