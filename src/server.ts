// src/server.ts
import express from 'express'
import { database } from './database'
import { adminJs, adminJsRouter } from './adminJs'


const app = express()

app.use(express.static('public'))

//app.use(caminho, rotas)
app.use(adminJs.options.rootPath, adminJsRouter)

const PORT = process.env.port || 3000

app.listen(PORT, () => {
  database.authenticate().then(() => {
    console.log('DB connection successfull.')
  })

  console.log(`Server started successfuly at port ${PORT}.`)
})