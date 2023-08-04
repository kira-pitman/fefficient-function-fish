// route.get details
import * as Path from 'node:path'
import express from 'express'
import fs from 'node:fs/promises'

import { getFishingTrips } from './lib.js'

export const router = express.Router()

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', async (req, res) => {
  const trips = await getFishingTrips()

  const id = trips.fishingTrips.length + 1
  const newTrip = {
    id,
    ...req.body,
  }

  trips.fishingTrips.push(newTrip)

  try {
    await fs.writeFile(
      Path.resolve('server/data/data.json'),
      JSON.stringify(trips, null, 2)
    )
  } catch (err) {
    console.error(err.message)
  }

  res.redirect(`/fishing-trip/${newTrip.id}`)
})

router.get('/:id', async (req, res) => {
  try {
    let id = req.params.id
    const trips = await getFishingTrips()
    let trip = trips.fishingTrips.find((element) => element.id == id)
    res.render('details', trip)
  } catch (err) {
    console.error(err.message)
  }
})
