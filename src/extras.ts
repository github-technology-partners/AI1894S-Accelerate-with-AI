/* eslint-disable */
// @ts-nocheck

/**
 * Hello world app
 */

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

/**
 * Let's talk to an LLM
 */

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'

const __dirname = dirname(fileURLToPath(import.meta.url))

import {
  createAckEvent,
  createDoneEvent,
  createTextEvent,
  prompt
} from '@copilot-extensions/preview-sdk'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

app.get('/authorize', (req, res) => {
  res.sendFile(join(__dirname, 'authorized.html'))
})

app.post('/', async (req, res) => {
  const ackEvent = createAckEvent()
  const doneEvent = createDoneEvent()

  const { messages } = req.body
  const { content: latestMessage } = messages[messages.length - 1]

  const token = req.get('X-GitHub-Token') || ''

  const { message } = await prompt(latestMessage, { token })

  res.write(ackEvent)
  res.write(createTextEvent(message.content))
  res.write(doneEvent)

  res.end()
})

app.listen(9000, () => {
  console.log('Server listening on port 9000')
})

/**
 * Verify the request is authentic and originated from GitHub
 */

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'

const __dirname = dirname(fileURLToPath(import.meta.url))

import {
  createAckEvent,
  createDoneEvent,
  createTextEvent,
  verifyAndParseRequest
} from '@copilot-extensions/preview-sdk'

const app = express()

app.use(
  express.json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf.toString('utf-8')
    }
  })
)

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

app.get('/authorize', (req, res) => {
  res.sendFile(join(__dirname, 'authorized.html'))
})

app.post('/', async (req: any, res) => {
  const ackEvent = createAckEvent()
  const doneEvent = createDoneEvent()

  const token = req.get('X-GitHub-Token') || ''
  const keyId = req.get('Github-Public-Key-Identifier') || ''
  const signature = req.get('Github-Public-Key-Signature') || ''

  const { isValidRequest } = await verifyAndParseRequest(
    req.rawBody,
    signature,
    keyId,
    { token }
  )

  const message = isValidRequest ? 'Valid request' : 'Invalid request'

  res.write(ackEvent)
  res.write(createTextEvent(message))
  res.write(doneEvent)

  res.end()
})

app.listen(9000, () => {
  console.log('Server listening on port 9000')
})
