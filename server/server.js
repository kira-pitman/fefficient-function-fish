import * as Path from 'node:path'
import fs from 'node:fs/promises'

import express from 'express'
import hbs from 'express-handlebars'

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

// Your routes/router(s) should go here
server.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(
      Path.resolve('server/data/data.json'),
      'utf-8'
    )
    const fishingTrips = JSON.parse(data).fishingTrips
    res.render('home', { fishingTrips: fishingTrips })
  } catch {
    console.error("Sorry we can't load your fishing diary today :(")
  }
})

export default server
