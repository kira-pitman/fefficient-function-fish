// route.get details
import * as Path from 'node:path'
import express from 'express'
import fs from 'node:fs/promises'

export const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    let id = req.params.id
    const trips = await fs
      .readFile(Path.resolve('server/data/data.json'), 'utf-8')
      .then((data) => JSON.parse(data))
    let trip = trips.fishingTrips.find((element) => element.id == id)
    res.render('details', trip)
  } catch (err) {
    console.error(err.message)
  }
})
