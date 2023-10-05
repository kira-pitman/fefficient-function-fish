import * as Path from 'node:path'
import express from 'express'
import hbs from 'express-handlebars'

import { getFishingTrips } from './lib.js'
import { router } from './route.js'

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
  const fishingTrips = await getFishingTrips()
  res.render('home', fishingTrips)
})

server.use('/fishing-trip', router)

export default server
