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
    // now need to be more specific about request body to get array properly
    date: req.body.date,
    location: req.body.location,
    vibes: req.body.vibes,
    weather: req.body.weather,
    fish: [
      {
        species: req.body.species,
        length: req.body.length,
        bait: req.body.bait,
      },
    ],
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

    console.log(trip)

    res.render('details', trip)
  } catch (err) {
    console.error(err.message)
  }
})
