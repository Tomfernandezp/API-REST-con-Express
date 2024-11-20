import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'

// así tengo que hacerlo ahora !!
//import movies from './movies.json' with {type: 'json'}

// otras formas de leer un json en ESmodules

//1era forma
//import fs from 'node:fs'
//const movies = JSON.parse(fs.readFile('./movies.json','utf-8'))

//2da forma (recomendada) con el utils.js
//const movies = require('./movies.json')


import { corsMiddleware } from './middlewares/cors.js'


const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')


app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})