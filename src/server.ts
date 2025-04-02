// src/server.ts
import express from 'express'
import { database } from './database'
import { adminJs, adminJsRouter } from './adminJs'
import { router } from './routes'
import cors from 'cors'


const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json())

//app.use(caminho, rotas)
app.use(adminJs.options.rootPath, adminJsRouter)

app.use(router)

const PORT = process.env.port || 3000

app.listen(PORT, () => {
  database.authenticate().then(() => {
    console.log('DB connection successfull.')
  })

  console.log(`Server started successfuly at port ${PORT}.`)
})