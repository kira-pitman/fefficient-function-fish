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
  console.log(req.body)

  const trips = await getFishingTrips()

  const id = trips.fishingTrips.length + 1

  const catches = [  ]
  for (let i = 0; i < req.body.species.length; i++) {
    catches.push({
      species: req.body.species[i],
      length: req.body.length[i],
      bait: req.body.bait[i],
    })
  }

  const newTrip = {
    id,
    // now need to be more specific about request body to get array properly
    date: req.body.date,
    location: req.body.location,
    vibes: req.body.vibes,
    weather: req.body.weather,
    image:
      'https://hips.hearstapps.com/hmg-prod/images/766/articles/2016/03/shutterstock-364777841-1509114241.jpg',
    fish: catches
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
